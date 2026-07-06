# MERIFARM — TÀI LIỆU THAM CHIẾU TOÀN DIỆN

> **Đọc file này khi muốn chỉnh sửa, thêm tính năng, hoặc cập nhật nội dung.**
> File PROGRESS.md ghi lịch sử theo session. File này ghi kiến trúc, style, quy tắc — không thay đổi theo thời gian.

---

## 1. THÔNG TIN THƯƠNG HIỆU & DOANH NGHIỆP

| Mục | Nội dung |
|-----|----------|
| **Thương hiệu** | Merifarm |
| **Pháp nhân** | CÔNG TY TNHH PHÁT TRIỂN KỸ THUẬT TÂM PHÚC |
| **Lĩnh vực** | Phân bón nông nghiệp — phân bón lá, phân bón rễ, NPK, sinh học |
| **Thị trường** | Nông dân, cửa hàng VTNN, đại lý, trang trại, người trồng tại nhà (Việt Nam) |
| **Hotline** | 0982 969 781 |
| **Email** | contact.merifarm@gmail.com |
| **Địa chỉ** | Số 5-7 Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh |
| **Zalo** | 0982 969 781 |

### Tone giọng & style nội dung

- **Thực tế, gần gũi với nông dân** — tránh dùng từ ngữ học thuật quá khô khan
- **Dùng tiếng Việt thuần**, hạn chế anglicism không cần thiết
- **Tin tưởng qua dữ liệu** — nêu con số cụ thể (nồng độ %, liều lượng ml/m², thời gian bón)
- **Nhấn mạnh hiệu quả thực tế** — "Ra rễ mạnh trong 7 ngày", "Tăng tỉ lệ đậu trái", không nói chung chung
- **Ngắn gọn, rõ ràng** — heading ngắn, bullet point nhiều hơn đoạn văn dài
- **Màu sắc cảm xúc** — xanh lá = tự nhiên/an toàn, vàng gold = chất lượng/giá trị, kem/nâu đất = truyền thống/bền vững

---

## 2. TECH STACK

```
React 19 + Vite 8
Tailwind CSS v3 (PostCSS + Autoprefixer)
React Router v7
Zustand v5 (cart state, persist localStorage)
lucide-react (icon set)
Font: Be Vietnam Pro (Google Fonts — hỗ trợ tiếng Việt tốt)
```

**Chạy dev server:**
```bash
cd "D:\Work Mericy\Phân bón\Website"
npm run dev
# Mở http://localhost:5173
```

**Build production:**
```bash
npm run build
# Output: dist/
```

---

## 3. DESIGN SYSTEM

### 3.1 Bảng màu (tailwind.config.js)

```
Token Tailwind          Hex           Dùng cho
─────────────────────────────────────────────────────────────
bg-primary / text-primary    #0F6B34   Nút CTA chính, nav active, link
bg-primary-dark              #0B5A2A   Nút hover, nền section tối
bg-footer                    #075426   Footer
bg-accent / text-accent      #D9A441   Badge, giá nổi bật, star rating
accent-light                 #E8C172   Accent nhạt
accent-dark                  #C58D25   Accent đậm
bg-cream                     #F7F1E8   Nền trang chính (off-white ấm)
bg-soft-green                #EAF6EC   Nền card hover, section nhạt
bg-gold-soft                 #FFF4D8   Nền badge khuyến mãi (gold-soft, KHÔNG phải soft-gold)
text-ink                     #16301F   Màu chữ chính
text-secondary               #4B5C50   Chữ phụ, mô tả
text-faint                   #7A8A80   Placeholder, nhãn nhỏ
border-soft                  #E9E2D6   Border card, divider
shadow-soft                  rgba(15,107,52,0.08)   Custom shadow nhẹ
shadow-softLg                rgba(15,107,52,0.12)   Custom shadow mạnh hơn
rounded-card                 1rem      Bo góc card
```

> ⚠️ **KHÔNG có `text-muted`** trong config — luôn dùng `text-secondary` hoặc `text-faint`.

### 3.2 Typography

- Font duy nhất: **Be Vietnam Pro** (nhập từ Google Fonts trong `index.css`)
- Heading cấp 1 (`h1`): `text-3xl md:text-5xl font-bold text-ink`
- Heading cấp 2 (`h2`): `text-2xl md:text-3xl font-bold text-ink`
- Body: `text-base text-secondary`
- Caption: `text-sm text-faint`
- Giá sản phẩm: `text-2xl font-bold text-primary-dark`
- Badge/tag: `text-xs font-bold uppercase tracking-wide`

### 3.3 Spacing & Layout

