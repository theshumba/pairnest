'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Heart, Sparkles, Cloud, Wind, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Mood options
const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 border-yellow-300' },
  { emoji: '😌', label: 'Calm', color: 'bg-cozy-sage/30 border-cozy-sage' },
  { emoji: '🥰', label: 'Loved', color: 'bg-cozy-rose/30 border-cozy-rose' },
  { emoji: '😴', label: 'Tired', color: 'bg-cozy-lavender/30 border-cozy-lavender' },
  { emoji: '😔', label: 'Down', color: 'bg-cozy-sky/30 border-cozy-sky' },
  { emoji: '😤', label: 'Stressed', color: 'bg-orange-100 border-orange-300' },
]

// Energy levels
const energyLevels = [
  { value: 1, label: 'Very Low', emoji: '🔋' },
  { value: 2, label: 'Low', emoji: '🪫' },
  { value: 3, label: 'Medium', emoji: '⚡' },
  { value: 4, label: 'High', emoji: '💪' },
  { value: 5, label: 'Full', emoji: '✨' },
]

// Quick actions for bedroom
const quickActions = [
  {
    id: 'journal',
    name: 'Private Journal',
    emoji: '📓',
    description: 'Write your thoughts',
    href: '/moments/journal',
  },
  {
    id: 'thought',
    name: 'Send a Thought',
    emoji: '💭',
    description: 'Share something sweet',
    href: '/moments/thought',
  },
]

export default function BedroomPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [checkInComplete, setCheckInComplete] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(true)

  const handleCheckIn = () => {
    if (selectedMood && selectedEnergy) {
      // TODO: Save to API
      setCheckInComplete(true)
      setTimeout(() => {
        setShowCheckIn(false)
      }, 2000)
    }
  }

  const partnerMood = { emoji: '😊', label: 'Happy', checkedInAt: '2 hours ago' } // Demo data

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)]">
      {/* Night sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-cozy-lavender/20 to-cozy-cream" />

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 30}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute top-8 right-8 text-5xl"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        🌙
      </motion.div>

      {/* Bed illustration */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3">
        {/* Bed frame */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-24 bg-cozy-brown/60 rounded-t-2xl" />
        {/* Pillows */}
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-20 h-12 bg-cozy-cream rounded-xl shadow-md" />
          <div className="w-20 h-12 bg-cozy-rose/30 rounded-xl shadow-md" />
        </div>
        {/* Blanket */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-20 bg-gradient-to-b from-cozy-lavender/60 to-cozy-lavender/40 rounded-b-xl" />
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cozy-brown/30 to-transparent" />
      </div>

      {/* Lamp */}
      <motion.div
        className="absolute bottom-48 left-8 text-3xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        🪔
      </motion.div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4">
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-cozy-brown font-hand flex items-center gap-2">
                <Moon className="w-5 h-5 text-cozy-lavender" />
                Bedroom
              </h1>
              <p className="text-sm text-cozy-brown/60">
                A quiet space to reflect
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Partner's mood */}
      <motion.div
        className="absolute top-28 left-4 right-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{partnerMood.emoji}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-cozy-brown">
                Partner is feeling <span className="text-cozy-green">{partnerMood.label}</span>
              </p>
              <p className="text-xs text-cozy-brown/60">{partnerMood.checkedInAt}</p>
            </div>
            <Heart className="w-5 h-5 text-cozy-rose fill-cozy-rose" />
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="absolute top-48 left-4 right-4">
        <div className="flex gap-3">
          {quickActions.map((action, idx) => (
            <motion.div
              key={action.id}
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Link href={action.href}>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:bg-white/90 transition-colors">
                  <div className="text-2xl mb-2">{action.emoji}</div>
                  <p className="text-sm font-medium text-cozy-brown">{action.name}</p>
                  <p className="text-xs text-cozy-brown/60">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mood check-in modal */}
      <AnimatePresence>
        {showCheckIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-end justify-center z-20"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-t-3xl p-6 max-w-md w-full shadow-xl max-h-[80vh] overflow-y-auto"
            >
              {!checkInComplete ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-cozy-brown">
                      How are you feeling?
                    </h3>
                    <button
                      onClick={() => setShowCheckIn(false)}
                      className="text-cozy-brown/60 text-sm"
                    >
                      Skip
                    </button>
                  </div>

                  {/* Mood selection */}
                  <div className="mb-6">
                    <p className="text-sm text-cozy-brown/70 mb-3">Select your mood</p>
                    <div className="grid grid-cols-3 gap-3">
                      {moods.map((mood) => (
                        <button
                          key={mood.label}
                          onClick={() => setSelectedMood(mood.label)}
                          className={cn(
                            'p-4 rounded-2xl border-2 transition-all',
                            selectedMood === mood.label
                              ? mood.color + ' scale-105'
                              : 'border-cozy-beige bg-cozy-cream/30 hover:border-cozy-brown/30'
                          )}
                        >
                          <div className="text-3xl mb-1">{mood.emoji}</div>
                          <div className="text-xs text-cozy-brown">{mood.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Energy level */}
                  <div className="mb-6">
                    <p className="text-sm text-cozy-brown/70 mb-3">Energy level</p>
                    <div className="flex gap-2">
                      {energyLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setSelectedEnergy(level.value)}
                          className={cn(
                            'flex-1 py-3 rounded-xl border-2 transition-all',
                            selectedEnergy === level.value
                              ? 'border-cozy-green bg-cozy-sage/30'
                              : 'border-cozy-beige hover:border-cozy-brown/30'
                          )}
                        >
                          <div className="text-xl">{level.emoji}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional note */}
                  <div className="mb-6">
                    <p className="text-sm text-cozy-brown/70 mb-3">Add a note (optional)</p>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Anything on your mind?"
                      className="w-full p-3 rounded-xl border-2 border-cozy-beige focus:border-cozy-green focus:outline-none resize-none h-20 bg-cozy-cream/30"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    onClick={handleCheckIn}
                    disabled={!selectedMood || !selectedEnergy}
                    className={cn(
                      'w-full py-4 rounded-full font-medium transition-colors',
                      selectedMood && selectedEnergy
                        ? 'bg-cozy-green text-white hover:bg-cozy-green/90'
                        : 'bg-cozy-beige text-cozy-brown/50'
                    )}
                  >
                    Check In
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    className="w-16 h-16 bg-cozy-green rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Check className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-cozy-brown mb-2">
                    Check-in complete!
                  </h3>
                  <p className="text-cozy-brown/70">
                    Your partner will see how you're feeling
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating check-in button when modal is closed */}
      <AnimatePresence>
        {!showCheckIn && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => {
              setCheckInComplete(false)
              setShowCheckIn(true)
            }}
            className="absolute bottom-28 right-4 p-4 bg-cozy-lavender rounded-full shadow-lg"
          >
            <Cloud className="w-6 h-6 text-cozy-brown" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
