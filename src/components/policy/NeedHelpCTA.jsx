import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export default function NeedHelpCTA() {
  return (
    <section className="border-t border-soft bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-card border border-soft bg-white shadow-md">
          <div className="border-b border-soft bg-white px-6 py-6 md:px-10">
            <h2 className="text-xl font-bold text-primary-dark md:text-2xl">Bạn cần hỗ trợ thêm?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
              Mọi thắc mắc liên quan đến đặt hàng, thanh toán, giao hàng, đổi trả hoặc bảo mật
              thông tin cá nhân vui lòng liên hệ Merifarm để được hỗ trợ.
            </p>
          </div>
          <div className="p-6 md:p-10">
            <p className="font-semibold text-ink">
              Phân Bón Merifarm – CÔNG TY TRÁCH NHIỆM HỮU HẠN CÔNG NGHỆ DVP-DEDITECH
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-white border border-soft px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <Phone size={15} />
                </span>
                <div>
                  <p className="text-xs text-faint">Hotline</p>
                  <p className="text-sm font-semibold text-ink">
                    <a href="tel:0981798065" className="hover:text-primary">0981 798 065</a>
                    {' - '}
                    <a href="tel:0782861873" className="hover:text-primary">0782 861 873</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white border border-soft px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <Mail size={15} />
                </span>
                <div>
                  <p className="text-xs text-faint">Email</p>
                  <p className="text-sm font-semibold text-ink">contact.merifarm@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white border border-soft px-4 py-3 sm:col-span-2 lg:col-span-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                  <MapPin size={15} />
                </span>
                <div>
                  <p className="text-xs text-faint">Địa chỉ</p>
                  <p className="text-sm font-semibold text-ink">
                    Số 5-7, Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
              >
                <MessageCircle size={15} />
                Liên hệ tư vấn
              </Link>
              <Link
                to="/san-pham"
                className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-soft-green"
              >
                Xem sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
