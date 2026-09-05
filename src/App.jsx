import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
// Giỏ hàng / thanh toán tạm thời đóng — bỏ comment 2 route bên dưới (và import
// CartPage, OrderSuccessPage) để mở lại khi cần.
// import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import KnowledgePage from './pages/KnowledgePage'
import HuongDanMuaHangPage from './pages/policy/HuongDanMuaHangPage'
import ChinhSachThanhToanPage from './pages/policy/ChinhSachThanhToanPage'
import ChinhSachGiaoHangPage from './pages/policy/ChinhSachGiaoHangPage'
import ChinhSachDoiTraPage from './pages/policy/ChinhSachDoiTraPage'
import ChinhSachBaoMatPage from './pages/policy/ChinhSachBaoMatPage'
// import OrderSuccessPage from './pages/OrderSuccessPage'
import AdminRoutes from '../quan-ly/fe/routes/AdminRoutes'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/quan-ly/*" element={<AdminRoutes />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/san-pham" element={<ProductsPage />} />
        <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
        <Route path="/kien-thuc-nha-nong" element={<KnowledgePage />} />
        {/* <Route path="/gio-hang" element={<CartPage />} /> */}
        <Route path="/lien-he" element={<ContactPage />} />
        {/* <Route path="/dat-hang-thanh-cong" element={<OrderSuccessPage />} /> */}
        <Route path="/chinh-sach/huong-dan-mua-hang" element={<HuongDanMuaHangPage />} />
        <Route path="/chinh-sach/chinh-sach-thanh-toan" element={<ChinhSachThanhToanPage />} />
        <Route path="/chinh-sach/chinh-sach-giao-hang" element={<ChinhSachGiaoHangPage />} />
        <Route path="/chinh-sach/chinh-sach-doi-tra-hoan-tien" element={<ChinhSachDoiTraPage />} />
        <Route
          path="/chinh-sach/chinh-sach-bao-mat-thong-tin-ca-nhan"
          element={<ChinhSachBaoMatPage />}
        />
      </Route>
    </Routes>
    <Analytics />
    </>
  )
}

export default App
