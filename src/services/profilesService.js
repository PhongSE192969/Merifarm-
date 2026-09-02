import { supabase } from '../lib/supabaseClient'

function fromRow(row) {
  if (!row) return null
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// Hồ sơ (vai trò) của người đang đăng nhập — dùng để bật/tắt tính năng theo quyền.
export async function getMyProfile() {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) return null
  const { data, error } = await supabase.from('admin_profiles').select('*').eq('id', auth.user.id).maybeSingle()
  if (error) throw error
  return fromRow(data)
}

// Danh sách toàn bộ tài khoản — chỉ có ý nghĩa với vai admin (RLS vẫn cho user đọc
// được để không vỡ trang, nhưng UserManagementTab chỉ hiện cho admin xem).
export async function listProfiles() {
  const { data, error } = await supabase.from('admin_profiles').select('*').order('created_at', { ascending: true })
  if (error) throw error
  return (data || []).map(fromRow)
}

// Đổi vai trò 1 tài khoản khác — chỉ admin làm được (chặn thêm bằng trigger DB
// prevent_role_self_escalation, không chỉ dựa vào RLS).
export async function updateProfileRole(id, role) {
  const { data, error } = await supabase
    .from('admin_profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return fromRow(data)
}

export async function updateMyDisplayName(displayName) {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) throw new Error('Chưa đăng nhập.')
  const { data, error } = await supabase
    .from('admin_profiles')
    .update({ display_name: displayName, updated_at: new Date().toISOString() })
    .eq('id', auth.user.id)
    .select()
    .single()
  if (error) throw error
  return fromRow(data)
}

// Gửi email đặt lại mật khẩu cho 1 tài khoản khác — cách duy nhất đổi được mật khẩu
// người khác mà KHÔNG cần service_role/Admin API (an toàn để gọi thẳng từ trình duyệt).
export async function requestPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/quan-ly/dang-nhap`,
  })
  if (error) throw error
}

// TODO(backend): tạo tài khoản Supabase Auth mới cần Admin API (service_role) —
// không thể gọi an toàn từ trình duyệt. Cần 1 Supabase Edge Function nhận
// { email, password, role, displayName } kèm JWT admin đang gọi, tự xác thực người
// gọi có role='admin' rồi mới tạo tài khoản. Xem quan-ly/be/BAN-GIAO-BACKEND.md.
export async function createUserAccount() {
  throw new Error('Tính năng này chưa sẵn sàng, vui lòng thử lại sau.')
}
