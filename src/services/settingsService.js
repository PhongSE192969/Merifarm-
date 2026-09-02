import { supabase } from '../lib/supabaseClient'

function fromRow(row) {
  if (!row) return null
  return {
    bankName: row.bank_name,
    accountNumber: row.account_number,
    accountHolder: row.account_holder,
    qrImage: row.qr_image,
    updatedBy: row.updated_by,
    updatedAt: row.updated_at,
  }
}

export async function getPaymentSettings() {
  const { data, error } = await supabase.from('payment_settings').select('*').eq('id', 1).maybeSingle()
  if (error) throw error
  return fromRow(data)
}

export async function updatePaymentSettings(patch, adminEmail) {
  const { data, error } = await supabase
    .from('payment_settings')
    .update({
      bank_name: patch.bankName,
      account_number: patch.accountNumber,
      account_holder: patch.accountHolder,
      qr_image: patch.qrImage,
      updated_by: adminEmail,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select()
    .single()
  if (error) throw error
  return fromRow(data)
}

function fromWarehouseRow(row) {
  if (!row) return null
  return {
    address: row.address,
    ward: row.ward,
    province: row.province,
    phone1: row.phone1,
    phone2: row.phone2,
    carrier: row.carrier,
    contactName: row.contact_name,
    updatedBy: row.updated_by,
    updatedAt: row.updated_at,
  }
}

export async function getWarehouseSettings() {
  const { data, error } = await supabase.from('warehouse_settings').select('*').eq('id', 1).maybeSingle()
  if (error) throw error
  return fromWarehouseRow(data)
}

export async function updateWarehouseSettings(patch, adminEmail) {
  const { data, error } = await supabase
    .from('warehouse_settings')
    .update({
      address: patch.address,
      ward: patch.ward,
      province: patch.province,
      phone1: patch.phone1,
      phone2: patch.phone2,
      carrier: patch.carrier,
      contact_name: patch.contactName,
      updated_by: adminEmail,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select()
    .single()
  if (error) throw error
  return fromWarehouseRow(data)
}

const IMAGE_BUCKET = 'product-images'

// Tải 1 file ảnh lên Supabase Storage, trả về URL công khai để lưu vào cột image/images/qr_image.
export async function uploadImage(file, folder = 'products') {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