- Nền trang: `bg-cream`
- Max width content: `max-w-6xl mx-auto px-4`
- Section padding desktop: `py-20` hoặc `py-24`
- Section padding mobile: `py-12` hoặc `py-16`
- Card: `rounded-card bg-white shadow-sm`
- Khoảng cách grid: `gap-4` desktop, `gap-3` mobile

### 3.4 Unsplash — Quy tắc URL

```
✅ DÙNG:    https://images.unsplash.com/photo-XXXXXXXX?w=600&q=80&auto=format&fit=crop
❌ KHÔNG DÙNG: https://plus.unsplash.com/premium_photo-...  (yêu cầu trả phí)
```

Tham số `w=` điều chỉnh theo use case:
- Card nhỏ: `w=400`
- Card lớn / hero section: `w=800` hoặc `w=1200`
- Thumbnail sản phẩm: `w=300`

---

## 4. KIẾN TRÚC — CẤU TRÚC FILE

```
D:\Work Mericy\Phân bón\Website\
  public/
    logo.png
    products/
      magie-bo-kem-no1/     img-1.png, img-2.jpg … img-8.jpg
      ph-balance-humate-79/ img-1.jpg … img-7.jpg  (card: img-7)
      ra-re-no-bui/         img-1.jpg … img-7.jpg
      vo-gao-nhanh/         img-1.jpg … img-7.jpg  (card: img-5)
      lun-cay-ruoc-dong/    img-1.jpg … img-7.jpg  (card: img-5)
      loang-trai-tham-sau/  img-1.jpg … img-5.jpg  (card: img-3)

  src/
    App.jsx                        Routes + ScrollToTop
    index.css                      Font import + Tailwind directives
    main.jsx

    components/
      ScrollToTop.jsx              Scroll lên đầu khi đổi route
      layout/
        Layout.jsx                 Outlet wrapper (Navbar + Footer)
        Navbar.jsx                 NAV_LINKS: Trang chủ/Sản phẩm/Giới thiệu/Liên hệ
        Footer.jsx                 Accordion mobile (Danh mục + Hỗ trợ)
        FloatingContactButton.jsx  Nút nổi Zalo+Phone (bottom-safe + 80px)
      policy/
        PolicyHero.jsx             Hero section cho trang chính sách
        PolicyLayout.jsx           TOC sticky desktop / collapsible mobile + main content
        PolicySection.jsx          Card trắng với số thứ tự + tiêu đề + nội dung
        NeedHelpCTA.jsx            Banner "Cần hỗ trợ?" ở cuối trang chính sách
        LegalNote.jsx              Ghi chú pháp lý nhỏ ở footer trang chính sách
      product/
        ProductCard.jsx            Card sản phẩm (ảnh + tên + giá + tag + nút)
      ui/
        Button.jsx                 variants: primary, accent, outline, outline-white, ghost
        Badge.jsx                  Tag badge (ban-chay, moi, khuyen-mai)
        SectionHeading.jsx         Heading section (eyebrow + title + description)
        Reveal.jsx                 Scroll fade-in animation (prop: delay={ms})

    data/
      products.json                6 sản phẩm (schema xem Mục 5)
      productDetails.js            Chi tiết mở rộng 6 sản phẩm (schema xem Mục 5)
      categories.json              [{id, name, icon}] — 5 danh mục
      cropTypes.json               [{id, name}] — loại cây trồng
      usageNeeds.json              [{id, name}] — nhu cầu sử dụng
      productForms.json            [{id, name}] — dạng sản phẩm (bột/hạt/nước)
      vietnam-address-2025.js      34 tỉnh thành 2025 + 183 phường xã TPHCM
      vnAddress.js                 (legacy — không dùng nữa)

    pages/
      HomePage.jsx
      AboutPage.jsx
      ProductsPage.jsx
      ProductDetailPage.jsx
      CartPage.jsx
      ContactPage.jsx
      OrderSuccessPage.jsx
      policy/
        HuongDanMuaHangPage.jsx    9 mục
        ChinhSachThanhToanPage.jsx 11 mục
        ChinhSachGiaoHangPage.jsx  10 mục
        ChinhSachDoiTraPage.jsx    10 mục
        ChinhSachBaoMatPage.jsx    21 mục

    store/
      cartStore.js    addItem, removeItem, updateQty, totalItems, totalPrice, clearCart
    utils/
      format.js       formatPrice(n) → "72.000 ₫"
```

---

## 5. ROUTES

