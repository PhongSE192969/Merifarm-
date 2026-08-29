import Reveal from '../ui/Reveal'

const STEPS = [
  {
    number: '01',
    label: 'Gửi nhu cầu',
    image: '/process-step1-order.png',
    offset: '',
  },
  {
    number: '02',
    label: 'Nhận tư vấn',
    image: '/process-step2-tuvan.png',
    offset: 'lg:-translate-y-6',
  },
  {
    number: '03',
    label: 'Xác nhận đơn',
    image: '/process-step3-layhang.png',
    offset: '',
  },
  {
    number: '04',
    label: 'Nhận hàng',
    image: '/process-step4-giaohang.png',
    offset: 'lg:-translate-y-6',
  },
]

export default function ProcessSection() {
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="whitespace-nowrap text-3xl font-extrabold leading-tight text-primary-dark md:text-4xl">
            Quy trình tư vấn &amp; mua hàng
          </h2>
          <span className="mt-5 block h-1 w-10 rounded-full bg-accent" />
        </Reveal>

        <div className="mt-16 flex items-center gap-2 overflow-x-auto pb-4 sm:gap-3 lg:justify-center lg:overflow-visible lg:pb-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex shrink-0 items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className="mx-1 hidden h-px w-8 border-t-2 border-dashed border-primary/25 sm:block sm:w-12 lg:w-16"
                />
              )}

              <Reveal delay={i * 100} className={`flex shrink-0 items-center gap-3 sm:gap-4 ${step.offset}`}>
                <div className="shrink-0 text-left">
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-primary-dark sm:text-2xl">
                      {step.number}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="mt-1 whitespace-nowrap text-sm font-semibold text-ink sm:text-base">
                    {step.label}
                  </p>
                </div>

                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-[1.75rem] border border-primary/15 bg-soft-green p-1.5 shadow-soft sm:h-32 sm:w-32 md:h-36 md:w-36">
                  <img
                    src={step.image}
                    alt={step.label}
                    className="h-full w-full rounded-[1.25rem] object-cover"
                  />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
