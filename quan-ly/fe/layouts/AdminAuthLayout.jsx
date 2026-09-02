import { Outlet } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import AdminBackground from '../components/layout/AdminBackground'

export default function AdminAuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AdminBackground />
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">
            <Leaf size={20} className="text-primary" />
          </div>
          <span className="text-lg font-bold text-ink">Merifarm <span className="font-normal text-faint">· Quản lý</span></span>
        </div>
        <div className="admin-glass rounded-3xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