```
/                                               → HomePage
/san-pham                                       → ProductsPage
/san-pham/:slug                                 → ProductDetailPage
/gioi-thieu                                     → AboutPage
/lien-he                                        → ContactPage
/gio-hang                                       → CartPage
/dat-hang-thanh-cong                            → OrderSuccessPage
/chinh-sach/huong-dan-mua-hang                  → HuongDanMuaHangPage
/chinh-sach/chinh-sach-thanh-toan               → ChinhSachThanhToanPage
/chinh-sach/chinh-sach-giao-hang                → ChinhSachGiaoHangPage
/chinh-sach/chinh-sach-doi-tra-hoan-tien        → ChinhSachDoiTraPage
/chinh-sach/chinh-sach-bao-mat-thong-tin-ca-nhan → ChinhSachBaoMatPage
```

---

## 6. DATA SCHEMAS

### 6.1 products.json — mỗi sản phẩm

```json
{
  "id": 1,                              // số nguyên tăng dần
  "slug": "ten-san-pham-dang-slug",     // URL-friendly, dùng dấu gạch ngang
  "name": "Tên Sản Phẩm",
  "category": "phan-bon-la",           // phan-bon-la | phan-bon-re | npk | huu-co | vi-sinh
  "cropTypes": ["lua", "rau-mau"],     // mảng — lua|rau-mau|cay-an-trai|hoa-kieng|cay-cong-nghiep
  "packageUnit": "Gói 500g",
  "form": "bot",                       // bot | hat | nuoc
  "price": 72000,                      // VND, null nếu "Liên hệ"
  "image": "/products/{slug}/img-X.jpg", // ảnh hiển thị trên card (chọn ảnh đẹp nhất)
  "images": ["/products/{slug}/img-1.jpg", "..."],  // tất cả ảnh cho gallery
  "shortDescription": "Mô tả ngắn ≤ 2 dòng.",
  "ingredients": "Thành phần đơn giản.",
  "usageInstructions": "Hướng dẫn sử dụng ngắn.",
  "usageNeeds": ["ra-re", "xanh-la"],  // ra-re|xanh-la|nuoi-trai|duong-cay|cai-tao-dat|ra-hoa|phuc-hoi-cay-yeu
  "tags": ["ban-chay"],                // ban-chay | moi | khuyen-mai (dùng để lọc + badge)
  "inStock": true
}
```

### 6.2 productDetails.js — chi tiết mở rộng

```js
// Import:
import productDetails from '../data/productDetails.js'
// Truy cập:
const detail = productDetails[slug]  // key = slug sản phẩm

// Cấu trúc mỗi entry:
{
  overview: "Đoạn mô tả dài (2-3 đoạn).",
  ingredientItems: [{ label: "Tên thành phần", value: "X%" }, ...],
  benefitItems: ["Lợi ích 1", "Lợi ích 2", ...],
  usageSteps: ["Bước 1: ...", "Bước 2: ...", ...],
  dosageTable: [                         // null nếu không có bảng liều lượng
    { stage: "Giai đoạn", dose: "Liều", note: "Ghi chú" }, ...
  ],
  storageItems: ["Bảo quản mát", ...],   // dùng COMMON_STORAGE nếu giống nhau
  warningNote: "Lưu ý an toàn.",        // dùng COMMON_WARNING nếu giống nhau
  quickInfo: {
    origin: "Việt Nam",
    form: "Dạng bột",
    packaging: "Gói 500g",
    targetCrop: "Đa cây trồng",
    effect: "Hiệu lực 7–10 ngày",
    storage: "Dưới 30°C"
  },
  benefits: [   // 4 card lợi ích nổi bật (IconName từ lucide-react)
    { icon: "Leaf", title: "Tiêu đề", description: "Mô tả ngắn." }, ...
  ],
  suitableWhen: [   // 5 tình huống phù hợp
    { icon: "AlertTriangle", text: "Dùng khi..." }, ...
  ],
  specification: {
    "Tên thông số": "Giá trị", ...
  }
}
```

---

## 7. COMPONENT PATTERNS

### 7.1 SectionHeading

```jsx
// Trên nền sáng
<SectionHeading eyebrow="CATALOG" title="Sản phẩm của chúng tôi" description="Mô tả tuỳ chọn." />

// Trên nền tối (chữ trắng)
<SectionHeading eyebrow="VỀ CHÚNG TÔI" title="Câu chuyện Merifarm" dark />
```

### 7.2 Button

```jsx
<Button variant="primary">Xem sản phẩm</Button>
<Button variant="accent">Đặt hàng ngay</Button>
<Button variant="outline">Tìm hiểu thêm</Button>
<Button variant="outline-white">Xem tất cả</Button>  {/* trên nền tối */}
<Button variant="ghost">Bỏ qua</Button>
```

