import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/invite";
import { sendMagicLink } from "@/lib/email";
import { rateLimit, rateLimitKey } from "@/lib/rateLimit";
import { enforceBodyLimit } from "@/lib/requestGuard";

const BodySchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  const limited = rateLimit(rateLimitKey(req, "auth.login"), {
    limit: 30,
    windowMs: 60_000,
  });
  if (limited) return limited;

  const tooLarge = enforceBodyLimit(req);
  if (tooLarge) return tooLarge;

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email" },
      { status: 400 }
    );
  }

  const { email } = parsed.data;
  const token = generateToken();
  const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const user = await prisma.user.upsert({
    where: { email },
    create: { email, magicLinkToken: token, tokenExpiresAt },
    update: { magicLinkToken: token, tokenExpiresAt },
  });

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const link = `${baseUrl}/api/auth/verify?token=${token}`;
  await sendMagicLink(email, link);

  return NextResponse.json({ success: true, token, userId: user.id });
}
