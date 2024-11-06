import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price = 0) {
  const numericPrice = typeof price === "string" ? parseInt(price) : price;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function formatDate(
  isoDate,
  locale = "id-ID",
  timeZone = "Asia/Jakarta"
) {
  return new Date(isoDate).toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timeZone,
  });
}
