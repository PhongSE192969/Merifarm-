# Khu quản lý Merifarm — thiết lập Supabase

Đây không phải server code — Supabase đã là "backend" (dịch vụ đám mây, không cần tự chạy server).
Thư mục này chỉ chứa các lệnh SQL để tạo bảng/luật/dữ liệu mẫu trên Supabase.

## Các bước làm (làm 1 lần)

1. **Tạo tài khoản + project**
   - Vào https://supabase.com → Sign up (miễn phí) → New project.
   - Đặt tên project (VD: `merifarm`), đặt mật khẩu database (lưu lại chỗ nào đó), chọn khu vực gần Việt Nam (Singapore).
   - Đợi khoảng 1–2 phút để project khởi tạo xong.

2. **Lấy thông tin kết nối**
   - Vào project vừa tạo → **Settings** (biểu tượng bánh răng) → **API**.
   - Copy 2 giá trị: **Project URL** và **anon public** key.
   - Gửi 2 giá trị này để tạo file `.env` ở gốc dự án (không đưa lên Git).

3. **Tạo bảng** — vào **SQL Editor** (menu bên trái) → **New query** → dán toàn bộ nội dung
   file `schema.sql` → **Run**.

4. **Bật luật bảo mật** — New query khác → dán toàn bộ `rls-policies.sql` → **Run**.

5. **Nạp dữ liệu mẫu (danh mục sản phẩm hiện có, mã giảm giá, thông tin ngân hàng)**
   — New query khác → dán toàn bộ `seed.sql` → **Run**.
   *(File `seed.sql` được sinh tự động bằng lệnh `node quan-ly/be/generate-seed.mjs` — chỉ cần
   chạy lại lệnh này nếu muốn sinh lại từ dữ liệu cũ, không cần chạy khi đã có `seed.sql` rồi.)*

6. **Tạo tài khoản quản trị viên đầu tiên**
   - Vào **Authentication** → **Users** → **Add user** → **Create new user**.
   - Nhập email + mật khẩu bất kỳ, tick **Auto Confirm User**.
   - Đây là tài khoản bạn sẽ dùng để đăng nhập `/quan-ly`.

7. **Tạo nơi chứa ảnh tải lên**
   - Vào **Storage** → **New bucket** → đặt tên `product-images` → bật **Public bucket**.

Xong 7 bước trên là đủ để bắt đầu nối code vào Supabase.

## Nếu muốn thêm tài khoản quản trị viên khác sau này

Lặp lại bước 6 với email/mật khẩu khác — không cần sửa code.
