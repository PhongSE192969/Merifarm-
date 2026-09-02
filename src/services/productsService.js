import { supabase } from '../lib/supabaseClient'

// Chuyển 1 dòng từ Supabase (snake_case) sang đúng hình dạng mà giao diện đang dùng (camelCase).
function fromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    sku: row.sku,
    category: row.category,
    cropTypes: row.crop_types || [],
    packageUnit: row.package_unit,
    form: row.form,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    image: row.image,
    images: row.images || [],
    shortDescription: row.short_description,
    ingredients: row.ingredients,
    usageInstructions: row.usage_instructions,
    usageNeeds: row.usage_needs || [],
    tags: row.tags || [],
    inStock: row.in_stock,

    overview: row.overview,
    ingredientItems: row.ingredient_items || [],
    ingredientNote: row.ingredient_note,
    benefitItems: row.benefit_items || [],
    usageSteps: row.usage_steps || [],
    dosageTable: row.dosage_table,
    storageItems: row.storage_items || [],
    warningNote: row.warning_note,
    quickInfo: row.quick_info || {},
    benefits: row.benefits || [],
    suitableWhen: row.suitable_when || [],
    specification: row.specification || {},
    shipping: row.shipping || {},

    updatedBy: row.updated_by,
    updatedAt: row.updated_at,
  }
}

// Chuyển ngược lại từ hình dạng giao diện sang cột Supabase, dùng khi tạo/sửa.
function toRow(product) {
  return {
    slug: product.slug,
    name: product.name,
    sku: product.sku ?? null,
    category: product.category,
    crop_types: product.cropTypes ?? [],
    package_unit: product.packageUnit,
    form: product.form,
    price: product.price ?? null,
    original_price: product.originalPrice ?? null,
    image: product.image ?? null,
    images: product.images ?? [],
    short_description: product.shortDescription ?? null,
    ingredients: product.ingredients ?? null,
    usage_instructions: product.usageInstructions ?? null,
    usage_needs: product.usageNeeds ?? [],
    tags: product.tags ?? [],
    in_stock: product.inStock ?? true,

    overview: product.overview ?? null,
    ingredient_items: product.ingredientItems ?? [],
    ingredient_note: product.ingredientNote ?? null,
    benefit_items: product.benefitItems ?? [],
    usage_steps: product.usageSteps ?? [],
    dosage_table: product.dosageTable ?? null,
    storage_items: product.storageItems ?? [],
    warning_note: product.warningNote ?? null,
    quick_info: product.quickInfo ?? {},
    benefits: product.benefits ?? [],
    suitable_when: product.suitableWhen ?? [],
    specification: product.specification ?? {},
    shipping: product.shipping ?? {},
  }
}

export async function listProducts() {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true })
  if (error) throw error
  return (data || []).map(fromRow)
}

export async function getProduct(idOrSlug) {
  const column = /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(String(idOrSlug)) ? 'id' : 'slug'
  const { data, error } = await supabase.from('products').select('*').eq(column, idOrSlug).maybeSingle()
  if (error) throw error
  return fromRow(data)
}

export async function createProduct(product, adminEmail) {
  const { data, error } = await supabase
    .from('products')
    .insert({ ...toRow(product), updated_by: adminEmail })
    .select()
    .single()
  if (error) throw error
  return fromRow(data)
}

export async function updateProduct(id, product, adminEmail) {
  const { data, error } = await supabase
    .from('products')
    .update({ ...toRow(product), updated_by: adminEmail, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return fromRow(data)
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// Số lượng đã bán của mỗi sản phẩm — tính từ order_items của các đơn CHƯA HỦY (không lưu riêng).
export async function getSoldQuantities() {
  const { data, error } = await supabase
    .from('order_items')
    .select('product_id, qty, orders!inner(status)')
    .neq('orders.status', 'cancelled')
  if (error) throw error
  const totals = {}
  for (const row of data || []) {
    if (!row.product_id) continue
    totals[row.product_id] = (totals[row.product_id] || 0) + row.qty
  }
  return totals
}
