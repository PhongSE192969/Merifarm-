# Bàn giao Backend — Tạo tài khoản người dùng mới

Tài liệu này dành cho đội backend, mô tả **đúng 1 việc còn thiếu** để tính năng "Thêm
người dùng" trong khu quản lý (`/quan-ly/cai-dat` → tab "Quản lý người dùng") hoạt
động thật. Toàn bộ phần còn lại (giao diện, đọc/ghi vai trò, đổi mật khẩu, phân
quyền) đã chạy thật, không cần đụng vào.

## 1. Tổng quan kiến trúc hiện tại

- **Không có server riêng.** Toàn bộ web (công khai lẫn khu quản lý) là 1 ứng dụng
  React (Vite), gọi thẳng **Supabase** (Postgres + Auth + Storage) từ trình duyệt
  qua thư viện `@supabase/supabase-js`.
- **Nguyên tắc bắt buộc**: mọi nơi trong code chỉ gọi Supabase qua đúng 1 lớp
  `src/services/*.js` — không component/trang nào gọi thẳng `supabase.from(...)`.
  Muốn thêm 1 việc backend mới, cách chuẩn là: (a) tạo Edge Function, (b) sửa đúng 1
  hàm trong service tương ứng để gọi Edge Function đó — không sửa gì ở giao diện.
- Khóa `anon public` (dùng ở FE, trong `.env`) chỉ có quyền theo đúng luật RLS
  (Row Level Security) đã khai báo trong `quan-ly/be/rls-policies.sql`. Khóa
  `service_role` (toàn quyền, bỏ qua RLS) **không hề có trong bất kỳ file FE nào** —
  đây chính là lý do việc tạo tài khoản mới không tự làm được từ trình duyệt.

## 2. Đã xong (không cần đụng vào)

- Bảng `admin_profiles` (`quan-ly/be/schema.sql`): mỗi tài khoản Supabase Auth có
  đúng 1 dòng — `email`, `display_name`, `role` (kiểu `text`, hiện có 2 giá trị
  `user`/`admin`, thêm vai trò mới sau này chỉ cần thêm giá trị mới, không sửa schema).
- Trigger `handle_new_admin_user()`: mỗi khi có tài khoản Supabase Auth mới (kể cả
  tạo tay qua Dashboard), tự tạo hồ sơ `role='user'` — không cần ai chạy tay.
- Hàm `is_admin()` + trigger `prevent_role_self_escalation()`: chặn 1 tài khoản
  không phải admin tự đổi `role` của chính mình, kể cả khi gọi thẳng API (không chỉ
  chặn ở giao diện).
- RLS (`quan-ly/be/rls-policies.sql`): `payment_settings` giờ chỉ admin sửa được
  (trước đây ai đăng nhập cũng sửa được); `admin_profiles` ai đăng nhập cũng đọc
  được toàn bảng, chỉ tự sửa hồ sơ mình hoặc admin mới sửa hồ sơ người khác.
- `src/services/profilesService.js`: `getMyProfile()`, `listProfiles()`,
  `updateProfileRole(id, role)`, `requestPasswordReset(email)` — **cả 4 hàm này đã
  chạy thật**, không cần backend gì thêm (đặc biệt `requestPasswordReset` dùng
  `supabase.auth.resetPasswordForEmail()`, gọi thẳng từ trình duyệt được, an toàn).
- Giao diện: `quan-ly/fe/pages/settings/tabs/UserManagementTab.jsx` (danh sách tài
  khoản, đổi vai trò, gửi email đặt lại mật khẩu, mở form "Thêm người dùng"),
  `PaymentTab.jsx` (chỉ admin sửa được), `SettingsPage.jsx` (ẩn tab "Quản lý người
  dùng" nếu không phải admin), `AdminAuthContext.jsx` (thêm `role`/`isAdmin`).

## 3. Việc cần làm — 1 Supabase Edge Function

**Tên gợi ý**: `admin-create-user`

**FE đã gọi sẵn** (xem `src/services/profilesService.js`, hàm `createUserAccount`)
— hiện hàm này chỉ `throw` báo "chưa dùng được", đội backend triển khai xong thì
sửa lại đúng hàm này để gọi function, không cần đổi UI.

### Input (từ FE gửi lên, kèm JWT của admin đang gọi trong header `Authorization`)
```json
{ "email": "...", "password": "...", "role": "user | admin", "displayName": "..." }
```

### Việc function phải làm, theo đúng thứ tự
1. Đọc JWT người gọi từ header `Authorization`, lấy `user.id`.
2. Dùng **service_role** (chỉ đặt trong biến môi trường của Edge Function, KHÔNG
   bao giờ đưa vào file FE/`.env` phía client) để query `admin_profiles` xác nhận
   người gọi có `role='admin'`. Nếu không → trả lỗi 403, dừng lại.
3. Gọi `supabase.auth.admin.createUser({ email, password, email_confirm: true })`
   (Admin API — chỉ gọi được bằng service_role, đây là lý do cần Edge Function).
4. Update dòng `admin_profiles` vừa được trigger tự tạo (mặc định `role='user'`)
   thành đúng `role` và `display_name` FE gửi lên — hoặc insert nếu vì lý do gì đó
   trigger chưa kịp chạy.
5. Trả về `{ id }` (id tài khoản vừa tạo). Lỗi thì trả về `{ error: "..." }` kèm mã
   lỗi HTTP phù hợp (409 nếu email đã tồn tại, v.v.) để FE hiện đúng thông báo.

### Bảo mật — bắt buộc
- `service_role` key **chỉ** đặt ở biến môi trường Edge Function
  (`SUPABASE_SERVICE_ROLE_KEY`, Supabase tự cấp sẵn cho mọi Edge Function, không
  cần tạo thêm secret riêng).
- Luôn thực hiện bước 2 (xác nhận người gọi là admin) **trước khi** làm bất cứ điều
  gì khác — không tin JWT hay dữ liệu từ FE.
- Không log lại `password` ở bất kỳ đâu.

## 4. Việc tùy chọn (không bắt buộc làm ngay)

Nếu sau này muốn "admin đặt thẳng mật khẩu mới cho người khác" (thay vì gửi email
như hiện tại), cần thêm 1 Edge Function tương tự, `admin-reset-password`, nhận
`{ userId, newPassword }`, xác nhận người gọi là admin y hệt bước 2 ở trên, rồi gọi
`supabase.auth.admin.updateUserById(userId, { password: newPassword })`.

## 5. Cách kiểm tra sau khi triển khai xong

- Đăng nhập bằng tài khoản `user` thường → không thấy tab "Quản lý người dùng",
  không sửa được "Thanh toán" (kể cả gọi thẳng API cũng bị RLS chặn).
- Đăng nhập bằng admin → vào "Quản lý người dùng" → "Thêm người dùng" → điền form →
  gửi → tài khoản mới xuất hiện ngay trong danh sách, đăng nhập thử bằng tài khoản
  đó bằng đúng mật khẩu tạm đã nhập → vào được, đúng vai trò đã chọn.
