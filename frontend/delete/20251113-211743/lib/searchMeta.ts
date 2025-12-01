// lib/searchMeta.ts
import { area, AREA_STATIONS, hotStores, newStores, type Store } from "@/lib/stores";

export type Target = "lunch" | "dinner";
export type BudgetPreset = { label: string; min?: number; max?: number };

export type SearchMeta = {
  areas: string[];
  genres: string[];
  stations: string[];
  // 昼/夜の切替ラベル（UI用）とデフォルト
  targetOptions: { value: Target; label: string }[];
  budget: { lunch: BudgetPreset[]; dinner: BudgetPreset[] };
  placeholders: {
    area: string;
    genre: string;
    station: string;
    target: string;   // 例: "昼 / 夜"
    budget: string;   // 例: "予算"
  };
  defaults: {
    area: string;       // "" = 指定なし
    genre: string;      // "" = 指定なし
    station: string;    // "" = 指定なし
    target: Target;     // デフォルトは "lunch"
    presetIndex: number; // 0 = 「指定なし」
  };
};

// いまはダミー（Laravel導入時はこの関数だけ置き換える）
export function getSearchMeta(): SearchMeta {
  const all: Store[] = [...hotStores, ...newStores];
  const uniq = (arr: string[]) => Array.from(new Set(arr));

  const areas = uniq(area);
  const genres = uniq(all.map((s) => s.cooking));
  // AREA_STATIONSから全駅を取得して重複を除去
  const stations = uniq(Object.values(AREA_STATIONS).flat());

  const targetOptions = [
    { value: "lunch" as const,  label: "昼" },
    { value: "dinner" as const, label: "夜" },
  ];

  const budget = {
    lunch: [
      { label: "指定なし" },
      { label: "〜¥1,000", max: 1000 },
      { label: "¥1,001〜¥1,500", min: 1001, max: 1500 },
      { label: "¥1,501〜¥2,000", min: 1501, max: 2000 },
      { label: "¥2,001〜", min: 2001 },
    ],
    dinner: [
      { label: "指定なし" },
      { label: "〜¥3,000", max: 3000 },
      { label: "¥3,001〜¥5,000", min: 3001, max: 5000 },
      { label: "¥5,001〜¥8,000", min: 5001, max: 8000 },
      { label: "¥8,001〜", min: 8001 },
    ],
  };

  return {
    areas,
    genres,
    stations,
    targetOptions,
    budget,
    placeholders: {
      area: "エリア",
      genre: "ジャンル",
      station: "最寄り駅",
      target: "昼",
      budget: "予算",
    },
    // ★初期値はここで統一管理（画像で見せてくれたデフォルトに合わせる）
    defaults: {
      area: "",
      genre: "",
      station: "",
      target: "lunch",    // ← デフォルトは「昼」
      presetIndex: 0,     // ← 「指定なし」
    },
  };
}
