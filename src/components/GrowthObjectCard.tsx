import Image from "next/image";
import { BIOMES, BiomeId } from "@/lib/biomes";

interface GrowthObjectCardProps {
  biomeId: BiomeId;
  stage: number;
}

export default function GrowthObjectCard({ biomeId, stage }: GrowthObjectCardProps) {
  const biome = BIOMES[biomeId];
  const normalizedStage = Math.max(0, Math.min(5, stage));
  const isForest = biomeId === "forest_cabin";
  const asset = isForest
    ? `/assets/biomes/forest-plant-stage-${normalizedStage}.svg`
    : `/assets/biomes/cloud-mobile-stage-${normalizedStage}.svg`;

  return (
    <div className="card" style={{ padding: 16 }}>
      <h3>{biome.growthObject.name}</h3>
      <p className="subtle">Stage: {biome.growthObject.stages[normalizedStage]}</p>
      <div style={{ marginTop: 8 }}>
        <Image src={asset} alt="" width={520} height={220} />
      </div>
      <div className="subtle" style={{ fontSize: 13, marginTop: 8 }}>
        Grows with shared time. No streaks.
      </div>
    </div>
  );
}
