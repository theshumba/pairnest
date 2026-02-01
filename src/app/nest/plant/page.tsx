"use client";

import { useEffect, useMemo, useState } from "react";
import ShinyButton from "@/components/ui/ShinyButton";
import { RpgPanel } from "@/components/ui/RPGPanel";
import PlantVisual from "@/components/PlantVisual";
import { listPlantsForBiome, PLANTS } from "@/lib/plants";

export default function PlantPage() {
  const [nest, setNest] = useState<any>(null);
  const [plant, setPlant] = useState<any>(null);
  const [def, setDef] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/nest/get").then((r) => r.json()),
      fetch("/api/plant").then((r) => r.json()),
    ]).then(([nestRes, plantRes]) => {
      setNest(nestRes.nest);
      setPlant(plantRes.plant);
      setDef(plantRes.def ?? null);
    });
  }, []);

  const options = useMemo(
    () => (nest ? listPlantsForBiome(nest.biomeId) : []),
    [nest]
  );

  async function water() {
    setBusy(true);
    setStatus(null);

    const res = await fetch("/api/plant/water", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent: "water" }),
    })
      .then((r) => r.json())
      .catch((e) => ({ error: e.message }));

    setBusy(false);

    if (res.error) {
      setStatus(res.error);
      return;
    }

    setPlant(res.plant);
    if (res.already) setStatus("Already watered today.");
    else if (res.bothWatered) setStatus("Watered. Streak increased.");
    else setStatus("Watered. Waiting for the other person.");
  }

  async function choose(plantKey: string) {
    setBusy(true);
    setStatus(null);

    const res = await fetch("/api/plant/choose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plantKey }),
    })
      .then((r) => r.json())
      .catch((e) => ({ error: e.message }));

    setBusy(false);

    if (res.error) {
      setStatus(res.error);
      return;
    }

    setPlant(res.plant);
    setDef(PLANTS[plantKey]);
    setStatus("Plant selected.");
  }

  if (!nest || !plant) {
    return (
      <div className="min-h-full bg-plastic-bg p-4 pb-24">
        <RpgPanel title="Plant Systems" glowing>
          <div className="text-white/60">Loading plant…</div>
        </RpgPanel>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24">
      <header className="mb-6">
        <h1 className="text-3xl font-black italic tracking-tight text-white">
          LOVE PLANT
        </h1>
        <p className="font-data text-white/60">Daily care, shared streaks</p>
      </header>

      <div className="grid gap-6">
        <RpgPanel title="Current Plant" glowing>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold text-white">
                {def?.name ?? plant.plantKey}
              </div>
              <div className="text-white/60 text-sm">{def?.short ?? "—"}</div>
              <div className="text-white/50 text-xs mt-2">
                Stage: {stageLabel(plant.stage)} • Streak {plant.streakDays}d
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PlantVisual stage={plant.stage} accent="#CCFF00" />
              <ShinyButton variant="lime" size="sm" onClick={water} disabled={busy}>
                WATER
              </ShinyButton>
            </div>
          </div>
          {status ? <div className="text-white/60 text-sm mt-3">{status}</div> : null}
        </RpgPanel>

        <RpgPanel title="Stage Meaning" glowing>
          <div className="text-white/70 text-sm">
            {def?.stages?.[plant.stage]?.description ?? "Keep watering together."}
          </div>
        </RpgPanel>

        <RpgPanel title="Choose a Plant" glowing>
          <div className="text-white/60 text-sm">
            Available for biome: <span className="text-white">{nest.biomeId}</span>
          </div>
          <div className="mt-4 grid gap-3">
            {options.map((p) => {
              const selected = p.key === plant.plantKey;
              return (
                <div
                  key={p.key}
                  className="rounded-2xl border-2 border-white/20 bg-black/30 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-bold">{p.name}</div>
                      <div className="text-white/60 text-sm">{p.short}</div>
                      <div className="text-white/50 text-xs mt-2">Vibe: {p.vibe}</div>
                    </div>
                    <ShinyButton
                      variant={selected ? "glass" : "cyan"}
                      size="sm"
                      disabled={busy || selected}
                      onClick={() => choose(p.key)}
                    >
                      {selected ? "SELECTED" : "CHOOSE"}
                    </ShinyButton>
                  </div>
                </div>
              );
            })}
          </div>
        </RpgPanel>
      </div>
    </div>
  );
}

function stageLabel(stage: string) {
  if (stage === "seed") return "Seed";
  if (stage === "sprout") return "Sprout";
  if (stage === "leaf") return "Leaf";
  if (stage === "bud") return "Bud";
  return "Bloom";
}
