"use client";

export default function PlantVisual({ stage, accent }: { stage: string; accent?: string }) {
  const size =
    stage === "seed"
      ? 32
      : stage === "sprout"
      ? 40
      : stage === "leaf"
      ? 52
      : stage === "bud"
      ? 64
      : 72;

  const opacity =
    stage === "seed"
      ? 0.18
      : stage === "sprout"
      ? 0.26
      : stage === "leaf"
      ? 0.34
      : stage === "bud"
      ? 0.42
      : 0.5;

  return (
    <div
      className="rounded-full border border-white/30"
      style={{
        width: size,
        height: size,
        background: accent ?? "rgba(255,255,255,0.2)",
        opacity,
      }}
    />
  );
}
