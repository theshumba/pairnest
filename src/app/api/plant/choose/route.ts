import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE, demoNestId, demoUser } from "@/lib/demo";
import { PLANTS, listPlantsForBiome } from "@/lib/plants";
import { updatePlant } from "@/lib/demoStore";
import { audit } from "@/lib/audit";

const BodySchema = z.object({
  plantKey: z.string().min(1).max(40),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    const biomeId = "cloud_loft";
    const allowed = listPlantsForBiome(biomeId).some((p) => p.key === parsed.data.plantKey);
    if (!PLANTS[parsed.data.plantKey] || !allowed) {
      return NextResponse.json({ error: "Plant not available in this biome." }, { status: 400 });
    }

    const plant = updatePlant(demoNestId(), {
      plantKey: parsed.data.plantKey,
      stage: "seed",
      streakDays: 0,
      lastWateredDay: null,
    });
    await audit(demoNestId(), demoUser().id, "plant.choose", { plantKey: parsed.data.plantKey });
    return NextResponse.json({ plant });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
