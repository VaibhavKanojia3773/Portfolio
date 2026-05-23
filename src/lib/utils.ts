import { clsx, type ClassValue } from "clsx";

/** Merge Tailwind classes safely (clsx wrapper). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
