import { NextResponse } from "next/server";
import { DEMO_MODE, demoNestId, demoPartner, demoUser } from "@/lib/demo";

export async function GET() {
  if (DEMO_MODE) {
    const user = demoUser();
    const partner = demoPartner();
    return NextResponse.json({
      nest: {
        id: demoNestId(),
        code: "PLST-88",
        biomeId: "cloud_loft",
        growthPoints: 9,
        growthStage: "sprout",
      },
      members: [{ userId: user.id }, { userId: partner.id }],
      comfort: {
        promptIntensity: "light",
        tone: "neutral",
        quests: "off",
        hideDares: false,
        hideSpicy: false,
        hideSensitiveTopics: false,
      },
      presence: [
        { userId: user.id, presence: "online", lastSeenAt: new Date().toISOString() },
        { userId: partner.id, presence: "online", lastSeenAt: new Date().toISOString() },
      ],
    });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
