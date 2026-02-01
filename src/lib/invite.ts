import { randomBytes } from "crypto";

export function generateInviteCode() {
  const chunk = () => randomBytes(2).toString("hex").toUpperCase();
  return `${chunk()}-${chunk()}`;
}

export function generateToken() {
  return randomBytes(24).toString("hex");
}
