'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Flower2, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

const rooms = [
  { id: 'living-room', name: 'Living', icon: Home, href: '/living-room' },
  { id: 'garden', name: 'Garden', icon: Flower2, href: '/garden' },
  { id: 'balcony', name: 'Balcony', icon: Sun, href: '/balcony' },
  { id: 'bedroom', name: 'Bedroom', icon: Moon, href: '/bedroom' },
]

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentRoom = pathname?.split('/')[1] || 'living-room'

  return (
    <div className="min-h-screen bg-cozy-cream flex flex-col">
      {/* Main content area */}
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-cozy-beige safe-area-pb">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
          {rooms.map((room) => {
            const isActive = currentRoom === room.id
            const Icon = room.icon

            return (
              <Link
                key={room.id}
                href={room.href}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all',
                  'hover:bg-cozy-beige/30',
                  isActive && 'bg-cozy-sage/30'
                )}
              >
                <Icon
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isActive ? 'text-cozy-green' : 'text-cozy-brown/60'
                  )}
                />
                <span
                  className={cn(
                    'text-xs mt-1 font-medium transition-colors',
                    isActive ? 'text-cozy-green' : 'text-cozy-brown/60'
                  )}
                >
                  {room.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
