import { Resend } from "resend";

export async function sendMagicLink(email: string, link: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set. Magic link: ", link);
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.MAGIC_LINK_FROM || "Pairnest <no-reply@pairnest.io>",
    to: email,
    subject: "Your Pairnest sign-in link",
    html: `<p>Use this link to sign in:</p><p><a href="${link}">${link}</a></p>`,
  });
}
