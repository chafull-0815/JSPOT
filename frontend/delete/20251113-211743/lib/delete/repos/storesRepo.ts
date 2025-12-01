// lib/repos/storesRepo.ts
// stores の取得窓口（開発: モック / 本番: Laravel API）
// ----------------------------------------------------------------

import {
  allStores as MOCK_ALL,
  hotStores as MOCK_HOT,
  newStores as MOCK_NEW,
  mapLaravelStore,
  type Store,
  type LaravelStore,
} from "@/lib/delete/mock/stores.mock";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "1";

// 本番 API 叩く場合は URL を .env で指定
// 例) NEXT_PUBLIC_API_BASE=https://api.example.com
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/** Laravel から一覧を取得して Front 用 Store[] に変換 */
async function fetchFromLaravel(): Promise<Store[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}/stores`, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetch stores failed: ${res.status}`);
  // 想定: { data: LaravelStore[] } or LaravelStore[]
  const json = await res.json();
  const arr: LaravelStore[] = Array.isArray(json) ? json : (json?.data ?? []);
  return arr.map(mapLaravelStore);
}

// ----------------------------------------------------------------
// Named exports（ここが重要：getAllStores を必ず書き出す）
// ----------------------------------------------------------------

export async function getAllStores(): Promise<Store[]> {
  if (USE_MOCK || !API_BASE) return MOCK_ALL;
  try {
    return await fetchFromLaravel();
  } catch {
    // フェイルセーフ：API 失敗時はモックを返す
    return MOCK_ALL;
  }
}

export async function getHotStores(): Promise<Store[]> {
  if (USE_MOCK || !API_BASE) return MOCK_HOT;
  const all = await getAllStores();
  return all.slice(0, 9);
}

export async function getNewStores(): Promise<Store[]> {
  if (USE_MOCK || !API_BASE) return MOCK_NEW;
  const all = await getAllStores();
  return all.slice(-9);
}

export async function getStoreBySlug(slug: string): Promise<Store | undefined> {
  const all = await getAllStores();
  return all.find((s) => s.slug === slug);
}

// optional: まとめて使いたい場合の default export
export default {
  getAllStores,
  getHotStores,
  getNewStores,
  getStoreBySlug,
};
