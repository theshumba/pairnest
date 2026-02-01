import { BIOMES, BiomeId, DEFAULT_BIOME } from "@/lib/biomes";

interface BiomeBackgroundProps {
  biomeId?: BiomeId;
}

export default function BiomeBackground({
  biomeId = DEFAULT_BIOME,
}: BiomeBackgroundProps) {
  const biome = BIOMES[biomeId];
  const image =
    biomeId === "forest_cabin"
      ? "/assets/biomes/forest-cabin.svg"
      : "/assets/biomes/cloud-loft.svg";

  return (
    <>
      <div
        className="biome-bg"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="ambient" />
    </>
  );
}
