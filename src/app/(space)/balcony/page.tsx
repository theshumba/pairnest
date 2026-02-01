'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, HelpCircle, Puzzle, Palette, Star, ArrowRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Available games
const games = [
  {
    id: 'would-you-rather',
    name: 'Would You Rather',
    description: 'Fun dilemmas for two',
    icon: HelpCircle,
    color: 'bg-cozy-lavender',
    href: '/play/coincide',
    emoji: '🤔',
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Test your memory together',
    icon: Puzzle,
    color: 'bg-cozy-sky',
    href: '/play/sync-tap',
    emoji: '🧠',
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Classic game for two',
    icon: Gamepad2,
    color: 'bg-cozy-sage',
    href: '/play/tictactoe',
    emoji: '⭕',
  },
  {
    id: 'drawing',
    name: 'Draw Together',
    description: 'Create art together',
    icon: Palette,
    color: 'bg-cozy-rose',
    href: '/play/draw',
    emoji: '🎨',
  },
]

// Daily question
const dailyQuestion = {
  question: "What's one thing you're grateful for today?",
  type: 'light',
}

export default function BalconyPage() {
  const [showQuestion, setShowQuestion] = useState(false)
  const [questionAnswer, setQuestionAnswer] = useState('')
  const [answered, setAnswered] = useState(false)

  const handleSubmitAnswer = () => {
    if (questionAnswer.trim()) {
      setAnswered(true)
      // TODO: Save answer to API
    }
  }

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)]">
      {/* Balcony background - evening sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-cozy-lavender/40 via-cozy-sky/30 to-cozy-cream" />

      {/* Sunset/stars */}
      <div className="absolute top-0 left-0 right-0 h-1/3">
        <motion.div
          className="absolute top-8 left-8 text-4xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-16 right-16 text-3xl"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, delay: 1 }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute top-12 left-1/3 text-2xl"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
        >
          🌟
        </motion.div>
      </div>

      {/* Balcony railing */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4">
        <div className="absolute bottom-16 left-0 right-0 h-4 bg-cozy-brown/60" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cozy-brown/40 to-transparent" />

        {/* Railing posts */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-16 w-2 h-20 bg-cozy-brown/60 rounded-t"
            style={{ left: `${15 + i * 17.5}%` }}
          />
        ))}
      </div>

      {/* Plants on balcony */}
      <motion.div
        className="absolute bottom-24 left-8 text-4xl"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        🪴
      </motion.div>
      <motion.div
        className="absolute bottom-28 right-12 text-3xl"
        animate={{ rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🌻
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
                <Gamepad2 className="w-5 h-5 text-cozy-lavender" />
                Balcony Games
              </h1>
              <p className="text-sm text-cozy-brown/60">
                Play together under the stars
              </p>
            </div>
            <button
              onClick={() => setShowQuestion(true)}
              className="p-3 bg-cozy-lavender/50 rounded-full hover:bg-cozy-lavender transition-colors"
            >
              <Star className="w-5 h-5 text-cozy-brown" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Daily question card */}
      <motion.button
        onClick={() => setShowQuestion(true)}
        className="absolute top-28 left-4 right-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-gradient-to-r from-cozy-lavender/60 to-cozy-sky/60 backdrop-blur-sm rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/50 rounded-xl">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-cozy-brown">Daily Question</p>
              <p className="text-xs text-cozy-brown/70 line-clamp-1">{dailyQuestion.question}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-cozy-brown/60" />
          </div>
        </div>
      </motion.button>

      {/* Games grid */}
      <div className="absolute top-52 left-4 right-4 bottom-32">
        <div className="grid grid-cols-2 gap-4">
          {games.map((game, idx) => {
            const Icon = game.icon
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <Link href={game.href}>
                  <div className={cn(
                    'p-6 rounded-3xl shadow-lg transition-transform hover:scale-105 active:scale-95',
                    game.color
                  )}>
                    <div className="text-4xl mb-3">{game.emoji}</div>
                    <h3 className="font-bold text-cozy-brown mb-1">{game.name}</h3>
                    <p className="text-xs text-cozy-brown/70">{game.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Daily question modal */}
      <AnimatePresence>
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20"
            onClick={() => setShowQuestion(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-sm mx-4 shadow-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQuestion(false)}
                className="absolute top-4 right-4 p-2 hover:bg-cozy-beige/50 rounded-full"
              >
                <X className="w-5 h-5 text-cozy-brown/60" />
              </button>

              <div className="text-center mb-6">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  💭
                </motion.div>
                <h3 className="text-xl font-bold text-cozy-brown mb-2">
                  Daily Question
                </h3>
                <p className="text-cozy-brown/80">
                  {dailyQuestion.question}
                </p>
              </div>

              {!answered ? (
                <>
                  <textarea
                    value={questionAnswer}
                    onChange={(e) => setQuestionAnswer(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-4 rounded-xl border-2 border-cozy-beige focus:border-cozy-green focus:outline-none resize-none h-32 bg-cozy-cream/30"
                  />

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!questionAnswer.trim()}
                    className={cn(
                      'w-full mt-4 py-3 rounded-full font-medium transition-colors',
                      questionAnswer.trim()
                        ? 'bg-cozy-green text-white hover:bg-cozy-green/90'
                        : 'bg-cozy-beige text-cozy-brown/50'
                    )}
                  >
                    Share Answer
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-2">✨</div>
                  <p className="text-cozy-brown font-medium">Answer shared!</p>
                  <p className="text-sm text-cozy-brown/60 mt-1">
                    Check back to see your partner's response
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-center text-cozy-brown/50 mt-4">
                New question every day at midnight
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
