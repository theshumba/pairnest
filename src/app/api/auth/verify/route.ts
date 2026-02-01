import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/invite";
import { rateLimit, rateLimitKey } from "@/lib/rateLimit";

export async function GET(req: Request) {
  const limited = rateLimit(rateLimitKey(req, "auth.verify"), {
    limit: 60,
    windowMs: 60_000,
  });
  if (limited) return limited;

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  const user = await prisma.user.findFirst({
    where: { magicLinkToken: token },
  });

  if (!user || !user.tokenExpiresAt || user.tokenExpiresAt < new Date()) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { magicLinkToken: null, tokenExpiresAt: null },
  });

  const res = NextResponse.redirect(new URL("/start", req.url));
  res.cookies.set("pn_session", session.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
