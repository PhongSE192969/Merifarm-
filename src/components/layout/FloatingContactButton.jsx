import { Phone } from 'lucide-react'

export default function FloatingContactButton() {
  return (
    <div
      className="fixed right-3 z-40 flex flex-col items-center gap-2.5 md:right-6 md:gap-3"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 80px)' }}
    >
      <a
        href="https://m.me/phanbonmerifarm"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white p-2.5 shadow-md animate-contact-float md:h-14 md:w-14 md:p-3"
        aria-label="Nhắn tin Messenger với Merifarm"
      >
        <span className="absolute inset-0 rounded-full bg-[#0866FF] opacity-40 animate-[ping_2.4s_ease-in-out_infinite]" />
        <img src="/icons/messenger.svg" alt="" className="relative h-full w-full" />
      </a>
      <a
        href="https://zalo.me/0981798065"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white p-2.5 shadow-md animate-contact-float md:h-14 md:w-14 md:p-3"
        aria-label="Chat Zalo với Merifarm"
      >
        <span className="absolute inset-0 rounded-full bg-[#0068FF] opacity-40 animate-[ping_2.4s_ease-in-out_infinite]" />
        <img src="/icons/zalo.svg" alt="" className="relative h-full w-full" />
      </a>
      <a
        href="tel:0981798065"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg animate-contact-float md:h-14 md:w-14"
        aria-label="Gọi Hotline Merifarm"
      >
        <span className="absolute inset-0 rounded-full bg-primary opacity-60 animate-[ping_2.4s_ease-in-out_infinite]" />
        <Phone size={20} className="relative" />
      </a>
    </div>
  )
}
