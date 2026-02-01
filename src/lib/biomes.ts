export type BiomeId = "cloud_loft" | "forest_cabin";

export interface BiomeConfig {
  id: BiomeId;
  name: string;
  descriptor: string;
  gradient: string;
  accent: string;
  accentSecondary: string;
  growthObject: {
    name: string;
    stages: string[];
  };
  suggestionWeights: {
    lightGames: number;
    checkIn: number;
    memory: number;
    together: number;
  };
}

export const BIOMES: Record<BiomeId, BiomeConfig> = {
  cloud_loft: {
    id: "cloud_loft",
    name: "Cloud Loft",
    descriptor: "Light, calm, low pressure",
    gradient: "linear-gradient(180deg, #FAF8F5 0%, #E6F0F9 100%)",
    accent: "#A7C7E7",
    accentSecondary: "#E7D9A8",
    growthObject: {
      name: "Paper Mobile",
      stages: [
        "Single crane",
        "Two cranes",
        "Three cranes",
        "Five cranes",
        "Charm added",
        "Keepsake ready",
      ],
    },
    suggestionWeights: {
      lightGames: 0.9,
      checkIn: 0.35,
      memory: 0.1,
      together: 0.45,
    },
  },
  forest_cabin: {
    id: "forest_cabin",
    name: "Forest Cabin",
    descriptor: "Cosy, grounded, memory friendly",
    gradient: "linear-gradient(180deg, #FAF8F5 0%, #E3E0D7 100%)",
    accent: "#3E5F4A",
    accentSecondary: "#C18F59",
    growthObject: {
      name: "Shared Plant",
      stages: ["Soil", "Sprout", "Leaves", "Young plant", "Mature", "Bloom"],
    },
    suggestionWeights: {
      lightGames: 0.55,
      checkIn: 0.75,
      memory: 0.5,
      together: 0.6,
    },
  },
};

export const DEFAULT_BIOME: BiomeId = "cloud_loft";
