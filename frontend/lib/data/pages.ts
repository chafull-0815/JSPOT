// lib/data/pages.ts
import { frontPage, aboutPage, contactPage, type FrontPage, type StaticPage } from "@/lib/fixtures/pages.fixture";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "1";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

async function fetchPage<T>(slug: string): Promise<T | undefined> {
  if (!API_BASE) return undefined;
  const res = await fetch(`${API_BASE}/pages/${slug}`, { cache: "no-store" });
  if (!res.ok) return undefined;
  const json = await res.json();
  return (json?.data ?? json) as T;
}

export async function getFrontPage(): Promise<FrontPage> {
  if (USE_MOCK || !API_BASE) return frontPage;
  return (await fetchPage<FrontPage>("front")) ?? frontPage;
}
export async function getAboutPage(): Promise<StaticPage> {
  if (USE_MOCK || !API_BASE) return aboutPage;
  return (await fetchPage<StaticPage>("about")) ?? aboutPage;
}
export async function getContactPage(): Promise<StaticPage> {
  if (USE_MOCK || !API_BASE) return contactPage;
  return (await fetchPage<StaticPage>("contact")) ?? contactPage;
}
