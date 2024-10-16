import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormatDateTime = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  const localDateData = new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
  return localDateData;
};
