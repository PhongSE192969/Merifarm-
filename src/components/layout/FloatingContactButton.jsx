import { Phone, MessageCircle } from 'lucide-react'

export default function FloatingContactButton() {
  return (
    <div
      className="fixed right-3 z-40 flex flex-col gap-2.5 md:right-6 md:gap-3"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 80px)' }}
    >
      <a
        href="https://zalo.me/0981798065"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-dark bg-white text-accent-dark shadow-md transition-transform duration-200 hover:scale-110 hover:bg-accent hover:text-white md:h-14 md:w-14"
        aria-label="Chat Zalo với Merifarm"
      >
        <MessageCircle size={20} />
      </a>
      <a
        href="tel:0981798065"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary shadow-md transition-transform duration-200 hover:scale-110 hover:bg-primary hover:text-white md:h-14 md:w-14"
        aria-label="Gọi Hotline Merifarm"
      >
        <Phone size={20} />
      </a>
    </div>
  )
}
