import { supabase } from '../lib/supabaseClient'

function fromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    code: row.code,
    form: {
      name: row.customer_name,
      phone: row.customer_phone,
      email: row.customer_email,
      deliveryMethod: row.delivery_method,
      street: row.street,
      ward: row.ward,
      provinceName: row.province_name,
      paymentMethod: row.payment_method,
      couponCode: row.coupon_code,
      eInvoice: row.e_invoice,
      invoiceType: row.invoice_type,
      invoiceName: row.invoice_name,
      invoiceAddress: row.invoice_address,
      invoiceTaxCode: row.invoice_tax_code,
      invoiceEmail: row.invoice_email,
      note: row.note,
    },
    coupon: row.coupon_code ? { code: row.coupon_code, discount: row.coupon_discount } : null,
    subtotal: row.subtotal,
    shipping: row.shipping,
    total: row.total,
    status: row.status,
    statusHistory: row.status_history || [],
    hasIssue: row.has_issue || false,
    issueNote: row.issue_note,
    returnRequested: row.return_requested || false,
    submittedAt: row.submitted_at,
    items: (row.order_items || []).map((i) => ({
      productId: i.product_id,
      name: i.product_name,
      qty: i.qty,
      price: i.price,
    })),
  }
}

// Gọi khi khách bấm "Gửi yêu cầu đặt hàng" ở giỏ hàng — đây là chỗ sửa lỗi đơn hàng bị mất.
// Không dùng .select() sau insert: khách chưa đăng nhập không có quyền SELECT trên
// orders (RLS), nên PostgREST sẽ báo lỗi RLS khi cố RETURNING lại dòng vừa thêm dù
// insert đã thành công. Vì vậy tự tạo id ở đây để dùng luôn cho order_items.
export async function createOrder(orderData) {
  const { form, items, coupon, subtotal, shipping, total, code } = orderData
  const id = crypto.randomUUID()

  const { error: orderError } = await supabase
    .from('orders')
    .insert({
      id,
      code,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email || null,
      delivery_method: form.deliveryMethod,
      street: form.street || null,
      ward: form.ward || null,
      province_name: form.provinceName || null,
      payment_method: form.paymentMethod,
      coupon_code: coupon?.code || null,
      coupon_discount: coupon?.discount ?? null,
      e_invoice: !!form.eInvoice,
      invoice_type: form.eInvoice ? form.invoiceType : null,
      invoice_name: form.eInvoice ? form.invoiceName : null,
      invoice_address: form.eInvoice ? form.invoiceAddress : null,
      invoice_tax_code: form.eInvoice ? form.invoiceTaxCode : null,
      invoice_email: form.eInvoice ? form.invoiceEmail : null,
      subtotal,
      shipping,
      total,
      note: form.note || null,
      status: 'pending',
      status_history: [{ status: 'pending', at: new Date().toISOString() }],
    })
  if (orderError) throw orderError

  if (items?.length) {
    const rows = items.map((item) => ({
      order_id: id,
      product_id: item.id || null,
      product_name: item.name,
      qty: item.qty,
      price: item.price ?? 0,
    }))
    const { error: itemsError } = await supabase.from('order_items').insert(rows)
    if (itemsError) throw itemsError
  }

  return { id, ...orderData }
}

export async function listOrders({ status, search, dateFrom, dateTo } = {}) {
  let query = supabase.from('orders').select('*, order_items(*)').order('submitted_at', { ascending: false })
  if (status) query = query.eq('status', status)
  if (dateFrom) query = query.gte('submitted_at', dateFrom)
  if (dateTo) query = query.lte('submitted_at', dateTo)
  if (search) query = query.or(`code.ilike.%${search}%,customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%`)

  const { data, error } = await query
  if (error) throw error
  return (data || []).map(fromRow)
}

export async function getOrder(code) {
  const { data, error } = await supabase.from('orders').select('*, order_items(*)').eq('code', code).maybeSingle()
  if (error) throw error
  return fromRow(data)
}

export async function updateOrderStatus(code, nextStatus) {
  const current = await getOrder(code)
  if (!current) throw new Error('Không tìm thấy đơn hàng.')

  const history = [...current.statusHistory, { status: nextStatus, at: new Date().toISOString() }]
  const { data, error } = await supabase
    .from('orders')
    .update({ status: nextStatus, status_history: history })
    .eq('code', code)
    .select('*, order_items(*)')
    .single()
  if (error) throw error
  return fromRow(data)
}

// Gắn/gỡ cờ "Có vấn đề" và "Yêu cầu hoàn hàng" — admin tự đánh dấu ở trang chi tiết đơn.
export async function updateOrderFlags(code, patch) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      has_issue: patch.hasIssue,
      issue_note: patch.issueNote ?? null,
      return_requested: patch.returnRequested,
    })
    .eq('code', code)
    .select('*, order_items(*)')
    .single()
  if (error) throw error
  return fromRow(data)
}

// Con số cho Tổng quan — luôn tính lại, không lưu riêng.
export async function getDashboardStats() {
  const { data, error } = await supabase.from('orders').select('status, total')
  if (error) throw error

  const orders = data || []
  const totalOrders = orders.length
  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const revenue = orders.filter((o) => o.status !== 'cancelled').reduce((sum, o) => sum + Number(o.total || 0), 0)
  const byStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  return { totalOrders, pendingCount, revenue, byStatus }
}

export async function listRecentOrders(limit = 6) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('submitted_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data || []).map(fromRow)
}
