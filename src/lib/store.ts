import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  xp: number;
  coins: number;
  level: number;
  streak: number;
  plantStage: number;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  waterPlant: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      xp: 0,
      coins: 100,
      level: 1,
      streak: 1,
      plantStage: 1,
      addXp: (amount) =>
        set((state) => {
          const newXp = state.xp + amount;
          const newLevel = Math.floor(newXp / 1000) + 1;
          return { xp: newXp, level: newLevel };
        }),
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      waterPlant: () =>
        set((state) => ({
          plantStage: state.plantStage < 5 ? state.plantStage + 1 : 1,
        })),
    }),
    { name: "pairnest-game-storage" }
  )
);
