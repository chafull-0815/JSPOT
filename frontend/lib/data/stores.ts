// lib/data/stores.ts
import {
  allStores as MOCK_ALL,
  mapLaravelStore,
  type Store,
  type LaravelStore,
} from "@/lib/fixtures/stores.fixture";
import { API_BASE, USE_MOCK } from "@/lib/utils/http";


async function fetchStoresFromLaravel(): Promise<Store[]> {
  if (!API_BASE) return MOCK_ALL;

  const res = await fetch(`${API_BASE}/stores`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`fetch /stores failed: ${res.status}`);
  }

  const json = await res.json();
  const arr: LaravelStore[] = Array.isArray(json) ? json : (json?.data ?? []);

  // ★ 追加：中身が空ならモックを返す
  if (!arr || arr.length === 0) return MOCK_ALL;

  return arr.map(mapLaravelStore);
}


async function fetchStoreBySlugFromLaravel(slug: string): Promise<Store | undefined> {
  if (!API_BASE) return MOCK_ALL.find((s) => s.slug === slug);

  const res = await fetch(`${API_BASE}/stores/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (!res.ok) return undefined;

  const json = await res.json();
  const item: LaravelStore | undefined = json?.data ?? json;

  // ★ 追加：Laravelが空ならモックから返す
  if (!item) return MOCK_ALL.find((s) => s.slug === slug);

  return mapLaravelStore(item);
}


/**
 * Public API
 *  - ★ ここでは「派生リスト」は一切返さない
 *  - HOT/NEW などの絞り込みは page.tsx + predicate.ts 側で行う
 */
export async function getAllStores(): Promise<Store[]> {
  if (USE_MOCK || !API_BASE) return MOCK_ALL;

  try {
    return await fetchStoresFromLaravel();
  } catch {
    return MOCK_ALL;
  }
}

export async function getStoreBySlug(slug: string): Promise<Store | undefined> {
  if (USE_MOCK || !API_BASE) {
    return MOCK_ALL.find((s) => s.slug === slug);
  }

  try {
    return await fetchStoreBySlugFromLaravel(slug);
  } catch {
    return undefined;
  }
}
