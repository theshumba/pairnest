import { NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/demo";
import { listVaultItems } from "@/lib/demoStore";

export async function GET() {
  if (DEMO_MODE) {
    return NextResponse.json({ items: listVaultItems() });
  }
  return NextResponse.json({ items: [] });
}
