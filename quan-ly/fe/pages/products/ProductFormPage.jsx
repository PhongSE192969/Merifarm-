import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import ArrayEditor from '../../components/common/ArrayEditor'
import ObjectArrayEditor from '../../components/common/ObjectArrayEditor'
import ChipMultiSelect from '../../components/common/ChipMultiSelect'
import CollapsibleSection from '../../components/common/CollapsibleSection'
import ImageManager from '../../components/products/ImageManager'
import IconTextListEditor from '../../components/products/IconTextListEditor'
import { getProduct, createProduct, updateProduct } from '../../../../src/services/productsService'
import { useAdminAuth } from '../../context/AdminAuthContext'
import categories from '../../../../src/data/categories.json'
import cropTypes from '../../../../src/data/cropTypes.json'
import usageNeeds from '../../../../src/data/usageNeeds.json'
import productForms from '../../../../src/data/productForms.json'

const EMPTY_PRODUCT = {
  slug: '', name: '', sku: '', category: categories[0]?.id || '', cropTypes: [], packageUnit: '', form: productForms[0]?.id || '',
  price: '', originalPrice: '', image: '', images: [], shortDescription: '', ingredients: '', usageInstructions: '',
  usageNeeds: [], tags: [], inStock: true,
  overview: '', ingredientItems: [], ingredientNote: '', benefitItems: [], usageSteps: [], dosageTable: [],
  storageItems: [], warningNote: '', quickInfo: { thanhPhan: '', xuatXu: 'Việt Nam', quyCach: '', dang: '', congDung: '', baoQuan: '' },
  benefits: [], suitableWhen: [],
  specification: {
    nhomSanPham: '', quyCach: '', dangSanPham: '', xuatXu: 'Việt Nam',
    toChuc: 'Công ty TNHH Công nghệ DVP-Deditech', diaChiToChuc: '',
  },
  shipping: {
    weightValue: '', weightUnit: 'g', height: '', width: '', length: '',
    deliveryMode: 'default', deliveryOption: '', codEnabled: true,
  },
}

const DELIVERY_OPTIONS = ['Giao hàng nhanh 24h', 'Hàng cồng kềnh', 'Giao nhanh tiêu chuẩn', 'Hỏa tốc']

const TABS = [
  { id: 'basic', label: 'Cơ bản' },
  { id: 'pricing', label: 'Giá & khuyến mãi' },
  { id: 'specs', label: 'Chi tiết kỹ thuật' },
]

// input type="number" ở Chrome hiển thị số có dấu chấm phân cách hàng nghìn theo locale
// vi-VN, dễ gây hiểu lầm là lỗi/không gõ được. Dùng text + lọc ký tự để kiểm soát hiển thị.
function sanitizeNumber(value) {
  const cleaned = value.replace(/[^\d.]/g, '')
  const firstDot = cleaned.indexOf('.')
  if (firstDot === -1) return cleaned
  return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '')
}

