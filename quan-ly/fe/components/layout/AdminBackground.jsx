// Nền "kính & nước" phía sau toàn bộ khu quản lý: các khối màu mờ, trôi nhẹ,
// tạo chiều sâu cho các khối kính (backdrop-blur) nổi lên phía trên.
export default function AdminBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F3F8F4]">
      <div className="absolute -left-24 -top-32 h-[420px] w-[420px] animate-admin-blob-1 rounded-full bg-primary/25 blur-[110px]" />
      <div className="absolute -right-32 top-1/4 h-[380px] w-[380px] animate-admin-blob-2 rounded-full bg-accent/25 blur-[110px]" />
      <div className="absolute bottom-[-160px] left-1/3 h-[440px] w-[440px] animate-admin-blob-3 rounded-full bg-soft-green blur-[110px]" />
    </div>
  )
}
