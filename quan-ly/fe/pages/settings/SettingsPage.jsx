import { useEffect, useState } from 'react'
import { CreditCard, Warehouse, UserCircle, Users } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import PaymentTab from './tabs/PaymentTab'
import WarehouseTab from './tabs/WarehouseTab'
import AccountTab from './tabs/AccountTab'
import UserManagementTab from './tabs/UserManagementTab'
import { useAdminAuth } from '../../context/AdminAuthContext'

const ALL_TABS = [
  { id: 'tai-khoan', label: 'Tài khoản', icon: UserCircle, Component: AccountTab, adminOnly: false },
  { id: 'kho-van', label: 'Kho vận', icon: Warehouse, Component: WarehouseTab, adminOnly: false },
  { id: 'nguoi-dung', label: 'Quản lý người dùng', icon: Users, Component: UserManagementTab, adminOnly: true },
  { id: 'thanh-toan', label: 'Thanh toán', icon: CreditCard, Component: PaymentTab, adminOnly: false },
]

export default function SettingsPage() {
  const { isAdmin } = useAdminAuth()
  const tabs = ALL_TABS.filter((t) => !t.adminOnly || isAdmin)
  const [tab, setTab] = useState(tabs[0].id)

  // Nếu vai trò xác định muộn hơn (VD vừa tải xong hồ sơ) và tab đang chọn không còn
  // trong danh sách được phép (VD user lỡ đang ở tab "nguoi-dung"), chuyển về tab đầu.
  useEffect(() => {
    if (!tabs.some((t) => t.id === tab)) setTab(tabs[0].id)
  }, [isAdmin]) // eslint-disable-line react-hooks/exhaustive-deps

  const Active = tabs.find((t) => t.id === tab)?.Component

  return (
    <div>
      <PageHeader title="Cài đặt" />

      <div className="flex gap-2 overflow-x-auto border-b border-soft pb-px">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.id ? 'border-b-2 border-primary text-primary' : 'text-secondary hover:text-primary'
            }`}
          >
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="pt-5">
        <Active />
      </div>
    </div>
  )
}
