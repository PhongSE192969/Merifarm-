export function formatPrice(value) {
  if (value === null || value === undefined) return 'Liên hệ báo giá'
  return value.toLocaleString('vi-VN') + 'đ'
}