function slugify(text) {
  return text
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

export default function ProductFormPage() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const { user } = useAdminAuth()
  const [product, setProduct] = useState(EMPTY_PRODUCT)
  const [tab, setTab] = useState('basic')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [showOptional, setShowOptional] = useState(!isNew)

  useEffect(() => {
    if (isNew) return
    getProduct(id).then((p) => {
      if (p) {
        setProduct({
          ...EMPTY_PRODUCT, ...p,
          specification: { ...EMPTY_PRODUCT.specification, ...p.specification },
          shipping: { ...EMPTY_PRODUCT.shipping, ...p.shipping },
        })
      }
      setLoading(false)
    })
  }, [id, isNew])

  function set(patch) {
    setProduct((p) => ({ ...p, ...patch }))
  }

  function setQuickInfo(patch) {
    setProduct((p) => ({ ...p, quickInfo: { ...p.quickInfo, ...patch } }))
  }

  function setSpecification(patch) {
    setProduct((p) => ({ ...p, specification: { ...p.specification, ...patch } }))
  }

  function setShipping(patch) {
    setProduct((p) => ({ ...p, shipping: { ...p.shipping, ...patch } }))
  }

  function selectDeliveryOption(opt) {
    setShipping({ deliveryOption: product.shipping.deliveryOption === opt ? '' : opt })
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    if (!product.name.trim() || !product.slug.trim()) {
      setError('Vui lòng nhập tên sản phẩm và đường dẫn (slug).')
      setTab('basic')
      return
    }
    setSaving(true)
    const payload = {
      ...product,
      price: product.price === '' ? null : Number(product.price),
      originalPrice: product.originalPrice === '' ? null : Number(product.originalPrice),
    }
    try {
      if (isNew) {
        const created = await createProduct(payload, user?.email)
        navigate(`/quan-ly/san-pham/${created.id}`, { replace: true })
      } else {
        await updateProduct(id, payload, user?.email)
      }
    } catch {
      setError('Không thể lưu sản phẩm, vui lòng thử lại.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-faint">Đang tải...</p>

  const inputCls = 'w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary'

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/quan-ly/san-pham')}
        className="mb-3 flex items-center gap-1.5 text-sm text-secondary hover:text-primary"
      >
        <ArrowLeft size={15} /> Quay lại danh sách
      </button>
      <PageHeader title={isNew ? 'Thêm sản phẩm mới' : `Sửa: ${product.name}`} />

      <form onSubmit={handleSave}>
        <div className="mb-4 flex gap-1 overflow-x-auto border-b border-soft">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id ? 'border-b-2 border-primary text-primary' : 'text-secondary hover:text-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="admin-glass rounded-2xl p-5">
          {tab === 'basic' && (
            <div className="space-y-6">
              <ImageManager
                image={product.image}
                images={product.images}
                onChangeCover={(url) => set({ image: url })}
                onChangeGallery={(imgs) => set({ images: imgs })}
              />

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <span className="text-red-500">*</span> Tên sản phẩm <HelpCircle size={13} className="text-faint" />
                </label>
                <div className="relative">
                  <input
                    value={product.name}
                    maxLength={255}
                    onChange={(e) => {
                      const name = e.target.value
                      set({ name, ...(slugTouched ? {} : { slug: slugify(name) }) })
                    }}
                    className={inputCls + ' pr-14'}
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-faint">
                    {product.name.length}/255
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  SKU <HelpCircle size={13} className="text-faint" />
                </label>
                <input
                  value={product.sku}
                  onChange={(e) => set({ sku: e.target.value })}
                  placeholder="Mã quản lý nội bộ, VD: BUMPER-1L"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <span className="text-red-500">*</span> Hạng mục <HelpCircle size={13} className="text-faint" />
                </label>
                <select value={product.category} onChange={(e) => set({ category: e.target.value })} className={inputCls}>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <span className="text-red-500">*</span> Thương hiệu <HelpCircle size={13} className="text-faint" />
                </label>
                <div className={inputCls + ' bg-[#F8F5F0] text-secondary'}>Merifarm</div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Thuộc tính <HelpCircle size={13} className="text-faint" />
                </p>
                <div className="rounded-xl border border-soft bg-[#FAFAF8] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-faint">Bắt buộc</p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink">
                        <span className="text-red-500">*</span> Quốc gia xuất xứ
                      </label>
                      <input value={product.specification.xuatXu || ''} onChange={(e) => setSpecification({ xuatXu: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink">
                        <span className="text-red-500">*</span> Tên tổ chức chịu trách nhiệm hàng hóa
                      </label>
                      <input value={product.specification.toChuc || ''} onChange={(e) => setSpecification({ toChuc: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink">
                        <span className="text-red-500">*</span> Địa chỉ tổ chức chịu trách nhiệm hàng hóa
                      </label>
                      <input value={product.specification.diaChiToChuc || ''} onChange={(e) => setSpecification({ diaChiToChuc: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-soft pt-5">
                <p className="mb-3 text-sm font-semibold text-ink">Vận chuyển</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
                      <span className="text-red-500">*</span> Trọng lượng kiện hàng <HelpCircle size={13} className="text-faint" />
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <select
                        value={product.shipping.weightUnit}
                        onChange={(e) => setShipping({ weightUnit: e.target.value })}
                        style={{ width: 130, flexShrink: 0 }}
                        className={inputCls}
                      >
                        <option value="g">Gam (g)</option>
                        <option value="kg">Kilôgam (kg)</option>
                      </select>
                      <input
                        type="text" inputMode="decimal" value={product.shipping.weightValue}
                        onChange={(e) => setShipping({ weightValue: sanitizeNumber(e.target.value) })}
                        placeholder="Nhập trọng lượng"
                        style={{ flex: '1 1 auto', minWidth: 0 }}
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
                    Kích thước kiện hàng (cm) <HelpCircle size={13} className="text-faint" />
                  </label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <input type="text" inputMode="decimal" value={product.shipping.height} onChange={(e) => setShipping({ height: sanitizeNumber(e.target.value) })} placeholder="Chiều cao" className={inputCls} />
                    <input type="text" inputMode="decimal" value={product.shipping.width} onChange={(e) => setShipping({ width: sanitizeNumber(e.target.value) })} placeholder="Chiều rộng" className={inputCls} />
                    <input type="text" inputMode="decimal" value={product.shipping.length} onChange={(e) => setShipping({ length: sanitizeNumber(e.target.value) })} placeholder="Chiều dài" className={inputCls} />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
                    <span className="text-red-500">*</span> Cách giao hàng <HelpCircle size={13} className="text-faint" />
                  </label>
                  <div className="flex items-center gap-6">
                    {[['default', 'Mặc định'], ['custom', 'Tùy chỉnh']].map(([val, label]) => (
                      <label key={val} className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio" className="sr-only"
                          checked={product.shipping.deliveryMode === val}
                          onChange={() => setShipping({ deliveryMode: val })}
                        />
                        <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-colors ${
                          product.shipping.deliveryMode === val ? 'border-primary' : 'border-soft'
                        }`}>
                          {product.shipping.deliveryMode === val && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </span>
                        <span className="text-sm text-ink">{label}</span>
                      </label>
                    ))}
                  </div>

                  {product.shipping.deliveryMode === 'custom' && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {DELIVERY_OPTIONS.map((opt) => {
                        const checked = product.shipping.deliveryOption === opt
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => selectDeliveryOption(opt)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                              checked ? 'border-primary bg-soft-green text-primary-dark' : 'border-soft text-secondary hover:border-primary/50'
                            }`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  <p className="mt-2 text-xs text-faint">
                    Cân nặng/kích thước dùng để tham khảo khi đóng gói. Phí vận chuyển hiển thị cho khách vẫn theo mức tạm tính chung ở giỏ hàng, chưa tính riêng theo từng sản phẩm.
                  </p>
                </div>

                <label className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-ink">Cho phép thanh toán khi giao hàng (COD)</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={product.shipping.codEnabled}
                    onClick={() => setShipping({ codEnabled: !product.shipping.codEnabled })}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${product.shipping.codEnabled ? 'bg-primary' : 'bg-soft'}`}
                  >
                    <span
                      className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                      style={{ transform: product.shipping.codEnabled ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowOptional((o) => !o)}
                className="mx-auto flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                {showOptional ? 'Ẩn thuộc tính không bắt buộc' : 'Hiện thuộc tính không bắt buộc'}
                <ChevronDown size={15} className={`transition-transform duration-200 ${showOptional ? 'rotate-180' : ''}`} />
              </button>

              {showOptional && (
                <div className="space-y-4 border-t border-soft pt-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Đường dẫn (slug) *</label>
                    <input
                      value={product.slug}
                      onChange={(e) => { setSlugTouched(true); set({ slug: slugify(e.target.value) }) }}
                      className={inputCls}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Dạng sản phẩm</label>
                      <select value={product.form} onChange={(e) => set({ form: e.target.value })} className={inputCls}>
                        {productForms.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Quy cách đóng gói</label>
                      <input value={product.packageUnit} onChange={(e) => set({ packageUnit: e.target.value })} placeholder="VD: Bao 25kg" className={inputCls} />
                    </div>
                  </div>

                  <ChipMultiSelect label="Loại cây trồng phù hợp" options={cropTypes} values={product.cropTypes} onChange={(v) => set({ cropTypes: v })} />
                  <ChipMultiSelect label="Nhu cầu sử dụng" options={usageNeeds} values={product.usageNeeds} onChange={(v) => set({ usageNeeds: v })} />

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Mô tả ngắn</label>
                    <textarea rows={2} value={product.shortDescription} onChange={(e) => set({ shortDescription: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Thành phần (dòng tóm tắt)</label>
                    <textarea rows={2} value={product.ingredients} onChange={(e) => set({ ingredients: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Hướng dẫn sử dụng (dòng tóm tắt)</label>
                    <textarea rows={2} value={product.usageInstructions} onChange={(e) => set({ usageInstructions: e.target.value })} className={inputCls} />
                  </div>

                  <label className="flex items-center gap-2.5">
                    <input type="checkbox" checked={product.inStock} onChange={(e) => set({ inStock: e.target.checked })} className="h-4 w-4" />
                    <span className="text-sm font-medium text-ink">Còn hàng</span>
                  </label>
                </div>
              )}
            </div>
          )}

          {tab === 'pricing' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Giá bán (đ)</label>
                <input type="number" value={product.price} onChange={(e) => set({ price: e.target.value })} className={inputCls} placeholder="Để trống nếu 'Liên hệ báo giá'" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Giá gốc (nếu đang giảm giá)</label>
                <input type="number" value={product.originalPrice} onChange={(e) => set({ originalPrice: e.target.value })} className={inputCls} placeholder="Để trống nếu không giảm giá" />
              </div>
              <p className="sm:col-span-2 text-xs text-faint">
                Nếu "Giá gốc" lớn hơn "Giá bán", trang sản phẩm sẽ tự hiện giá gạch ngang và % giảm giá.
              </p>
            </div>
          )}

          {tab === 'specs' && (
            <div className="space-y-3">
              <p className="mb-1 text-xs text-faint">
                Mỗi khối bên dưới ứng với đúng 1 mục khách sẽ thấy ở trang chi tiết sản phẩm — bấm để mở/thu gọn.
              </p>

              <CollapsibleSection title="Tổng quan" hint={'Hiện ở tab "Tổng quan"'} defaultOpen={!isNew}>
                <textarea
                  rows={4} value={product.overview} onChange={(e) => set({ overview: e.target.value })}
                  className={inputCls} placeholder="Mô tả chi tiết sản phẩm. Có thể xuống dòng để tách thành nhiều đoạn."
                />
              </CollapsibleSection>

              <CollapsibleSection title="Thành phần" hint={'Hiện ở tab "Thành phần"'} count={product.ingredientItems.length} defaultOpen={!isNew}>
                <ObjectArrayEditor
                  label="Bảng thành phần"
                  values={product.ingredientItems}
                  onChange={(v) => set({ ingredientItems: v })}
                  fields={[{ key: 'label', placeholder: 'Tên thành phần, VD: Đạm (N)' }, { key: 'value', placeholder: 'Hàm lượng, VD: 15%' }]}
                  emptyItem={{ label: '', value: '' }}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Ghi chú thêm (tùy chọn)</label>
                  <input value={product.ingredientNote} onChange={(e) => set({ ingredientNote: e.target.value })} placeholder="VD: Theo công bố trên bao bì sản phẩm" className={inputCls} />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Công dụng" hint={'Hiện ở tab "Công dụng", mỗi dòng là 1 gạch đầu dòng'} count={product.benefitItems.length} defaultOpen={!isNew}>
                <ArrayEditor values={product.benefitItems} onChange={(v) => set({ benefitItems: v })} placeholder="VD: Kích thích ra rễ mạnh" />
              </CollapsibleSection>

              <CollapsibleSection title="Cách sử dụng & liều lượng" hint={'Hiện ở tab "Cách sử dụng"'} count={product.usageSteps.length + product.dosageTable.length} defaultOpen={!isNew}>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-ink">Các bước sử dụng (theo thứ tự)</p>
                  <ArrayEditor values={product.usageSteps} onChange={(v) => set({ usageSteps: v })} placeholder="VD: Pha 20g với 8 lít nước" />
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-ink">Bảng liều lượng theo loại cây</p>
                  <ObjectArrayEditor
                    values={product.dosageTable}
                    onChange={(v) => set({ dosageTable: v })}
                    fields={[{ key: 'crop', placeholder: 'Loại cây / giai đoạn' }, { key: 'dosage', placeholder: 'Liều lượng' }]}
                    emptyItem={{ crop: '', dosage: '' }}
                  />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Bảo quản & lưu ý" hint={'Hiện ở tab "Bảo quản" và "Lưu ý"'} count={product.storageItems.length} defaultOpen={!isNew}>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-ink">Cách bảo quản</p>
                  <ArrayEditor values={product.storageItems} onChange={(v) => set({ storageItems: v })} placeholder="VD: Để nơi khô ráo, thoáng mát" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Lưu ý khi sử dụng</label>
                  <textarea rows={3} value={product.warningNote} onChange={(e) => set({ warningNote: e.target.value })} className={inputCls} placeholder="Có thể xuống dòng để tách đoạn." />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Thông tin nhanh" hint="6 thẻ nhỏ hiện ngay đầu trang chi tiết sản phẩm" defaultOpen={!isNew}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['thanhPhan', 'Thành phần chính'], ['xuatXu', 'Xuất xứ'], ['quyCach', 'Quy cách'],
                    ['dang', 'Dạng sản phẩm'], ['congDung', 'Công dụng chính'], ['baoQuan', 'Bảo quản'],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs text-faint">{label}</label>
                      <input value={product.quickInfo[key] || ''} onChange={(e) => setQuickInfo({ [key]: e.target.value })} className={inputCls} />
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Lợi ích nổi bật" hint="Hiện thành các thẻ ở giữa trang chi tiết sản phẩm" count={product.benefits.length} defaultOpen={!isNew}>
                <IconTextListEditor
                  values={product.benefits}
                  onChange={(v) => set({ benefits: v })}
                  textKey="text"
                  textLabel="Nội dung ngắn gọn"
                  emptyItem={{ icon: 'Leaf', title: '', text: '' }}
                />
              </CollapsibleSection>

              <CollapsibleSection title="Phù hợp khi cây có dấu hiệu" hint="Gợi ý sản phẩm này dùng khi nào" count={product.suitableWhen.length} defaultOpen={!isNew}>
                <IconTextListEditor
                  values={product.suitableWhen}
                  onChange={(v) => set({ suitableWhen: v })}
                  textKey="desc"
                  textLabel="Mô tả ngắn gọn"
                  emptyItem={{ icon: 'Leaf', title: '', desc: '' }}
                />
              </CollapsibleSection>

              <CollapsibleSection title="Thông số sản phẩm" hint="Bảng thông tin ở cuối trang chi tiết sản phẩm" defaultOpen={!isNew}>
                <p className="text-xs text-faint">Xuất xứ và đơn vị chịu trách nhiệm đã nhập ở tab "Cơ bản" → Thuộc tính.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['nhomSanPham', 'Nhóm sản phẩm'], ['quyCach', 'Quy cách'],
                    ['dangSanPham', 'Dạng sản phẩm'],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs text-faint">{label}</label>
                      <input value={product.specification[key] || ''} onChange={(e) => setSpecification({ [key]: e.target.value })} className={inputCls} />
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-1.5 text-sm text-red-500">
            <AlertCircle size={14} />{error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/quan-ly/san-pham')} className="rounded-full border border-soft px-5 py-2.5 text-sm font-semibold text-ink hover:bg-[#F8F5F0]">
            Hủy
          </button>
          <button type="submit" disabled={saving} className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60">
            {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  )
}
