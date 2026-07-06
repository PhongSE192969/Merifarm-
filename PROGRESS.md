# MERIFARM WEBSITE — PROGRESS LOG

> **Đọc file này trước khi làm bất cứ điều gì.** Nó ghi lại toàn bộ bối cảnh, quyết định kỹ thuật, tiến độ và việc cần làm tiếp theo.

---

## 1. THÔNG TIN DỰ ÁN

| Mục | Nội dung |
|-----|----------|
| **Thư mục dự án** | `D:\Work Mericy\Phân bón\Website` |
| **Dev server** | `http://localhost:5173` (chạy `npm run dev` trong thư mục dự án) |
| **Stack** | React 19 + Vite 8 + Tailwind CSS v3 + React Router v7 + Zustand v5 + lucide-react |
| **Font** | Be Vietnam Pro (Google Fonts) |
| **Thương hiệu** | Merifarm (tên thương hiệu công khai) |
| **Pháp nhân** | CÔNG TY TRÁCH NHIỆM HỮU HẠN PHÁT TRIỂN KỸ THUẬT TÂM PHÚC |
| **Hotline** | 0982 969 781 |
| **Email** | contact.merifarm@gmail.com |
| **Địa chỉ** | Số 5-7 Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh, Việt Nam |

---

## 2. BẢNG MÀU (tailwind.config.js)

```
primary:       #0F6B34   (bg-primary, text-primary)
primary-dark:  #0B5A2A   (bg-primary-dark, text-primary-dark)
footer:        #075426   (bg-footer)
accent:        #D9A441   (bg-accent, text-accent)
accent-light:  #E8C172
accent-dark:   #C58D25
cream:         #F7F1E8   (bg-cream) — nền chủ đạo
soft-green:    #EAF6EC   (bg-soft-green)
gold-soft:     #FFF4D8   (bg-gold-soft) — CHÚ Ý: đúng là gold-soft không phải soft-gold
ink:           #16301F   (text-ink) — màu chữ chính
secondary:     #4B5C50   (text-secondary)
faint:         #7A8A80   (text-faint)
soft:          #E9E2D6   (border-soft) — màu border
shadow-soft:   rgba(15,107,52,0.08)
shadow-softLg: rgba(15,107,52,0.12)
rounded-card:  1rem
```

> ⚠️ `text-muted` KHÔNG tồn tại trong config — dùng `text-secondary` hoặc `text-faint` thay thế.

---

## 3. CẤU TRÚC FILE QUAN TRỌNG

```
src/
  App.jsx                          — Routes chính
  components/
    layout/
      Navbar.jsx                   — NAV_LINKS có 4 trang
      Footer.jsx                   — Cột Hỗ trợ có đủ 7 link (5 chính sách + 2 liên hệ)
      Layout.jsx
      FloatingContactButton.jsx
    policy/                        ← MỚI (tạo session này)
      PolicyHero.jsx
      PolicyLayout.jsx             — 2 cột: sticky TOC trái + content phải
      PolicySection.jsx            — Card trắng với số + tiêu đề
      NeedHelpCTA.jsx
      LegalNote.jsx
    product/
      ProductCard.jsx
    ui/
      Button.jsx                   — variants: primary, accent, outline, outline-white, ghost
      Badge.jsx
      SectionHeading.jsx           — prop: dark={true} → chữ trắng
      Reveal.jsx                   — scroll fade-in, prop: delay={ms}
  data/
    products.json                  — 6 sản phẩm, mỗi sp có image + images[]
    categories.json
  pages/
    HomePage.jsx
    AboutPage.jsx
    ProductsPage.jsx
    ProductDetailPage.jsx          — gallery ảnh (main + thumbnails + prev/next)
    CartPage.jsx
    ContactPage.jsx
    policy/                        ← MỚI (tạo session này)
      HuongDanMuaHangPage.jsx      — 9 mục
      ChinhSachThanhToanPage.jsx   — 11 mục
      ChinhSachGiaoHangPage.jsx    — 10 mục
      ChinhSachDoiTraPage.jsx      — 10 mục
      ChinhSachBaoMatPage.jsx      — 21 mục
  store/
    cartStore.js
  utils/
    format.js

public/
  products/
    magie-bo-kem-no1/             — 8 ảnh: img-1.png, img-2.jpg … img-8.jpg
    ph-balance-humate-79/         — 7 ảnh: img-1.jpg … img-7.jpg
    ra-re-no-bui/                 — 7 ảnh: img-1.jpg … img-7.jpg
    vo-gao-nhanh/                 — 7 ảnh: img-1.jpg … img-7.jpg
    lun-cay-ruoc-dong/            — 7 ảnh: img-1.jpg … img-7.jpg
    loang-trai-tham-sau/          — 5 ảnh: img-1.jpg … img-5.jpg
    (các file .jpg/.png cũ vẫn còn nhưng không dùng nữa)
  logo.png
```

