# Khu quản lý Merifarm — Tài liệu kỹ thuật (FE + BE)

Tài liệu tổng hợp cho đội ngũ backend (hoặc bất kỳ dev nào mới) nắm được toàn bộ
"khu quản lý" — trang admin ẩn của website Merifarm, tại đường dẫn `/quan-ly`.

## 1. Kiến trúc tổng quan

- **Không có server riêng.** Toàn bộ website (trang bán hàng công khai lẫn khu
  quản lý) là **1 ứng dụng React (Vite)** duy nhất. "Backend" là **Supabase**
  (Postgres + Auth + Storage) — một dịch vụ đám mây, không phải server tự viết.
- **Nguyên tắc bắt buộc, xuyên suốt toàn dự án**: mọi nơi trong code (component,
  trang) chỉ được đọc/ghi dữ liệu qua đúng 1 lớp `src/services/*.js` — **không
  component nào gọi thẳng `supabase.from(...)`**. Muốn đổi nơi lưu trữ sau này (VD
  chuyển sang server riêng) chỉ cần sửa bên trong các file service, không đụng gì
  đến giao diện.
- Khu quản lý và trang bán hàng công khai **dùng chung** 1 Supabase project, 1 bộ
  service layer (`src/services/`), khác nhau ở:
  - Route: khu quản lý nằm dưới `/quan-ly/*` (`App.jsx` mount `AdminRoutes` tại
    đây), không có link nào từ Navbar/Footer công khai trỏ tới.
  - RLS (Row Level Security): khu quản lý cần đăng nhập (Supabase Auth) mới đọc/ghi
    được phần lớn dữ liệu; trang công khai chỉ đọc được phần dữ liệu cho phép công
    khai (sản phẩm, mã giảm giá đang bật, cài đặt thanh toán/kho vận) và chỉ **thêm
    mới** được đơn hàng (không đọc lại được).

## 2. Cấu trúc thư mục

```
quan-ly/
  README.md                     # chính file này
  fe/                            # toàn bộ giao diện khu quản lý
    layouts/
      AdminLayout.jsx            # khung trang sau khi đăng nhập (sidebar + topbar)
      AdminAuthLayout.jsx        # khung trang đăng nhập
    routes/
      AdminRoutes.jsx            # khai báo route con dưới /quan-ly/*
      RequireAdminAuth.jsx       # chặn vào trang nếu chưa đăng nhập
    context/
      AdminAuthContext.jsx       # bọc quanh supabase.auth — user, role, isAdmin
    pages/
      LoginPage.jsx, DashboardPage.jsx
      products/ProductListPage.jsx, ProductFormPage.jsx
      coupons/CouponListPage.jsx
      orders/OrderListPage.jsx, OrderDetailPage.jsx
      settings/SettingsPage.jsx
        tabs/AccountTab.jsx, WarehouseTab.jsx, UserManagementTab.jsx, PaymentTab.jsx
    components/
      layout/AdminSidebar.jsx, AdminTopbar.jsx, AdminBackground.jsx, NotificationsMenu.jsx
      common/DataTable.jsx, StatusBadge.jsx, StatusDonut.jsx, Modal.jsx, ConfirmDialog.jsx,
             Pagination.jsx, StatCard.jsx, PageHeader.jsx, CollapsibleSection.jsx,
             ArrayEditor.jsx, ObjectArrayEditor.jsx, ChipMultiSelect.jsx
      products/ImageManager.jsx, IconPicker.jsx, IconTextListEditor.jsx
      coupons/CouponModal.jsx
      orders/OrderStatusStepper.jsx, InvoiceInfoCard.jsx
  be/                             # cấu hình Supabase (KHÔNG phải code server)
    schema.sql                    # toàn bộ câu lệnh tạo bảng/hàm/trigger
    rls-policies.sql               # luật ai đọc/ghi được bảng nào
    seed.sql                       # dữ liệu mẫu ban đầu (sinh ra bởi generate-seed.mjs)
    generate-seed.mjs              # script sinh seed.sql từ dữ liệu sản phẩm cũ trong code
    README.md                      # hướng dẫn cài đặt Supabase từ đầu (7 bước)
    BAN-GIAO-BACKEND.md            # 1 việc cụ thể còn thiếu, cần đội BE làm (xem mục 7)

src/
  lib/supabaseClient.js           # khởi tạo 1 Supabase client duy nhất, dùng chung
  services/                       # LỚP DUY NHẤT được gọi Supabase — dùng chung FE công khai + khu quản lý
    productsService.js, couponsService.js, ordersService.js,
    settingsService.js, profilesService.js
```

