import { supabase } from '../lib/supabaseClient'

function fromRow(row) {
  if (!row) return null
  return {
    code: row.code,
    type: row.type,
    value: row.value,
    expiresAt: row.expires_at,
    maxUses: row.max_uses,
    active: row.active,
    createdAt: row.created_at,
    updatedBy: row.updated_by,
    updatedAt: row.updated_at,
  }
}

export async function listCoupons() {
  const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(fromRow)
}

export async function getCoupon(code) {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', String(code).toUpperCase())
    .maybeSingle()
  if (error) throw error
  return fromRow(data)
}

// Số lần 1 mã đã được dùng = đếm đơn CHƯA HỦY có gắn mã này (không lưu riêng con số này).
export async function getUsageCount(code) {
  const { count, error } = await supabase
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('coupon_code', code)
    .neq('status', 'cancelled')
  if (error) throw error
  return count || 0
}

// Dùng ở trang giỏ hàng khi khách nhập mã — kiểm tra còn hiệu lực không.
export async function validateCoupon(code) {
  const coupon = await getCoupon(code)
  if (!coupon || !coupon.active) return { valid: false, reason: 'Mã ưu đãi không hợp lệ.' }
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, reason: 'Mã ưu đãi đã hết hạn.' }
  }
  if (coupon.maxUses != null) {
    const used = await getUsageCount(coupon.code)
    if (used >= coupon.maxUses) return { valid: false, reason: 'Mã ưu đãi đã hết lượt sử dụng.' }
  }
  return { valid: true, coupon }
}

export async function createCoupon(input, adminEmail) {
  const { data, error } = await supabase
    .from('coupons')
    .insert({
      code: input.code.toUpperCase(),
      type: input.type,
      value: input.value,
      expires_at: input.expiresAt || null,
      max_uses: input.maxUses ?? null,
      active: input.active ?? true,
      updated_by: adminEmail,
    })
    .select()
    .single()
  if (error) throw error
  return fromRow(data)
}

export async function updateCoupon(code, patch, adminEmail) {
  const { data, error } = await supabase
    .from('coupons')
    .update({
      type: patch.type,
      value: patch.value,
      expires_at: patch.expiresAt || null,
      max_uses: patch.maxUses ?? null,
      active: patch.active,
      updated_by: adminEmail,
      updated_at: new Date().toISOString(),
    })
    .eq('code', code)
    .select()
    .single()
  if (error) throw error
  return fromRow(data)
}

export async function deleteCoupon(code) {
  const { error } = await supabase.from('coupons').delete().eq('code', code)
  if (error) throw error
}
