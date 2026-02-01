'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Camera, BookOpen, Heart, Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Activity hotspots in the living room
const activities = [
  {
    id: 'chat',
    name: 'Chat Corner',
    icon: MessageCircle,
    description: 'Send sweet messages',
    position: { top: '45%', left: '20%' },
    color: 'bg-cozy-lavender',
    href: '/moments/together',
  },
  {
    id: 'photos',
    name: 'Memory Wall',
    icon: Camera,
    description: 'View shared photos',
    position: { top: '30%', left: '60%' },
    color: 'bg-cozy-sky',
    href: '/vault',
  },
  {
    id: 'journal',
    name: 'Shared Journal',
    icon: BookOpen,
    description: 'Write together',
    position: { top: '55%', left: '75%' },
    color: 'bg-cozy-sage',
    href: '/moments/journal',
  },
]

// Decorative elements for the room
const decorations = [
  { emoji: '🪴', position: { bottom: '20%', left: '10%' }, size: 'text-4xl' },
  { emoji: '🛋️', position: { bottom: '15%', left: '35%' }, size: 'text-6xl' },
  { emoji: '🖼️', position: { top: '25%', left: '15%' }, size: 'text-3xl' },
  { emoji: '📚', position: { bottom: '25%', right: '15%' }, size: 'text-3xl' },
  { emoji: '🕯️', position: { top: '40%', right: '25%' }, size: 'text-2xl' },
  { emoji: '🧸', position: { bottom: '18%', right: '30%' }, size: 'text-3xl' },
]

export default function LivingRoomPage() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)]">
      {/* Room background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cozy-cream via-cozy-beige/30 to-cozy-beige" />

      {/* Window with sky */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-32 rounded-t-full bg-cozy-sky/50 border-4 border-cozy-brown/20">
        <div className="absolute top-4 left-6 text-2xl animate-float">☁️</div>
        <div className="absolute top-8 right-8 text-xl animate-float" style={{ animationDelay: '1s' }}>☁️</div>
      </div>

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-cozy-brown/20 to-transparent" />

      {/* Decorative elements */}
      {decorations.map((deco, idx) => (
        <motion.div
          key={idx}
          className={cn('absolute', deco.size)}
          style={deco.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1, type: 'spring' }}
        >
          {deco.emoji}
        </motion.div>
      ))}

      {/* Activity hotspots */}
      {activities.map((activity) => {
        const Icon = activity.icon
        const isSelected = selectedActivity === activity.id

        return (
          <motion.div
            key={activity.id}
            className="absolute z-10"
            style={activity.position}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <Link href={activity.href}>
              <motion.button
                className={cn(
                  'relative p-4 rounded-2xl shadow-lg',
                  activity.color,
                  'hover:scale-110 transition-transform',
                  'focus:outline-none focus:ring-2 focus:ring-cozy-green focus:ring-offset-2'
                )}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setSelectedActivity(activity.id)}
                onHoverEnd={() => setSelectedActivity(null)}
              >
                <Icon className="w-6 h-6 text-cozy-brown" />

                {/* Pulse indicator */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-cozy-green rounded-full animate-pulse" />

                {/* Tooltip */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-white rounded-xl shadow-md whitespace-nowrap"
                    >
                      <p className="text-sm font-medium text-cozy-brown">{activity.name}</p>
                      <p className="text-xs text-cozy-brown/60">{activity.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>
          </motion.div>
        )
      })}

      {/* Partner presence indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
          <span className="w-2 h-2 bg-cozy-green rounded-full animate-pulse" />
          <span className="text-sm text-cozy-brown">Partner is nearby</span>
          <Heart className="w-4 h-4 text-cozy-rose fill-cozy-rose" />
        </div>
      </motion.div>

      {/* Welcome message (first time) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20"
            onClick={() => setShowWelcome(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🏠
                </motion.div>
                <h2 className="text-2xl font-bold text-cozy-brown font-hand mb-2">
                  Welcome to your Living Room
                </h2>
                <p className="text-cozy-brown/70 mb-6">
                  This is your cozy shared space. Tap the icons to explore activities together!
                </p>
                <div className="flex items-center justify-center gap-2 text-cozy-brown/60 text-sm mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Explore all 4 rooms using the tabs below</span>
                </div>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="px-6 py-3 bg-cozy-green text-white rounded-full font-medium hover:bg-cozy-green/90 transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
