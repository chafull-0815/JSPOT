// lib/data/search.ts
import type { BudgetPreset } from "@/lib/fixtures/search.fixture";
import { searchMeta as MOCK_SEARCH_META } from "@/lib/fixtures/search.fixture";
import type { Taxonomy } from "@/lib/fixtures/stores.fixture";
import { API_BASE, USE_MOCK } from "@/lib/utils/http";

export type SearchMeta = {
  areas: Taxonomy[];
  cookings: Taxonomy[];
  genres?: Taxonomy[]; // 互換用
  stations: Record<string, Taxonomy[]>; // areaSlug => stations[]
  lunchBudgets: BudgetPreset[];
  dinnerBudgets: BudgetPreset[];
  sortOptions: { key: string; label: string }[];
  featureTags: string[];
};

// API から返ってくる JSON をざっくり型定義
type SearchMetaResponse = {
  data?: Partial<SearchMeta>;
} & Partial<SearchMeta>;

async function fetchSearchMetaFromLaravel(): Promise<SearchMeta> {
  // API_BASE 未設定時はモックを返す
  if (!API_BASE) return MOCK_SEARCH_META as SearchMeta;

  const res = await fetch(`${API_BASE}/search/meta`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`fetch /search/meta failed: ${res.status}`);
  }

  const json = (await res.json()) as SearchMetaResponse;

  // Laravel 側で { data: {...} } or そのまま {...} の両対応
  const meta = json.data ?? json;

  // フォールバック用にモックを型付きで保持
  const fallback = MOCK_SEARCH_META as SearchMeta;

  return {
    areas: meta.areas ?? fallback.areas ?? [],
    cookings: meta.cookings ?? fallback.cookings ?? [],
    genres: meta.genres ?? fallback.genres ?? [],
    stations: meta.stations ?? fallback.stations ?? {},
    lunchBudgets: meta.lunchBudgets ?? fallback.lunchBudgets ?? [],
    dinnerBudgets: meta.dinnerBudgets ?? fallback.dinnerBudgets ?? [],
    sortOptions: meta.sortOptions ?? fallback.sortOptions ?? [],
    featureTags: meta.featureTags ?? fallback.featureTags ?? [],
  };
}

export async function getSearchMeta(): Promise<SearchMeta> {
  // モック優先フラグ or API_BASE 未設定時はモック返し
  if (USE_MOCK || !API_BASE) return MOCK_SEARCH_META as SearchMeta;

  try {
    return await fetchSearchMetaFromLaravel();
  } catch {
    // API 落ちたときもモックにフォールバック
    return MOCK_SEARCH_META as SearchMeta;
  }
}