---

## 4. ROUTES

```
/                                              → HomePage
/gioi-thieu                                   → AboutPage
/san-pham                                     → ProductsPage
/san-pham/:slug                               → ProductDetailPage
/gio-hang                                     → CartPage
/lien-he                                      → ContactPage
/chinh-sach/huong-dan-mua-hang                → HuongDanMuaHangPage
/chinh-sach/chinh-sach-thanh-toan             → ChinhSachThanhToanPage
/chinh-sach/chinh-sach-giao-hang              → ChinhSachGiaoHangPage
/chinh-sach/chinh-sach-doi-tra-hoan-tien      → ChinhSachDoiTraPage
/chinh-sach/chinh-sach-bao-mat-thong-tin-ca-nhan → ChinhSachBaoMatPage
```

---

## 5. TIẾN ĐỘ — NHỮNG GÌ ĐÃ HOÀN THÀNH

### [Session 1 — trước khi có file này]
- ✅ Khởi tạo project Vite + React + Tailwind + Router + Zustand
- ✅ Layout, Navbar, Footer, FloatingContactButton
- ✅ HomePage với parallax bg-fixed (áp dụng trực tiếp lên `<section>`, KHÔNG dùng child div bên trong overflow-hidden)
- ✅ ProductsPage + ProductCard + filter theo danh mục + tìm kiếm
- ✅ ProductDetailPage (phiên bản cũ — 1 ảnh)
- ✅ CartPage, ContactPage
- ✅ 6 sản phẩm trong products.json
- ✅ AboutPage với 9 section
- ✅ Thêm /gioi-thieu vào Navbar và Footer
- ✅ Fix parallax bị lỗi: chuyển bg-fixed từ child div lên section element
- ✅ Category cards ở HomePage dùng photo-top card design (CATEGORY_VISUALS lookup)
- ✅ Fix ảnh sản phẩm Loang Trải Thấm Sâu

### [Session 2]

- ✅ Tạo hệ thống 5 trang chính sách (/chinh-sach/...)
  - 5 shared components trong `src/components/policy/`
  - 5 page files trong `src/pages/policy/`
  - Cập nhật App.jsx thêm 5 routes
  - Cập nhật Footer.jsx thêm 5 link chính sách
- ✅ AboutPage hero: đổi từ 2 cột (text + ảnh) sang full-width background image
  - Ảnh: `photo-1625246333195-78d9c38ad449` từ Unsplash (vườn nông trại)
  - Overlay: `bg-black/70`
  - Parallax: `bg-fixed bg-cover bg-center`
- ✅ Product gallery:
  - Copy 41 ảnh thực tế vào `public/products/{slug}/` (nguồn: `D:\Work Mericy\Hình ảnh\Phân bón\Hình ảnh sản phẩm`)
  - Cập nhật products.json: thêm field `images: []` cho mỗi sản phẩm
  - Nâng cấp ProductDetailPage: gallery với ảnh lớn + thumbnail + prev/next arrows + counter

### [Session 3 — 2026-07-04]

- ✅ Cập nhật ảnh card sản phẩm trong products.json (chọn ảnh có hình bịch/chai/lọ thực tế):
  - pH Balance: img-1 → img-7
  - Vô Gạo Nhanh: img-1 → img-5
  - Lùn Cây - Rước Đòng: img-1 → img-5
  - Loang Trải Thấm Sâu: img-1 → img-3
  - Magie Bo Kẽm & Ra Rễ: giữ nguyên img-1 (đã đúng)
- ✅ Tạo `src/data/productDetails.js` — dữ liệu chi tiết mở rộng cho 6 sản phẩm
  - Export: `CROP_LABELS`, `FORM_LABELS`, `CATEGORY_LABELS`, và `default` object (keyed by slug)
  - Mỗi sản phẩm có: `overview`, `ingredientItems[]`, `benefitItems[]`, `usageSteps[]`, `dosageTable[]|null`, `storageItems[]`, `warningNote`, `quickInfo{}`, `benefits[]` (4 cards), `suitableWhen[]` (5 cards), `specification{}`
  - Thông tin được đọc trực tiếp từ ảnh nhãn sản phẩm — không phịa
  - `COMMON_STORAGE` (6 mục) và `COMMON_WARNING` (2 đoạn) dùng chung