## 3. Dữ liệu (7 bảng, toàn bộ trong schema `public` của Supabase)

| Bảng | Vai trò | Ghi chú |
|---|---|---|
| `products` | Hồ sơ sản phẩm | Rất nhiều cột `jsonb` (ảnh, thành phần, công dụng, cách dùng, thông số...) để gộp toàn bộ nội dung 1 sản phẩm vào 1 dòng. Có cột `sku`, `shipping` (jsonb: cân nặng/kích thước/cách giao/COD). |
| `coupons` | Mã giảm giá | `code` là khóa chính; `expires_at`, `max_uses` (đều có thể null = không giới hạn). |
| `orders` | Đơn hàng | Có `status` (`pending→confirmed→shipped→done`, nhánh `cancelled`), `status_history` (jsonb, để tính "quá hạn 24h" ở Tổng quan/Đơn hàng), `has_issue`/`issue_note`/`return_requested` (cờ admin tự đánh dấu). |
| `order_items` | Món đã đặt trong 1 đơn | Tách bảng riêng (không nhúng trong `orders`) để cộng được số lượng đã bán theo từng sản phẩm. |
| `payment_settings` | Thông tin nhận chuyển khoản (1 dòng cố định `id=1`) | Ngân hàng, số TK, ảnh QR. |
| `warehouse_settings` | Thông tin kho/nơi nhận hàng (1 dòng cố định `id=1`) | Địa chỉ, người chịu trách nhiệm, SĐT, đơn vị vận chuyển đang dùng (chỉ để ghi chú nội bộ, **chưa nối API thật của đơn vị vận chuyển nào**). |
| `admin_profiles` | Vai trò từng tài khoản quản trị | 1 dòng / 1 tài khoản Supabase Auth. Cột `role` kiểu `text` (hiện có `user`/`admin`), xem mục 6. |

Toàn bộ con số thống kê (tổng đơn hàng, doanh thu, số đã bán/sản phẩm, số lần dùng
mã giảm giá, số tài khoản...) đều **tính lại mỗi lần xem**, không lưu cột đếm riêng
— tránh lệch số khi dữ liệu gốc đổi.

## 4. RLS — ai đọc/ghi được gì (`quan-ly/be/rls-policies.sql`)

| Bảng | Đọc | Ghi |
|---|---|---|
| `products`, `coupons` | Ai cũng đọc được (trang bán hàng cần hiển thị) | Chỉ tài khoản đã đăng nhập |
| `payment_settings` | Ai cũng đọc được (trang thanh toán cần hiện QR) | **Chỉ vai `admin`** |
| `warehouse_settings` | Ai cũng đọc được (giỏ hàng cần hiện địa chỉ nhận tại kho) | Chỉ tài khoản đã đăng nhập |
| `orders`, `order_items` | Chỉ tài khoản đã đăng nhập | Ai cũng **thêm mới** được (khách đặt hàng không cần tài khoản); chỉ tài khoản đã đăng nhập mới sửa được |
| `admin_profiles` | Ai đã đăng nhập cũng đọc toàn bảng (để trang "Quản lý người dùng" liệt kê) | Tự sửa hồ sơ mình, hoặc vai `admin` sửa người khác — **đổi cột `role` còn bị chặn thêm bởi trigger `prevent_role_self_escalation`** nếu người gọi không phải admin, dù RLS cho phép sửa dòng của chính mình |
| `storage.objects` (bucket `product-images`) | Ai cũng đọc được | Chỉ tài khoản đã đăng nhập |

Hàm `public.is_admin()` (`security definer`) là nơi kiểm tra vai trò dùng chung
trong các policy trên — không viết lặp logic ở nhiều chỗ.

## 5. Lớp service (`src/services/*.js`)

