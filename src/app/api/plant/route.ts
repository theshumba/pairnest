import { NextResponse } from "next/server";
import { DEMO_MODE, demoNestId } from "@/lib/demo";
import { PLANTS } from "@/lib/plants";
import { getPlant, updatePlant } from "@/lib/demoStore";

function startOfDayUTC(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0));
}

function addDaysUTC(day: Date, n: number) {
  const t = day.getTime() + n * 86400000;
  return new Date(t);
}

async function rolloverPlantIfNeeded(nestId: string) {
  const plant = getPlant(nestId);
  if (!plant.lastWateredDay) return plant;

  const last = startOfDayUTC(new Date(plant.lastWateredDay));
  const today = startOfDayUTC(new Date());

  if (today.getTime() === last.getTime()) return plant;

  const yesterday = addDaysUTC(today, -1);
  const missed = last.getTime() !== yesterday.getTime();

  if (!missed) return plant;

  return updatePlant(nestId, { streakDays: 0, stage: "seed" });
}

export async function GET() {
  if (DEMO_MODE) {
    const plant = await rolloverPlantIfNeeded(demoNestId());
    const def = PLANTS[plant.plantKey] ?? null;
    return NextResponse.json({
      plant,
      def: def
        ? { key: def.key, name: def.name, short: def.short, vibe: def.vibe, stages: def.stages }
        : null,
    });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
