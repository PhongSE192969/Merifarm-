import { ShieldCheck, Target, HardHat, Truck } from 'lucide-react'
import Reveal from '../ui/Reveal'

const MAIN_IMAGE = '/whyus-farmer.png'
const ROOT_IMAGE =
  'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=500&q=80&auto=format&fit=crop'
const LEAF_IMAGE = '/whyus-leaf.png'

const SIDE_ITEMS = [
  {
    number: '02',
    icon: Target,
    title: 'Giải pháp đúng nhu cầu',
    description:
      'Tư vấn giải pháp dinh dưỡng phù hợp từng loại cây, từng giai đoạn sinh trưởng, tối ưu hiệu quả canh tác.',
  },
  {
    number: '03',
    icon: HardHat,
    title: 'Đồng hành kỹ thuật',
    description:
      'Đội ngũ kỹ sư nông nghiệp luôn sẵn sàng hỗ trợ, tư vấn và đồng hành cùng bà con trong suốt quá trình canh tác.',
  },
  {
    number: '04',
    icon: Truck,
    title: 'Giao hàng thuận tiện',
    description:
      'Hệ thống kho vận tối ưu, giao hàng nhanh chóng, đúng hẹn đến tận nơi trên toàn quốc.',
  },
]

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: heading + card 01 */}
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="text-3xl font-extrabold leading-tight text-primary-dark md:text-4xl">
                Vì sao chọn Merifarm?
              </h2>
              <p className="mt-4 text-secondary">
                Merifarm đồng hành cùng nông dân bằng các giải pháp dinh dưỡng cây trồng hiệu quả, an
                toàn và bền vững.
              </p>
              <span className="mt-5 block h-1 w-10 rounded-full bg-accent" />
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 flex items-start gap-3">
                <span className="pt-1 text-sm font-bold text-faint">01</span>
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-soft-green text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-semibold text-ink">Chất lượng kiểm soát</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                    Sản phẩm chính hãng, nguồn gốc rõ ràng, kiểm soát chặt chẽ từ nguyên liệu đến
                    thành phẩm, đảm bảo hiệu quả và an toàn.
                  </p>
                  <span className="mt-3 block h-0.5 w-8 rounded-full bg-accent" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Middle: image collage */}
          <Reveal delay={120} className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl shadow-softLg">
              <img
                src={MAIN_IMAGE}
                alt="Kỹ sư Merifarm kiểm tra vườn cây"
                className="h-64 w-full object-cover md:h-96"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl shadow-soft">
                <img
                  src={ROOT_IMAGE}
                  alt="Rễ cây khỏe mạnh trong đất"
                  className="h-36 w-full object-cover md:h-44"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-soft">
                <img
                  src={LEAF_IMAGE}
                  alt="Mầm lá xanh tươi còn đọng sương"
                  className="h-36 w-full object-cover md:h-44"
                />
              </div>
            </div>
          </Reveal>

          {/* Right: items 02-04 */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-3">
            {SIDE_ITEMS.map((item, i) => (
              <Reveal key={item.number} delay={160 + i * 80}>
                <div className="flex items-start gap-3">
                  <span className="pt-1 text-sm font-bold text-faint">{item.number}</span>
                  <div>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-soft-green text-primary">
                      <item.icon size={20} />
                    </div>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-secondary">{item.description}</p>
                    <span className="mt-3 block h-0.5 w-8 rounded-full bg-accent" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
