import { NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number }
) {
  const entry = buckets.get(key);
  const t = now();
  if (!entry || entry.resetAt <= t) {
    buckets.set(key, { count: 1, resetAt: t + opts.windowMs });
    return null;
  }

  if (entry.count >= opts.limit) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - t) / 1000));
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again soon." },
      { status: 429, headers: { "Retry-After": retryAfter.toString() } }
    );
  }

  entry.count += 1;
  buckets.set(key, entry);
  return null;
}

export function rateLimitKey(req: Request, pathLabel: string) {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : "local";
  return `${pathLabel}:${ip}`;
}
