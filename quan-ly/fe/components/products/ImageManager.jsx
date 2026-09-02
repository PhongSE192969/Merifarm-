import { useState } from 'react'
import { Upload, X, Loader2, Star } from 'lucide-react'
import { uploadImage } from '../../../../src/services/settingsService'

const TILE = 84 // px — kích thước cố định của mỗi ô trong bộ ảnh chi tiết
const GAP = 8
const ROWS = 2
const MAX_GALLERY = 20 // đủ rộng để không chặn các sản phẩm đã có sẵn nhiều ảnh
const ACCEPT = 'image/jpeg,image/jpg,image/png'

// "Ảnh đại diện" (product.image, dùng ở thẻ sản phẩm) và "Bộ ảnh chi tiết"
// (product.images[], thứ tự đúng bằng thứ tự hiển thị ở trang chi tiết sản phẩm)
// là 2 thứ độc lập. TẤT CẢ ảnh trong bộ ảnh chi tiết luôn xếp gọn thành đúng 2
// hàng ngang (chia đôi mảng, không phân trang) — nhiều ảnh thì cả khối cuộn ngang
// chung, không phình cao thêm hàng. Kéo-thả 1 ảnh để đổi thứ tự.
export default function ImageManager({ image, images, onChangeCover, onChangeGallery }) {
  const [uploading, setUploading] = useState(false)
  const [dragIndex, setDragIndex] = useState(null)
  const [error, setError] = useState('')
  const gallery = images || []
  const mainSize = TILE * ROWS + GAP * (ROWS - 1)

  async function handleUpload(e) {
    const room = MAX_GALLERY - gallery.length
    const files = Array.from(e.target.files || []).slice(0, room)
    if (!files.length) return
    setError('')
    setUploading(true)
    try {
      const urls = await Promise.all(files.map((f) => uploadImage(f, 'products')))
      onChangeGallery([...gallery, ...urls])
      if (!image && urls[0]) onChangeCover(urls[0])
    } catch (err) {
      setError(err?.message || 'Không thể tải ảnh lên, vui lòng thử lại.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function removeImage(url) {
    onChangeGallery(gallery.filter((u) => u !== url))
  }

  function handleDrop(targetIndex) {
    if (dragIndex === null || dragIndex === targetIndex) { setDragIndex(null); return }
    const next = [...gallery]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(targetIndex, 0, moved)
    onChangeGallery(next)
    setDragIndex(null)
  }

  // Tất cả ảnh + 1 ô "Tải ảnh lên" ở cuối (ẩn khi đã đủ số lượng tối đa), chia đôi
  // thành 2 hàng liên tục — hàng 1 nhận phần dư nếu tổng số lẻ.
  const cells = gallery.map((url, i) => ({ url, i }))
  if (gallery.length < MAX_GALLERY) cells.push({ upload: true })
  const half = Math.ceil(cells.length / ROWS)
  const rows = [cells.slice(0, half), cells.slice(half)]
  const rowWidth = half * TILE + Math.max(half - 1, 0) * GAP

  function renderCell(cell) {
    if (cell.upload) {
      return (
        <label
          key="upload"
          style={{ width: TILE, height: TILE }}
          className="flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-soft text-faint hover:border-primary hover:text-primary"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          <span className="text-[10px] font-medium">Tải ảnh lên</span>
          <input type="file" accept={ACCEPT} multiple hidden onChange={handleUpload} disabled={uploading} />
        </label>
      )
    }
    return (
      <div
        key={cell.url}
        draggable
        onDragStart={() => setDragIndex(cell.i)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(cell.i)}
        style={{ width: TILE, height: TILE }}
        className={`group relative shrink-0 cursor-grab overflow-hidden rounded-lg border bg-white transition-colors active:cursor-grabbing ${
          dragIndex === cell.i ? 'border-primary opacity-50' : 'border-soft hover:border-primary'
        }`}
      >
        <img src={cell.url} alt="" className="h-full w-full object-contain p-1" draggable={false} />
        <div className="absolute inset-x-0 top-0 flex justify-end gap-1 p-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onChangeCover(cell.url)}
            title="Đặt làm ảnh đại diện"
            style={{ backgroundColor: cell.url === image ? '#D9A441' : '#000000' }}
            className="flex h-5 w-5 items-center justify-center rounded-full text-white shadow"
          >
            <Star size={11} />
          </button>
          <button
            type="button"
            onClick={() => removeImage(cell.url)}
            title="Xóa ảnh"
            style={{ backgroundColor: '#000000' }}
            className="flex h-5 w-5 items-center justify-center rounded-full text-white shadow"
          >
            <X size={11} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-red-500">*</span>
          <label className="text-sm font-semibold text-ink">Hình ảnh</label>
        </div>
        {gallery.length >= MAX_GALLERY ? (
          <span className="text-xs font-medium text-faint">Đã đạt tối đa {MAX_GALLERY} ảnh</span>
        ) : (
          <label
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              uploading
                ? 'cursor-not-allowed border-soft text-faint'
                : 'cursor-pointer border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            Tải ảnh lên
            <input
              type="file" accept={ACCEPT} multiple hidden
              disabled={uploading}
              onChange={handleUpload}
            />
          </label>
        )}
      </div>
      <p className="mb-3 text-xs text-faint">
        Kích thước: 600 × 600 px. Kích thước file tối đa: 10 MB (Tối đa {MAX_GALLERY} file). Định dạng: JPG, JPEG, PNG.
        Kéo-thả để đổi thứ tự hiển thị ở trang chi tiết sản phẩm.
      </p>
      {error && <p className="-mt-1.5 mb-3 text-xs font-medium text-red-500">Lỗi tải ảnh: {error}</p>}

      <div className="flex items-start gap-2">
        {/* Ảnh đại diện — dùng ở thẻ sản phẩm, độc lập với bộ ảnh chi tiết bên phải */}
        <div className="shrink-0">
          <div
            className="relative overflow-hidden rounded-lg border border-soft bg-white"
            style={{ width: mainSize, height: mainSize }}
          >
            {image ? (
              <img src={image} alt="Ảnh đại diện" className="h-full w-full object-contain p-2" />
            ) : (
              <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1.5 text-faint hover:text-primary">
                {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                <span className="text-xs font-medium">Tải ảnh lên</span>
                <input
                  type="file" accept={ACCEPT} hidden disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setError('')
                    setUploading(true)
                    try { onChangeCover(await uploadImage(file, 'products')) }
                    catch (err) { setError(err?.message || 'Không thể tải ảnh lên, vui lòng thử lại.') }
                    finally { setUploading(false); e.target.value = '' }
                  }}
                />
              </label>
            )}
            {image && (
              <span className="absolute inset-x-0 bottom-0 bg-black/55 py-1 text-center text-[11px] font-medium text-white">
                Ảnh đại diện
              </span>
            )}
          </div>
        </div>

        {/* Bộ ảnh chi tiết — luôn đúng 2 hàng ngang, nhiều ảnh thì cả khối cuộn ngang chung */}
        <div className="overflow-x-auto" style={{ height: mainSize }}>
          <div className="flex flex-col justify-between" style={{ width: rowWidth, height: mainSize }}>
            {rows.map((row, i) => (
              <div key={i} className="flex" style={{ gap: GAP }}>
                {row.map(renderCell)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
