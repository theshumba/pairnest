import { NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/demo";

export async function GET() {
  if (DEMO_MODE) {
    return NextResponse.json({ count: 5 });
  }
  return NextResponse.json({ count: 0 });
}
