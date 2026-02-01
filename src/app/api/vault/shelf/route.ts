import { NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/demo";
import { listPins } from "@/lib/demoStore";

export async function GET() {
  if (DEMO_MODE) {
    return NextResponse.json({ pins: listPins() });
  }

  return NextResponse.json({ pins: [] });
}
