import { NextResponse } from "next/server";
import { DEMO_MODE, demoNestId, demoUser } from "@/lib/demo";

export async function GET() {
  if (DEMO_MODE) {
    const user = demoUser();
    return NextResponse.json({ userId: user.id, nestId: demoNestId() });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
