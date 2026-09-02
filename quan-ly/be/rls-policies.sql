-- ============================================================================
-- Merifarm — Khu quản lý — Luật ai đọc/ghi được bảng nào (Row Level Security)
-- Chạy SAU khi đã chạy schema.sql. Cùng chạy trong SQL Editor.
-- ============================================================================

alter table products enable row level security;
alter table coupons enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payment_settings enable row level security;
alter table warehouse_settings enable row level security;
alter table admin_profiles enable row level security;

-- ── products: ai cũng đọc được (web công khai hiển thị) ─────────────────
create policy "products_public_read" on products
  for select using (true);

create policy "products_admin_write" on products
  for all
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

-- ── coupons: ai cũng đọc được mã đang bật (để áp mã lúc thanh toán) ─────
create policy "coupons_public_read" on coupons
  for select using (true);

create policy "coupons_admin_write" on coupons
  for all
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

-- ── payment_settings: ai cũng đọc được (trang thanh toán hiện QR) ───────
create policy "payment_settings_public_read" on payment_settings
  for select using (true);

-- Chỉ admin (không phải "authenticated" nói chung) mới sửa được — vai "user" chỉ xem.
create policy "payment_settings_admin_write" on payment_settings
  for all
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ── warehouse_settings: ai cũng đọc được (giỏ hàng hiện địa chỉ nhận tại kho) ──
create policy "warehouse_settings_public_read" on warehouse_settings
  for select using (true);

create policy "warehouse_settings_admin_write" on warehouse_settings
  for all
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

-- ── orders: ai cũng ĐẶT được (khách chưa đăng nhập), chỉ admin ĐỌC/SỬA ──
create policy "orders_public_insert" on orders
  for insert with check (true);

create policy "orders_admin_read" on orders
  for select using ((select auth.role()) = 'authenticated');

create policy "orders_admin_update" on orders
  for update
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

-- ── order_items: giống orders — ai cũng thêm được, chỉ admin đọc ────────
create policy "order_items_public_insert" on order_items
  for insert with check (true);

create policy "order_items_admin_read" on order_items
  for select using ((select auth.role()) = 'authenticated');

-- ── storage.objects: bucket product-images — ai cũng đọc, chỉ admin tải lên/sửa/xóa ──
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "product_images_admin_write" on storage.objects
  for all
  using (bucket_id = 'product-images' and (select auth.role()) = 'authenticated')
  with check (bucket_id = 'product-images' and (select auth.role()) = 'authenticated');

-- ── admin_profiles: ai đã đăng nhập cũng đọc được cả danh sách (để trang "Quản lý
-- người dùng" liệt kê) — chỉ tự sửa hồ sơ mình hoặc admin mới sửa được người khác.
-- Đổi cột role còn bị chặn thêm bởi trigger prevent_role_self_escalation (không phải
-- admin thì không tự nâng quyền được, dù RLS ở đây cho phép sửa dòng của chính mình).
create policy "admin_profiles_authenticated_read" on admin_profiles
  for select using ((select auth.role()) = 'authenticated');

create policy "admin_profiles_self_or_admin_write" on admin_profiles
  for update
  using ((select auth.uid()) = id or (select public.is_admin()))
  with check ((select auth.uid()) = id or (select public.is_admin()));
