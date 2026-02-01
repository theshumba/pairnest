import { NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/demo";
import { listMoments } from "@/lib/demoStore";

export async function GET() {
  if (DEMO_MODE) {
    return NextResponse.json({ items: listMoments() });
  }

  return NextResponse.json({ items: [] });
}