- ✅ Redesign hoàn toàn `src/pages/ProductDetailPage.jsx`
  - Hero 2 cột: gallery ảnh (trái) + sticky purchase sidebar (phải, `sticky top-24 self-start`)
  - Hover zoom ảnh (`group-hover:scale-105`)
  - 6 Quick Info Cards (FlaskConical, MapPin, Package, TestTube2, Zap, Thermometer)
  - Tabs desktop (`hidden md:flex` + `hidden md:block`) / Accordion mobile (`md:hidden`, max-height transition)
  - 7 tab contents: Tổng quan, Thành phần (bảng), Công dụng, Cây phù hợp, Cách sử dụng (bảng liều lượng), Bảo quản, Lưu ý
  - Benefits section (4 cards, `bg-soft-green`, icon động via ICON_MAP)
  - Suitable When section (5 cards compact)
  - Product Specification table (striped)
  - Consultation CTA (`bg-primary` dark banner, link `/lien-he?product=...`)
  - Related Products (lên đến 4 sp cùng danh mục)
  - Mobile Sticky Cart Bar (`fixed bottom-0 z-50 md:hidden`)
  - `pb-24 md:pb-0` tránh overlap với mobile bar

---

## 6. QUY TẮC KỸ THUẬT QUAN TRỌNG

### Parallax (bg-fixed)
```jsx
// ✅ ĐÚNG — bg-fixed đặt TRỰC TIẾP trên <section>
<section className="relative bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(...)' }}>
  <div className="absolute inset-0 bg-primary-dark/80" />  {/* overlay */}
  <div className="relative ...">content</div>             {/* content wrapper */}
</section>

// ❌ SAI — bg-fixed trong child div bên trong overflow-hidden sẽ bị vỡ
<section className="relative overflow-hidden">
  <div className="h-full w-full bg-fixed ...">...</div>
</section>
```

### Unsplash URLs
```
✅ https://images.unsplash.com/photo-XXXXXXXX?w=600&q=80&auto=format&fit=crop
❌ https://plus.unsplash.com/premium_photo-... (yêu cầu trả phí)
```

### Product data structure
```json
{
  "image": "/products/{slug}/img-1.jpg",   // ảnh dùng cho card
  "images": [                               // gallery trong detail page
    "/products/{slug}/img-1.jpg",
    "/products/{slug}/img-2.jpg",
    ...
  ]
}
```

### SectionHeading dark mode
```jsx
<SectionHeading eyebrow="..." title="..." dark />  // chữ trắng, dùng trên nền tối
```

### Nguồn ảnh sản phẩm gốc
```
D:\Work Mericy\Hình ảnh\Phân bón\Hình ảnh sản phẩm\
  Loang trãi\          → loang-trai-tham-sau  (5 ảnh)
  Lùn Cây - Rước Đòng\ → lun-cay-ruoc-dong    (7 ảnh)
  Magie Bo Kẽm\        → magie-bo-kem-no1     (8 ảnh, ảnh chính.png là img-1)
  pH Balance\          → ph-balance-humate-79  (7 ảnh)
  Ra rễ - nở bụi\      → ra-re-no-bui         (7 ảnh)
  Vô Gạo Nhanh\        → vo-gao-nhanh         (7 ảnh)
```

### [Session 4 — 2026-07-05]

- ✅ Featured products section (HomePage): thêm tag `ban-chay` cho 3 sản phẩm → 6 card (đủ 6)
- ✅ Chuyển layout 6 card từ grid 2 hàng → horizontal scroll 1 hàng (`flex overflow-x-auto`, mỗi card `w-52 shrink-0`, scrollbar ẩn)
- ✅ Giảm shadow toàn site: `shadow-soft` → `shadow-sm`, `shadow-softLg` → `shadow-md` (9 file JSX)
- ✅ Cập nhật ảnh Unsplash cho AboutPage — AUDIENCES (5 card "Đối tượng phục vụ"):
  - Nông dân: photo-1682691503311-839fdb6ac50c
  - Cửa hàng VTNN: photo-1722893960889-5f2d88ce6524
  - Đại lý: photo-1587293852726-70cdb56c2866
  - Trang trại/HTX: photo-1509099381441-ea3c0cf98b94
  - Người trồng tại nhà: photo-1530968464165-7a1861cbaf9f
- ✅ Cập nhật ảnh Unsplash cho AboutPage — MVV (3 card Sứ mệnh/Tầm nhìn/Giá trị):
  - Sứ mệnh: photo-1633410195091-bd66114cef5f
  - Tầm nhìn: photo-1781032480530-5809498d868b
  - Giá trị cốt lõi: photo-1757283588694-9ff82d409b4d
