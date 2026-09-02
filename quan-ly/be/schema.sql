-- ============================================================================
-- Merifarm — Khu quản lý — Schema Supabase
-- Chạy toàn bộ file này trong Supabase Dashboard > SQL Editor > New query > Run
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── products ─────────────────────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  sku text,
  category text not null,
  crop_types jsonb not null default '[]',
  package_unit text not null,
  form text not null,
  price numeric,
  original_price numeric,
  image text,
  images jsonb not null default '[]',
  short_description text,
  ingredients text,
  usage_instructions text,
  usage_needs jsonb not null default '[]',
  tags jsonb not null default '[]',
  in_stock boolean not null default true,

  -- chi tiết kỹ thuật (Tab "Chi tiết kỹ thuật")
  overview text,
  ingredient_items jsonb not null default '[]',
  ingredient_note text,
  benefit_items jsonb not null default '[]',
  usage_steps jsonb not null default '[]',
  dosage_table jsonb,
  storage_items jsonb not null default '[]',
  warning_note text,
  quick_info jsonb not null default '{}',
  benefits jsonb not null default '[]',
  suitable_when jsonb not null default '[]',
  specification jsonb not null default '{}',
  shipping jsonb not null default '{}',

  updated_by text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ── coupons ──────────────────────────────────────────────────────────────
create table if not exists coupons (
  code text primary key,
  type text not null check (type in ('fixed', 'percent')),
  value numeric not null,
  expires_at date,
  max_uses integer,
  active boolean not null default true,
  updated_by text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ── orders ───────────────────────────────────────────────────────────────
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,

  customer_name text not null,
  customer_phone text not null,
  customer_email text,

  delivery_method text not null,
  street text,
  ward text,
  province_name text,

  payment_method text not null,

  coupon_code text references coupons(code),
  coupon_discount numeric,

  e_invoice boolean not null default false,
  invoice_type text,
  invoice_name text,
  invoice_address text,
  invoice_tax_code text,
  invoice_email text,

  subtotal numeric not null,
  shipping numeric not null default 0,
  total numeric not null,
  note text,

  status text not null default 'pending'
    check (status in ('pending','confirmed','shipped','done','cancelled')),
  status_history jsonb not null default '[]',

  has_issue boolean not null default false,
  issue_note text,
  return_requested boolean not null default false,

  submitted_at timestamptz not null default now()
);

-- ── order_items (món đã đặt trong từng đơn) ─────────────────────────────
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  qty integer not null check (qty > 0),
  price numeric not null
);

create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_order_items_product_id on order_items(product_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_coupon_code on orders(coupon_code);

-- ── payment_settings (đúng 1 dòng duy nhất) ─────────────────────────────
create table if not exists payment_settings (
  id integer primary key default 1 check (id = 1),
  bank_name text not null default '',
  account_number text not null default '',
  account_holder text not null default '',
  qr_image text,
  updated_by text,
  updated_at timestamptz not null default now()
);

insert into payment_settings (id) values (1)
  on conflict (id) do nothing;

-- ── warehouse_settings (đúng 1 dòng duy nhất) — địa chỉ nhận hàng cho đơn vị vận chuyển ──
create table if not exists warehouse_settings (
  id integer primary key default 1 check (id = 1),
  address text,
  ward text,
  province text,
  phone1 text,
  phone2 text,
  carrier text,
  contact_name text,
  updated_by text,
  updated_at timestamptz not null default now()
);

insert into warehouse_settings (id) values (1)
  on conflict (id) do nothing;

-- ── admin_profiles (vai trò từng tài khoản quản trị) ─────────────────────
-- Mỗi tài khoản Supabase Auth có đúng 1 dòng ở đây. Cột role là text (không phải
-- Postgres enum) để sau này thêm vai trò mới chỉ cần thêm dữ liệu, không cần sửa schema.
create table if not exists admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tự tạo hồ sơ role='user' cho MỌI tài khoản mới (kể cả tạo qua Supabase Dashboard).
create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.admin_profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_admin_profile on auth.users;
create trigger on_auth_user_created_admin_profile
  after insert on auth.users
  for each row execute function public.handle_new_admin_user();

-- Helper dùng trong RLS: đọc role của người đang gọi, security definer để tránh
-- đệ quy RLS khi chính admin_profiles cũng cần kiểm tra is_admin().
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Chặn tự nâng quyền: 1 tài khoản không phải admin không được tự đổi role của
-- chính mình, dù RLS có cho phép sửa dòng của mình (đổi display_name chẳng hạn).
create or replace function public.prevent_role_self_escalation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Chỉ quản trị viên mới đổi được vai trò.';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_self_escalation on admin_profiles;
create trigger trg_prevent_role_self_escalation
  before update on admin_profiles
  for each row execute function public.prevent_role_self_escalation();
