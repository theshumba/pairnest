export const DEMO_MODE = process.env.DEMO_MODE === "true";

export function demoUser() {
  return { id: "demo-user", email: "demo@pairnest.io" };
}

export function demoNestId() {
  return "demo-nest";
}

export function demoPartner() {
  return { id: "demo-partner", email: "partner@pairnest.io" };
}