### 7.3 Reveal (fade-in khi scroll)

```jsx
<Reveal>
  <div>Nội dung sẽ fade in khi scroll đến.</div>
</Reveal>
<Reveal delay={150}>  {/* delay ms để stagger */}
  <div>Nội dung fade in sau 150ms.</div>
</Reveal>
```

### 7.4 Parallax Section (BẮT BUỘC đặt bg-fixed trực tiếp trên section)

```jsx
// ✅ ĐÚNG
<section
  className="relative bg-fixed bg-cover bg-center py-24"
  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-XXXX?w=1200&q=80&auto=format&fit=crop)' }}
>
  <div className="absolute inset-0 bg-primary-dark/80" />
  <div className="relative z-10 mx-auto max-w-6xl px-4">
    {/* nội dung */}
  </div>
</section>

// ❌ SAI — bg-fixed trong child div bên trong overflow-hidden sẽ bị vỡ trên Safari/iOS
<section className="relative overflow-hidden">
  <div className="h-full w-full bg-fixed bg-cover bg-center" style={{ backgroundImage: '...' }} />
</section>
```

### 7.5 Chip Group (ContactPage pattern — tái sử dụng nếu cần)

```jsx
function ChipGroup({ options, selected, onToggle, multi = true }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isOn = multi ? selected.includes(opt) : selected === opt
        return (
          <button key={opt} type="button" onClick={() => onToggle(opt)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all
              ${isOn
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-soft bg-white text-ink hover:border-primary/50 hover:bg-soft-green hover:text-primary-dark'
              }`}
          >{opt}</button>
        )
      })}
    </div>
  )
}
// Multi-select: selected là mảng, onToggle toggle item trong mảng
// Single-select: selected là string, onToggle set/unset string
```

### 7.6 Mobile Bottom Sheet (ProductsPage pattern)

```jsx
{sheetOpen && (
  <>
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
      onClick={() => setSheetOpen(false)} />
    <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl bg-white shadow-2xl md:hidden">
      <div className="flex items-center justify-between border-b border-soft px-4 py-3">
        {/* Header */}
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Nội dung cuộn được */}
      </div>
      <div className="border-t border-soft px-4 py-3">
        {/* Footer CTA */}
      </div>
    </div>
  </>
)}
```

### 7.7 Accordion (Footer pattern)

```jsx
function AccordionGroup({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-white/10 md:border-0">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between py-3 font-semibold md:cursor-default md:py-0">
        {title}
        <ChevronDown size={16} className={`md:hidden transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 md:block md:!max-h-none md:opacity-100
        ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pb-3 md:pb-0 md:pt-4">{children}</div>
      </div>
    </div>
  )
}
```

---

## 8. MOBILE RESPONSIVE — NGUYÊN TẮC

| Pattern | Cách làm |
|---------|----------|
| Grid mobile | `grid-cols-2` làm base, thêm `sm:grid-cols-3 lg:grid-cols-5` |
| Hero height | `py-16 md:py-32` — mobile ngắn hơn |
| Filter | Bottom sheet trên mobile, sidebar trên desktop (`hidden md:block`) |
| Footer section | Accordion collapse trên mobile |
| Cart / checkout | Sticky bottom bar `fixed bottom-0` trên mobile |
| Product detail tab | Accordion trên mobile (`md:hidden`), tab row trên desktop (`hidden md:flex`) |
| Floating button | `bottom: calc(env(safe-area-inset-bottom, 0px) + 80px)` |
| Viewport height | Dùng `100dvh` thay `100vh` để tránh address bar iOS |
| Safe area | `style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}` |

---

## 9. CART STORE API (cartStore.js)

```js
import { useCartStore } from '../store/cartStore'

const addItem    = useCartStore(s => s.addItem)     // addItem({ id, name, price, image, packageUnit })
const removeItem = useCartStore(s => s.removeItem)  // removeItem(id)
const updateQty  = useCartStore(s => s.updateQty)   // updateQty(id, qty)
const clearCart  = useCartStore(s => s.clearCart)   // clearCart()
const items      = useCartStore(s => s.items)       // [{...product, qty}]
const totalItems = useCartStore(s => s.totalItems()) // số lượng tổng
const totalPrice = useCartStore(s => s.totalPrice()) // tổng tiền (number)
```

---

## 10. CÁC LỖI HAY GẶP VÀ CÁCH SỬA

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| Chữ không thấy / màu sai | Dùng `text-muted` không tồn tại | Dùng `text-secondary` (đậm) hoặc `text-faint` (nhạt) |
| Parallax bị vỡ / không có hiệu ứng | `bg-fixed` đặt trong child div bên trong `overflow-hidden` | Chuyển `bg-fixed` lên trực tiếp `<section>` element |
| Dev server không chạy | Chạy npm ở sai thư mục | `cd "D:\Work Mericy\Phân bón\Website"` trước |
| Ảnh 404 | File chưa copy vào `public/products/{slug}/` | Copy ảnh từ `D:\Work Mericy\Hình ảnh\Phân bón\Hình ảnh sản phẩm\` |
| Unsplash ảnh không load | Dùng URL `plus.unsplash.com` (premium) | Chỉ dùng `images.unsplash.com/photo-XXXX` |
| Mobile filter đẩy nội dung xuống | Filter inline trên mobile | Dùng bottom sheet pattern (xem Mục 7.6) |
| iOS: trang bị che bởi address bar | Dùng `100vh` | Chuyển sang `100dvh` |
| iOS: nội dung bị notch che | Không có safe area | Thêm `env(safe-area-inset-bottom, 0px)` |

---

## 11. HƯỚNG DẪN THỰC HÀNH

### 11.1 Thêm sản phẩm mới

1. **Copy ảnh** vào `public/products/{slug-moi}/` (img-1.jpg, img-2.jpg, ...)
2. **Thêm entry** vào `src/data/products.json`:
   - Tăng `id` lên 1 (7, 8, ...)
   - Đặt `slug` dạng kebab-case (ví dụ: `"phan-bon-nk-30-10"`)
   - Chọn `image` là ảnh đẹp nhất cho card
   - Điền đủ `images[]`
3. **Thêm entry** vào `src/data/productDetails.js` với key = slug
4. **Kiểm tra** trang `/san-pham` và `/san-pham/{slug}` trên browser
5. Nếu cần thêm tag `ban-chay` → sản phẩm xuất hiện trên section "Sản phẩm nổi bật" ở HomePage

### 11.2 Thêm trang mới

1. Tạo file `src/pages/TenTrangPage.jsx`
2. Thêm route vào `src/App.jsx`:
   ```jsx
   <Route path="/duong-dan" element={<TenTrangPage />} />
   ```
3. Thêm link vào `NAV_LINKS` trong `Navbar.jsx` nếu cần hiển thị trên nav
4. ScrollToTop tự động hoạt động với route mới (đã có `ScrollToTop` trong App.jsx)

### 11.3 Cập nhật thông tin liên hệ

Tìm và sửa trong các file sau:
- `src/components/layout/Navbar.jsx` (nút CTA mobile)
- `src/components/layout/Footer.jsx` (cột liên hệ)
- `src/components/layout/FloatingContactButton.jsx` (số điện thoại + Zalo link)
- `src/pages/ContactPage.jsx` (4 contact card)

### 11.4 Thêm danh mục sản phẩm mới

1. Thêm entry vào `src/data/categories.json`: `{ "id": "ten-danh-muc", "name": "Tên Danh Mục", "icon": "Leaf" }`
2. Cập nhật `CATEGORY_VISUALS` trong `HomePage.jsx` (Unsplash photo ID cho danh mục mới)
3. Cập nhật `PRODUCTS_CAT` trong `AboutPage.jsx` nếu muốn hiển thị ở trang Giới thiệu
4. Gán `category: "ten-danh-muc"` cho các sản phẩm thuộc danh mục này trong `products.json`

### 11.5 Thay đổi màu sắc / brand

Chỉ sửa trong `tailwind.config.js` → tất cả component tự động áp dụng màu mới.

---

## 12. NGUỒN ẢNH SẢN PHẨM GỐC

```
D:\Work Mericy\Hình ảnh\Phân bón\Hình ảnh sản phẩm\
  Magie Bo Kẽm\        → magie-bo-kem-no1      (8 ảnh, ảnh chính.png = img-1)
  pH Balance\          → ph-balance-humate-79  (7 ảnh, card dùng img-7)
  Ra rễ - nở bụi\     → ra-re-no-bui          (7 ảnh)
  Vô Gạo Nhanh\       → vo-gao-nhanh          (7 ảnh, card dùng img-5)
  Lùn Cây - Rước Đòng\ → lun-cay-ruoc-dong    (7 ảnh, card dùng img-5)
  Loang trãi\          → loang-trai-tham-sau   (5 ảnh, card dùng img-3)
```

---

*Tài liệu này phản ánh trạng thái website tại 2026-07-06 sau khi hoàn thiện toàn bộ (Session 1–5).*
*Xem PROGRESS.md để theo dõi lịch sử thay đổi theo từng session.*
