import type { Timestamp } from "firebase/firestore";

export type Section = "home" | "methods" | "ai" | "clients" | "calculators" | "guides" | "tools" | "challenges" | "library" | "profile";
export type FirestoreRow = Record<string, unknown> & { id: string };

export function dateValue(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value && "toDate" in value && typeof (value as Timestamp).toDate === "function") return (value as Timestamp).toDate();
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function accessExpiration(user: FirestoreRow | null): Date | null {
  const explicit = dateValue(user?.accessExpiresAt || user?.expiresAt);
  return explicit;
}

export function isAccessActive(user: FirestoreRow | null, now = new Date()) {
  if (!user || user.status !== "active") return false;
  const expiration = accessExpiration(user);
  return !expiration || expiration.getTime() > now.getTime();
}

export function daysRemaining(user: FirestoreRow | null, now = new Date()) {
  const expiration = accessExpiration(user);
  if (!expiration) return null;
  return Math.max(0, Math.ceil((expiration.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));
}

export function displayDate(value: Date | null) {
  return value ? value.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : "Não definida";
}
