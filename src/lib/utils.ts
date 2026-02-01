import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSpaceName() {
  const prefixes = ["Cosmic", "Neon", "Cyber", "Plastic", "Retro", "Hyper"];
  const suffixes = ["Cadet", "Glitch", "Surfer", "Pilot", "Ghost", "Punk"];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${
    suffixes[Math.floor(Math.random() * suffixes.length)]
  }${Math.floor(Math.random() * 100)}`;
}
