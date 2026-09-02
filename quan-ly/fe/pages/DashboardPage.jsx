import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, Wallet, Clock, Package, ChevronRight } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import StatusDonut from '../components/common/StatusDonut'
import { getDashboardStats, listRecentOrders } from '../../../src/services/ordersService'
import { listProducts } from '../../../src/services/productsService'
import { formatPrice } from '../../../src/utils/format'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [productCount, setProductCount] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getDashboardStats(), listProducts(), listRecentOrders(6)])
      .then(([s, products, recentOrders]) => {
        setStats(s)
        setProductCount(products.length)
        setRecent(recentOrders)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <PageHeader title="Tổng quan" description="Số liệu được tính lại theo thời gian thực từ dữ liệu hiện có." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard tone="primary" icon={ClipboardList} label="Tổng số đơn hàng" value={loading ? '—' : stats.totalOrders} />
        <StatCard tone="accent" icon={Wallet} label="Doanh thu tạm tính" value={loading ? '—' : formatPrice(stats.revenue)} hint="Không tính đơn đã hủy" />
        <StatCard tone="rose" icon={Clock} label="Đơn đang chờ xử lý" value={loading ? '—' : stats.pendingCount} />
        <StatCard tone="blue" icon={Package} label="Số sản phẩm hiện có" value={loading ? '—' : productCount} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="admin-glass rounded-2xl p-5">
          <h2 className="mb-4 font-semibold text-ink">Tỉ lệ theo trạng thái</h2>
          {loading ? (
            <p className="text-sm text-faint">Đang tải...</p>
          ) : (
            <StatusDonut byStatus={stats.byStatus} total={stats.totalOrders} />
          )}
        </div>

        <div className="admin-glass rounded-2xl">
          <div className="border-b border-white/70 px-5 py-4">
            <h2 className="font-semibold text-ink">Đơn hàng gần đây</h2>
          </div>
          <div className="divide-y divide-white/60">
            {loading ? (
              <p className="px-5 py-6 text-sm text-faint">Đang tải...</p>
            ) : recent.length === 0 ? (
              <p className="px-5 py-6 text-sm text-faint">Chưa có đơn hàng nào.</p>
            ) : (
              recent.map((order) => (
                <button
                  key={order.code}
                  onClick={() => navigate(`/quan-ly/don-hang/${order.code}`)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-white/60"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{order.code}</p>
                    <p className="text-xs text-faint">{order.form.name} · {order.form.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-primary-dark">{formatPrice(order.total)}</span>
                    <StatusBadge status={order.status} />
                    <ChevronRight size={16} className="text-faint" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
