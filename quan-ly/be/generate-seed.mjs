// Chạy 1 lần: node quan-ly/be/generate-seed.mjs
// Đọc dữ liệu sản phẩm hiện có (products.json + productDetails.js) và xuất ra
// quan-ly/be/seed.sql để chạy trong Supabase SQL Editor, nạp sẵn danh mục hiện tại.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import productDetails from '../../src/data/productDetails.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const products = JSON.parse(readFileSync(path.join(__dirname, '../../src/data/products.json'), 'utf8'))

function sqlStr(value) {
  if (value === null || value === undefined) return 'null'
  return `'${String(value).replace(/'/g, "''")}'`
}
function sqlNum(value) {
  return value === null || value === undefined ? 'null' : String(value)
}
function sqlBool(value) {
  return value ? 'true' : 'false'
}
function sqlJson(value) {
  if (value === null || value === undefined) return 'null'
  return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`
}

const lines = [
  '-- Sinh tự động từ src/data/products.json + src/data/productDetails.js',
  '-- Chạy SAU khi đã chạy schema.sql và rls-policies.sql.',
  '',
]

for (const p of products) {
  const d = productDetails[p.slug] || {}
  lines.push(
    `insert into products (
  slug, name, category, crop_types, package_unit, form, price, original_price,
  image, images, short_description, ingredients, usage_instructions, usage_needs, tags, in_stock,
  overview, ingredient_items, ingredient_note, benefit_items, usage_steps, dosage_table,
  storage_items, warning_note, quick_info, benefits, suitable_when, specification
) values (
  ${sqlStr(p.slug)}, ${sqlStr(p.name)}, ${sqlStr(p.category)}, ${sqlJson(p.cropTypes)}, ${sqlStr(p.packageUnit)}, ${sqlStr(p.form)}, ${sqlNum(p.price)}, ${sqlNum(p.originalPrice)},
  ${sqlStr(p.image)}, ${sqlJson(p.images)}, ${sqlStr(p.shortDescription)}, ${sqlStr(p.ingredients)}, ${sqlStr(p.usageInstructions)}, ${sqlJson(p.usageNeeds)}, ${sqlJson(p.tags)}, ${sqlBool(p.inStock)},
  ${sqlStr(d.overview)}, ${sqlJson(d.ingredientItems || [])}, ${sqlStr(d.ingredientNote)}, ${sqlJson(d.benefitItems || [])}, ${sqlJson(d.usageSteps || [])}, ${sqlJson(d.dosageTable ?? null)},
  ${sqlJson(d.storageItems || [])}, ${sqlStr(d.warningNote)}, ${sqlJson(d.quickInfo || {})}, ${sqlJson(d.benefits || [])}, ${sqlJson(d.suitableWhen || [])}, ${sqlJson(d.specification || {})}
)
on conflict (slug) do nothing;
`
  )
}

lines.push(
  '-- 3 mã giảm giá đang có, không giới hạn số lần/ngày (đúng như trước đây)',
  `insert into coupons (code, type, value, active) values
  ('QUOCANH', 'fixed', 50000, true),
  ('DUYPHONG', 'fixed', 50000, true),
  ('MERIFARM', 'percent', 5, true)
on conflict (code) do nothing;`,
  '',
  '-- Thông tin nhận tiền hiện tại',
  `update payment_settings set
  bank_name = 'Ngân hàng MB Bank - Ngân hàng Thương mại cổ phần Quân đội',
  account_number = '952076868',
  account_holder = 'CONG TY TNHH CONG NGHE DVP-DEDITECH'
where id = 1;`
)

writeFileSync(path.join(__dirname, 'seed.sql'), lines.join('\n'), 'utf8')
console.log('Đã tạo quan-ly/be/seed.sql')
