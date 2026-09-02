import { Routes, Route } from 'react-router-dom'
import { AdminAuthProvider } from '../context/AdminAuthContext'
import RequireAdminAuth from './RequireAdminAuth'
import AdminLayout from '../layouts/AdminLayout'
import AdminAuthLayout from '../layouts/AdminAuthLayout'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import ProductListPage from '../pages/products/ProductListPage'
import ProductFormPage from '../pages/products/ProductFormPage'
import CouponListPage from '../pages/coupons/CouponListPage'
import OrderListPage from '../pages/orders/OrderListPage'
import OrderDetailPage from '../pages/orders/OrderDetailPage'
import SettingsPage from '../pages/settings/SettingsPage'

export default function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route element={<AdminAuthLayout />}>
          <Route path="dang-nhap" element={<LoginPage />} />
        </Route>

        <Route element={<RequireAdminAuth><AdminLayout /></RequireAdminAuth>}>
          <Route index element={<DashboardPage />} />
          <Route path="san-pham" element={<ProductListPage />} />
          <Route path="san-pham/moi" element={<ProductFormPage />} />
          <Route path="san-pham/:id" element={<ProductFormPage />} />
          <Route path="ma-giam-gia" element={<CouponListPage />} />
          <Route path="don-hang" element={<OrderListPage />} />
          <Route path="don-hang/:code" element={<OrderDetailPage />} />
          <Route path="cai-dat" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  )
}
