import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameShortcut(name: string) {
  const parts = name.split(" ");
  if (parts.length > 1) {
    const first = parts[0]!;
    const second = parts[parts.length - 1]!;
    return `${first.slice(0, 1)}${second.slice(0, 1)}`.toUpperCase();
  } else {
    return name.slice(0, 2).toUpperCase();
  }
}
