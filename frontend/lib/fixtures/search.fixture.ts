// lib/fixtures/search.fixture.ts
// 検索UI用メタ（本番はLaravel返却。形の正はここ）

import type { Taxonomy } from "./stores.fixture";

export type BudgetPreset = { label: string; min?: number; max?: number };

// taxonomy: area
export const areas: Taxonomy[] = [
  { slug: "tokyo", label: "東京" },
  { slug: "kanagawa", label: "神奈川" },
  { slug: "osaka", label: "大阪" },
  { slug: "aichi", label: "愛知" },
  { slug: "kyoto", label: "京都" },
  { slug: "fukuoka", label: "福岡" },
];

// taxonomy: cooking（= genre互換）
export const cookings: Taxonomy[] = [
  { slug: "sushi", label: "寿司" },
  { slug: "ramen", label: "ラーメン" },
  { slug: "yakiniku", label: "焼肉" },
  { slug: "cafe", label: "カフェ" },
];

// 互換用（古いUIが genres を読んでも死なない）
export const genres: Taxonomy[] = cookings;

// taxonomy: station（areaSlug にぶら下げ）※手作業でOK
export const stations: Record<string, Taxonomy[]> = {
  tokyo: [
    { slug: "shinjuku", label: "新宿" },
    { slug: "shibuya", label: "渋谷" },
    { slug: "ginza", label: "銀座" },
  ],
  osaka: [
    { slug: "umeda", label: "梅田" },
    { slug: "namba", label: "なんば" },
    { slug: "tennoji", label: "天王寺" },
  ],
};

// 予算プリセット
export const lunchBudgets: BudgetPreset[] = [
  { label: "〜 ¥800", max: 800 },
  { label: "¥800 〜 ¥1,200", min: 800, max: 1200 },
  { label: "¥1,200 〜", min: 1200 },
];

export const dinnerBudgets: BudgetPreset[] = [
  { label: "〜 ¥2,500", max: 2500 },
  { label: "¥2,500 〜 ¥4,000", min: 2500, max: 4000 },
  { label: "¥4,000 〜", min: 4000 },
];

// 並び替え（今はUIに出さないが形は保持）
export const sortOptions = [
  { key: "popular", label: "人気順" },
  { key: "new", label: "新着順" },
];

// こだわりタグ（今はUIに出さないが形は保持）
export const featureTags = ["個室", "子連れOK", "テイクアウト", "深夜営業", "Wi-Fi/電源", "HOT", "NEW"];

// SearchBar が受け取るメタのmock
export const searchMeta = {
  areas,
  stations,
  cookings,
  genres,
  lunchBudgets,
  dinnerBudgets,
  sortOptions,
  featureTags,
};

export { searchMeta as defaultSearchMeta };
