import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE, demoNestId, demoUser, demoPartner } from "@/lib/demo";
import { getPlant, updatePlant, addDailyAction, listDailyActions } from "@/lib/demoStore";
import { audit } from "@/lib/audit";

const BodySchema = z.object({
  intent: z.literal("water"),
});

function startOfDayUTC(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0));
}

function plantStageForStreak(streak: number) {
  if (streak >= 14) return "bloom";
  if (streak >= 9) return "bud";
  if (streak >= 5) return "leaf";
  if (streak >= 2) return "sprout";
  return "seed";
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    const today = startOfDayUTC(new Date()).toISOString();
    const nestId = demoNestId();
    const userId = demoUser().id;

    const created = addDailyAction({
      nestId,
      userId,
      day: today,
      action: "water",
    });

    if (!created) {
      return NextResponse.json({ ok: true, already: true, plant: getPlant(nestId) });
    }

    const members = [demoUser().id, demoPartner().id];
    const todaysActions = listDailyActions(nestId, today, "water");
    const watered = new Set(todaysActions.map((a) => a.userId));
    const bothWatered = members.length === 2 && members.every((id) => watered.has(id));

    let plant = getPlant(nestId);
    if (bothWatered) {
      const nextStreak = (plant.streakDays ?? 0) + 1;
      const nextStage = plantStageForStreak(nextStreak);
      plant = updatePlant(nestId, {
        streakDays: nextStreak,
        stage: nextStage,
        lastWateredDay: today,
      });
    }

    await audit(nestId, userId, "plant.water", { bothWatered });
    return NextResponse.json({ ok: true, already: false, bothWatered, plant });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
