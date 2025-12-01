// lib/utils/http.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "1";

export async function apiGet<T>(path: string): Promise<T | undefined> {
  if (!API_BASE) return undefined;
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) return undefined;
  const json = await res.json();
  return (json?.data ?? json) as T;
}