- ✅ Cập nhật ảnh Unsplash cho AboutPage — PRODUCTS_CAT (5 card sản phẩm chủ lực)
  và đồng bộ CATEGORY_VISUALS trên HomePage (cùng URL)
- ✅ Thêm variant `outline-white` vào Button.jsx (`border border-white text-white hover:bg-white hover:text-primary-dark`)
- ✅ Đổi button "Xem tất cả sản phẩm" trong section featured (nền `bg-primary-dark/80`) → `variant="outline-white"` để hiển thị rõ trên nền tối

### [Session 5 — 2026-07-06] ← HOÀN THIỆN TOÀN TRANG

- ✅ **ContactPage — thiết kế lại hoàn toàn**
  - Hero có lá trang trí (svg absolute positioning)
  - Layout 2 cột: trái (4 contact card + khung đội ngũ), phải (form tư vấn chip-based)
  - Form chip-based với 4 nhóm chip (multi-select + single-select): loại cây trồng, quy mô, tình trạng cây, nhu cầu tư vấn
  - Mỗi nhóm có field "Khác" xuất hiện động khi chọn "Khác"
  - Section hợp tác ở cuối (3 card: Đại lý, KOL/KOC, Nông trại) với ảnh Unsplash
  - Khung đội ngũ: photo-1682691503311-839fdb6ac50c + overlay tối + badge icon
- ✅ **Mobile responsive toàn website**
  - `Navbar.jsx`: mobile drawer animation, body scroll prevention, auto-close on route change
  - `Footer.jsx`: accordion cho "Danh mục sản phẩm" và "Hỗ trợ" trên mobile; contact info hiển thị dưới logo
  - `FloatingContactButton.jsx`: bottom `calc(env(safe-area-inset-bottom,0px) + 80px)` tránh overlap
  - `HomePage.jsx`: hero `py-16 md:py-32`; tất cả grid dùng `grid-cols-2` base mobile
  - `ProductsPage.jsx`: toolbar mobile (search + filter button + sort); bottom sheet filter với backdrop blur
  - `ProductDetailPage.jsx`: mobile sticky cart bar (`fixed bottom-0 z-50 md:hidden`), pb-24 spacer
  - `AboutPage.jsx`: hero `py-16 md:py-36`; tất cả grid `grid-cols-2` mobile
  - `CartPage.jsx`: sticky bottom bar mobile (tổng tiền + nút gửi), dùng `formRef.current?.requestSubmit()`
  - `PolicyLayout.jsx`: collapsible TOC trên mobile (accordion max-h transition), TOC cố định desktop
  - `SectionHeading.jsx`: fix `text-muted` → `text-secondary`
  - `ProductCard.jsx`: fix `text-muted` → `text-secondary`
- ✅ **Đổi thứ tự nav**: Trang chủ → Sản phẩm → Giới thiệu → Liên hệ
- ✅ **ScrollToTop**: `src/components/ScrollToTop.jsx` — scroll lên đầu trang khi chuyển route (behavior: instant)

---

## 7. VIỆC CÒN LẠI / CÓ THỂ LÀM TIẾP

- [ ] Thêm sản phẩm mới (xem CONTEXT.md — "Cách thêm sản phẩm mới")
- [ ] Tối ưu ảnh (nén các ảnh lớn nếu cần)
- [ ] Build production: `npm run build`
- [ ] Deploy lên hosting (chưa thực hiện)
- [ ] Tích hợp form liên hệ / đặt hàng với backend thực (hiện tại chỉ là UI)

---

## 8. LỖI ĐÃ GẶP VÀ CÁCH SỬA

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Site bị trắng / không vào được | bg-fixed đặt trong child div bên trong overflow-hidden | Chuyển bg-fixed lên trực tiếp section element |
| text-muted không có màu | Không khai báo trong tailwind.config.js | Dùng text-secondary hoặc text-faint |
| Dev server không chạy | Chạy lệnh npm ở sai thư mục | cd "D:\Work Mericy\Phân bón\Website" trước khi npm run dev |
| Ảnh loang-trai-tham-sau bị 404 | File không tồn tại trong public/products/ | Copy từ D:\Work Mericy\Hình ảnh\Mockup\chai chiết mericy.jpg |

---

*Cập nhật lần cuối: 2026-07-06 — Session 5 (HOÀN THIỆN)*

> Xem thêm file **CONTEXT.md** để nắm đầy đủ kiến trúc, design system, tone giọng và hướng dẫn chỉnh sửa.
