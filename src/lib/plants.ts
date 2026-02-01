export type PlantStage = "seed" | "sprout" | "leaf" | "bud" | "bloom";

export type PlantDef = {
  key: string;
  name: string;
  short: string;
  biomeIds: string[];
  vibe: string;
  stages: Record<PlantStage, { label: string; description: string }>;
};

export const PLANTS: Record<string, PlantDef> = {
  olive: {
    key: "olive",
    name: "Olive",
    short: "Steady and grounded.",
    biomeIds: ["forest_cabin", "garden_courtyard", "desert_dawn"],
    vibe: "patient, resilient",
    stages: {
      seed: { label: "Seed", description: "A quiet start." },
      sprout: { label: "Sprout", description: "First sign of care." },
      leaf: { label: "Leaf", description: "Growing roots." },
      bud: { label: "Bud", description: "Almost there." },
      bloom: { label: "Bloom", description: "A steady rhythm." },
    },
  },
  fern: {
    key: "fern",
    name: "Fern",
    short: "Soft, consistent attention.",
    biomeIds: ["cloud_loft", "rain_room", "ocean_cove"],
    vibe: "calm, close",
    stages: {
      seed: { label: "Seed", description: "Held in the shade." },
      sprout: { label: "Sprout", description: "A gentle lift." },
      leaf: { label: "Leaf", description: "Quiet growth." },
      bud: { label: "Bud", description: "Full and soft." },
      bloom: { label: "Bloom", description: "A steady green." },
    },
  },
  jasmine: {
    key: "jasmine",
    name: "Jasmine",
    short: "Light and affectionate.",
    biomeIds: ["starlit_observatory", "desert_dawn"],
    vibe: "warm, delicate",
    stages: {
      seed: { label: "Seed", description: "A small promise." },
      sprout: { label: "Sprout", description: "You can feel it." },
      leaf: { label: "Leaf", description: "It’s becoming real." },
      bud: { label: "Bud", description: "Almost fragrant." },
      bloom: { label: "Bloom", description: "Soft brightness." },
    },
  },
  cactus: {
    key: "cactus",
    name: "Cactus",
    short: "Low pressure care.",
    biomeIds: ["desert_dawn"],
    vibe: "simple, durable",
    stages: {
      seed: { label: "Seed", description: "Minimal start." },
      sprout: { label: "Sprout", description: "Still small." },
      leaf: { label: "Leaf", description: "Stable." },
      bud: { label: "Bud", description: "Stronger." },
      bloom: { label: "Bloom", description: "It holds." },
    },
  },
  lotus: {
    key: "lotus",
    name: "Lotus",
    short: "Reset and return.",
    biomeIds: ["rain_room", "ocean_cove"],
    vibe: "clean, reflective",
    stages: {
      seed: { label: "Seed", description: "Below the surface." },
      sprout: { label: "Sprout", description: "Rising slowly." },
      leaf: { label: "Leaf", description: "Open calm." },
      bud: { label: "Bud", description: "Almost." },
      bloom: { label: "Bloom", description: "Clear and quiet." },
    },
  },
};

export function listPlantsForBiome(biomeId: string) {
  return Object.values(PLANTS).filter((p) => p.biomeIds.includes(biomeId));
}
