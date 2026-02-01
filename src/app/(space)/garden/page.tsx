'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Sparkles, Plus, Heart, Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'

// Plant types and their growth stages
const PLANT_TYPES = {
  fern: { name: 'Fern', emoji: ['🌱', '🌿', '🪴', '🌿'], color: 'bg-forest' },
  succulent: { name: 'Succulent', emoji: ['🌱', '🪴', '🌵', '🌵'], color: 'bg-desert' },
  flowering: { name: 'Flowering', emoji: ['🌱', '🌿', '🌷', '🌸'], color: 'bg-cozy-rose' },
  cactus: { name: 'Cactus', emoji: ['🌱', '🌵', '🌵', '🌵'], color: 'bg-desert' },
  vine: { name: 'Vine', emoji: ['🌱', '🌿', '🍃', '🌿'], color: 'bg-jungle' },
}

type PlantType = keyof typeof PLANT_TYPES

interface Plant {
  id: string
  type: PlantType
  stage: number
  lastWatered: Date
  name?: string
}

// Demo plants
const demoPlants: Plant[] = [
  { id: '1', type: 'fern', stage: 2, lastWatered: new Date() },
  { id: '2', type: 'flowering', stage: 3, lastWatered: new Date(Date.now() - 86400000) },
]

export default function GardenPage() {
  const [plants, setPlants] = useState<Plant[]>(demoPlants)
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [wateringPlant, setWateringPlant] = useState<string | null>(null)

  const handleWater = async (plantId: string) => {
    setWateringPlant(plantId)

    // Simulate watering animation
    await new Promise(resolve => setTimeout(resolve, 1500))

    setPlants(prev =>
      prev.map(p =>
        p.id === plantId
          ? { ...p, lastWatered: new Date() }
          : p
      )
    )
    setWateringPlant(null)
  }

  const needsWater = (plant: Plant) => {
    const hoursSinceWater = (Date.now() - new Date(plant.lastWatered).getTime()) / 3600000
    return hoursSinceWater > 12
  }

  const addPlant = (type: PlantType) => {
    const newPlant: Plant = {
      id: Date.now().toString(),
      type,
      stage: 0,
      lastWatered: new Date(),
    }
    setPlants(prev => [...prev, newPlant])
    setShowAddModal(false)
  }

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-4rem)]">
      {/* Garden background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cozy-sky/40 via-cozy-sage/30 to-forest-light" />

      {/* Sun */}
      <motion.div
        className="absolute top-8 right-8 text-6xl"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        ☀️
      </motion.div>

      {/* Clouds */}
      <motion.div
        className="absolute top-12 left-12 text-3xl opacity-70"
        animate={{ x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      >
        ☁️
      </motion.div>

      {/* Garden area */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-forest-dark/30 via-forest/20 to-transparent">
        {/* Grass texture */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-forest to-forest-light/50" />
      </div>

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
                <Leaf className="w-5 h-5 text-forest" />
                Your Garden
              </h1>
              <p className="text-sm text-cozy-brown/60">
                {plants.length} plant{plants.length !== 1 ? 's' : ''} growing
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="p-3 bg-forest text-white rounded-full hover:bg-forest-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Plants display */}
      <div className="absolute bottom-32 left-4 right-4">
        <div className="flex justify-center gap-6 flex-wrap">
          {plants.map((plant, idx) => {
            const plantInfo = PLANT_TYPES[plant.type]
            const emoji = plantInfo.emoji[Math.min(plant.stage, plantInfo.emoji.length - 1)]
            const isWatering = wateringPlant === plant.id
            const thirsty = needsWater(plant)

            return (
              <motion.button
                key={plant.id}
                className="relative"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: idx * 0.15, type: 'spring' }}
                onClick={() => setSelectedPlant(plant)}
              >
                {/* Plant pot */}
                <div className={cn(
                  'relative px-8 py-6 rounded-3xl',
                  'bg-gradient-to-b from-cozy-brown/80 to-cozy-brown',
                  'shadow-lg'
                )}>
                  {/* Plant */}
                  <motion.div
                    className="text-6xl relative z-10"
                    animate={isWatering ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {
                      rotate: [-2, 2, -2],
                    }}
                    transition={isWatering ? { duration: 0.5 } : {
                      repeat: Infinity,
                      duration: 3,
                      ease: 'easeInOut'
                    }}
                  >
                    {emoji}
                  </motion.div>

                  {/* Water droplets animation */}
                  <AnimatePresence>
                    {isWatering && (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-xl"
                            initial={{
                              top: -20,
                              left: `${20 + i * 15}%`,
                              opacity: 1
                            }}
                            animate={{
                              top: 60,
                              opacity: 0
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.1,
                              ease: 'easeIn'
                            }}
                          >
                            💧
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Thirsty indicator */}
                  {thirsty && !isWatering && (
                    <motion.div
                      className="absolute -top-2 -right-2 p-2 bg-cozy-sky rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Droplets className="w-4 h-4 text-blue-500" />
                    </motion.div>
                  )}

                  {/* Sparkles for happy plant */}
                  {!thirsty && (
                    <motion.div
                      className="absolute -top-2 -left-2"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>

                {/* Plant name tag */}
                <div className="mt-2 px-3 py-1 bg-white/80 rounded-full text-sm text-cozy-brown font-medium text-center">
                  {plant.name || plantInfo.name}
                </div>
              </motion.button>
            )
          })}

          {/* Empty pot for adding */}
          {plants.length < 5 && (
            <motion.button
              className="opacity-50 hover:opacity-100 transition-opacity"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: plants.length * 0.15 }}
              onClick={() => setShowAddModal(true)}
            >
              <div className="px-8 py-6 rounded-3xl bg-cozy-brown/30 border-2 border-dashed border-cozy-brown/40">
                <Plus className="w-12 h-12 text-cozy-brown/40" />
              </div>
              <div className="mt-2 text-sm text-cozy-brown/60">Add plant</div>
            </motion.button>
          )}
        </div>
      </div>

      {/* Plant detail modal */}
      <AnimatePresence>
        {selectedPlant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20"
            onClick={() => setSelectedPlant(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-sm mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {PLANT_TYPES[selectedPlant.type].emoji[Math.min(selectedPlant.stage, 3)]}
                </motion.div>

                <h3 className="text-xl font-bold text-cozy-brown mb-1">
                  {selectedPlant.name || PLANT_TYPES[selectedPlant.type].name}
                </h3>

                <p className="text-cozy-brown/60 text-sm mb-4">
                  Growth stage: {selectedPlant.stage + 1}/4
                </p>

                {/* Growth progress */}
                <div className="w-full h-3 bg-cozy-beige rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-forest rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((selectedPlant.stage + 1) / 4) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleWater(selectedPlant.id)}
                    disabled={wateringPlant === selectedPlant.id}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-medium transition-colors',
                      needsWater(selectedPlant)
                        ? 'bg-cozy-sky text-cozy-brown'
                        : 'bg-cozy-beige text-cozy-brown/60'
                    )}
                  >
                    <Droplets className="w-5 h-5" />
                    {wateringPlant === selectedPlant.id ? 'Watering...' : 'Water'}
                  </button>

                  <button
                    onClick={() => setSelectedPlant(null)}
                    className="px-6 py-3 bg-cozy-beige text-cozy-brown rounded-full font-medium"
                  >
                    Close
                  </button>
                </div>

                <p className="text-xs text-cozy-brown/50 mt-4">
                  <Heart className="w-3 h-3 inline mr-1" />
                  Water daily together to help it grow!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add plant modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-sm mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-cozy-brown mb-4 text-center">
                Choose a plant
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(PLANT_TYPES) as PlantType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => addPlant(type)}
                    className="p-4 rounded-2xl bg-cozy-beige/50 hover:bg-cozy-sage/50 transition-colors"
                  >
                    <div className="text-4xl mb-1">{PLANT_TYPES[type].emoji[0]}</div>
                    <div className="text-xs text-cozy-brown">{PLANT_TYPES[type].name}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="w-full mt-4 py-3 bg-cozy-beige text-cozy-brown rounded-full font-medium"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