| File | Hàm chính |
|---|---|
| `productsService.js` | `listProducts`, `getProduct`, `createProduct`, `updateProduct`, `deleteProduct`, `getSoldQuantities` |
| `couponsService.js` | `listCoupons`, `getCoupon`, `getUsageCount`, `validateCoupon`, `createCoupon`, `updateCoupon`, `deleteCoupon` |
| `ordersService.js` | `createOrder`, `listOrders`, `getOrder`, `updateOrderStatus`, `updateOrderFlags`, `getDashboardStats`, `listRecentOrders` |
| `settingsService.js` | `getPaymentSettings`, `updatePaymentSettings`, `getWarehouseSettings`, `updateWarehouseSettings`, `uploadImage` |
| `profilesService.js` | `getMyProfile`, `listProfiles`, `updateProfileRole`, `updateMyDisplayName`, `requestPasswordReset`, `createUserAccount` (xem mục 7 — chưa dùng được) |

Mỗi service có 2 hàm nội bộ `fromRow`/`toRow` đổi tên cột `snake_case` (Postgres)
↔ `camelCase` (JS) — giữ nguyên tên trường phía giao diện dù cột DB đặt tên khác.

## 6. Đăng nhập & phân quyền

- Đăng nhập bằng **Supabase Auth** (email/mật khẩu). Không có tự đăng ký — tài
  khoản tạo tay qua Supabase Dashboard (Authentication → Users → Add user).
- Mỗi tài khoản mới tự động có 1 dòng `admin_profiles` với `role='user'` (nhờ
  trigger `handle_new_admin_user`) — không cần ai chạy tay.
- 2 vai hiện có:
  - **`user`** (nhân viên): toàn quyền với Sản phẩm, Mã giảm giá, Đơn hàng, Tổng
    quan, Kho vận, và Tài khoản của chính mình (kể cả đổi mật khẩu riêng). Mục
    **Thanh toán chỉ xem, không sửa được** (cả ở giao diện lẫn khi gọi thẳng API —
    do RLS chặn, không chỉ ẩn nút). **Không thấy** tab "Quản lý người dùng".
  - **`admin`**: như `user`, cộng thêm xem danh sách toàn bộ tài khoản, đổi vai trò
    người khác, gửi email đặt lại mật khẩu người khác, xem **và sửa** Thanh toán.
- Cột `role` là `text` tự do (không phải Postgres ENUM) — thêm vai trò mới (VD
  "quản lý cửa hàng") sau này chỉ cần thêm giá trị mới + chỗ kiểm tra tương ứng,
  không cần đổi schema.

## 7. Còn thiếu — cần đội BE làm (đọc chi tiết ở `quan-ly/be/BAN-GIAO-BACKEND.md`)

Đúng **1 việc**: nút "Thêm người dùng" (tạo tài khoản Supabase Auth mới ngay trong
khu quản lý) đã có đủ giao diện, nhưng chưa chạy được — tạo tài khoản Auth mới bắt
buộc cần **Admin API** (khóa `service_role`), không được gọi an toàn từ trình
duyệt. Cần 1 **Supabase Edge Function** (`admin-create-user`) giữ khóa đó ở server,
xác thực người gọi là admin rồi mới tạo tài khoản. File `BAN-GIAO-BACKEND.md` ghi
rõ input/output, thứ tự xử lý, và các yêu cầu bảo mật bắt buộc.

Việc tùy chọn (không bắt buộc): 1 Edge Function tương tự nếu muốn admin **đặt
thẳng** mật khẩu mới cho người khác thay vì gửi email đặt lại như hiện tại.

## 8. Chạy dự án ở máy khác

1. `npm install`.
2. Tạo file `.env` ở gốc dự án (xem `.env.example`), điền `VITE_SUPABASE_URL` và
   `VITE_SUPABASE_ANON_KEY` (Supabase Dashboard → Settings → API). **Không đưa file
   này lên Git** (đã có trong `.gitignore`).
3. Nếu là project Supabase mới hoàn toàn: làm theo `quan-ly/be/README.md` (7 bước).
4. `npm run dev` → trang bán hàng ở `/`, khu quản lý ở `/quan-ly`.

**Lưu ý bảo mật**: khóa `anon public` (trong `.env`) an toàn để lộ ra trình duyệt —
mọi quyền hạn của nó đều bị giới hạn bởi RLS ở mục 4. Khóa `service_role` (toàn
quyền, bỏ qua RLS) **không được xuất hiện ở bất kỳ đâu trong code FE**, chỉ dùng ở
Edge Function (mục 7) khi đội BE triển khai.
