import { NextResponse } from "next/server";

export function enforceBodyLimit(req: Request, maxBytes = 64 * 1024) {
  const size = req.headers.get("content-length");
  if (!size) return null;
  const len = Number(size);
  if (!Number.isFinite(len)) return null;
  if (len > maxBytes) {
    return NextResponse.json(
      { error: "Payload too large." },
      { status: 413 }
    );
  }
  return null;
}
