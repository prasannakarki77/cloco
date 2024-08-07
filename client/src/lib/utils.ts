import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function fDate(date: Date | string, newFormat?: string) {
  const fm = newFormat || "MMMM d, yyyy";

  return date ? format(new Date(date), fm) : "";
}
