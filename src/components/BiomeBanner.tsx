import Image from "next/image";
import { BIOMES, BiomeId } from "@/lib/biomes";

export default function BiomeBanner({ biomeId }: { biomeId: BiomeId }) {
  const biome = BIOMES[biomeId];
  const image =
    biomeId === "forest_cabin"
      ? "/assets/biomes/forest-cabin.svg"
      : "/assets/biomes/cloud-loft.svg";

  return (
    <div className="card" style={{ padding: 16, overflow: "hidden" }}>
      <div className="subtle">Current biome</div>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{biome.name}</div>
      <Image src={image} alt="" width={600} height={200} />
      <p className="subtle" style={{ marginTop: 8 }}>
        {biome.descriptor}
      </p>
    </div>
  );
}
