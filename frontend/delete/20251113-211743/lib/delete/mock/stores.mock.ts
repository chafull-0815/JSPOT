// lib/mock/stores.mock.ts
// ============================================================
// 投稿 = stores 用の単一モック
// - 型: Store / LaravelStore
// - 検索メタ: areas / genres / budgets / sortOptions / featureTags / stations
// - マッピング: mapLaravelStore (Laravel→Front)
// - データ: laravelStoresMock(18件) → allStores / hotStores / newStores
// ============================================================

// ---- Front 用の最終型 ----
export type Store = {
  id: string;
  slug: string;
  name: string;
  area: string;        // 例: "東京・新宿"（URLクエリも area で統一）
  genre?: string;      // 正式。UI/検索は genre に寄せる
  cooking?: string;    // 互換（旧名）。内部的には genre と同値を入れる
  lunch?: number;      // 円
  dinner?: number;     // 円
  image: string;       // サムネイル/一覧
  mainImage?: string;  // 詳細メイン
  likes?: number;
  body1?: string;
  body2?: string;
  body3?: string;
  stations?: string[]; // 駅名（複数想定）
  tags?: string[];     // 特徴タグ等（任意）
};

// ---- Laravel 側の想定 JSON 型 ----
export type LaravelStore = {
  id: number | string;
  slug: string;
  name: string;
  area_label: string;  // -> area
  genre: string;       // -> genre / cooking
  price?: { lunch?: number; dinner?: number };
  images?: { cover_url?: string; thumb_url?: string };
  meta?: { likes?: number; tags?: string[] };
  descriptions?: { body1?: string; body2?: string; body3?: string };
  stations?: string[]; // -> stations
};

// ---- 文字列ユーティリティ（依存を減らすため内蔵）----
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // 結合文字除去
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// ---- 検索メタ ------------------------------------------------
export const genres: string[] = [
  "寿司", "ラーメン", "焼肉", "カレー", "そば", "イタリアン",
  "うなぎ", "カフェ", "お好み焼き", "天ぷら", "とんかつ",
  "ピッツァ", "海鮮・居酒屋", "ヴィーガン", "焼き鳥",
  "ハンバーガー", "スイーツ", "コーヒー",
];

export type BudgetPreset = { label: string; min?: number; max?: number };

export const lunchBudgets: BudgetPreset[] = [
  { label: "~ ¥800", max: 800 },
  { label: "¥800 ~ ¥1,200", min: 800, max: 1200 },
  { label: "¥1,200 ~", min: 1200 },
];

export const dinnerBudgets: BudgetPreset[] = [
  { label: "~ ¥2,500", max: 2500 },
  { label: "¥2,500 ~ ¥4,000", min: 2500, max: 4000 },
  { label: "¥4,000 ~", min: 4000 },
];

export const sortOptions = [
  { key: "popular",   label: "人気順" },
  { key: "new",       label: "新着順" },
  { key: "price-asc", label: "価格の安い順" },
  { key: "price-desc",label: "価格の高い順" },
];

export const featureTags = [
  "個室", "子連れOK", "テラス席", "テイクアウト", "深夜営業", "Wi-Fi/電源",
];

// エリア→駅の対応（正式名: stations / エリア配列: areas）
export const stations: Record<string, string[]> = {
  東京: ["新宿", "渋谷", "池袋", "銀座", "恵比寿"],
  大阪: ["梅田", "なんば", "天王寺", "京橋"],
  名古屋: ["名古屋", "栄", "金山"],
  福岡: ["博多", "天神"],
  札幌: ["札幌", "大通"],
  仙台: ["仙台", "長町"],
  京都: ["京都", "四条"],
  神戸: ["三宮", "元町"],
};

export const areas: string[] = Object.keys(stations);

// まとめオブジェクト（必要に応じて利用）
export const searchMeta = {
  areas,
  genres,
  lunchBudgets,
  dinnerBudgets,
  sortOptions,
  featureTags,
};

// ---- Laravel → Front マッピング --------------------------------
export function mapLaravelStore(s: LaravelStore): Store {
  const g = s.genre;
  return {
    id: String(s.id),
    slug: s.slug,
    name: s.name,
    area: s.area_label,
    genre: g,      // 正式
    cooking: g,    // 互換（移行中用）
    lunch: s.price?.lunch,
    dinner: s.price?.dinner,
    image: s.images?.thumb_url || s.images?.cover_url || "/images/stores/noimage.jpg",
    mainImage: s.images?.cover_url,
    likes: s.meta?.likes,
    body1: s.descriptions?.body1,
    body2: s.descriptions?.body2,
    body3: s.descriptions?.body3,
    stations: s.stations,
    tags: s.meta?.tags,
  };
}

// ---- 18件の Laravel 風モック生成 --------------------------------
const likeFrom = (i: number) => Math.round(40 + (i * 19) % 320);

const mkLaravel = (i: number, area: string): LaravelStore => {
  const st = stations[area] || ["駅前"];
  const station = st[i % st.length];
  const genre = genres[i % genres.length];
  const name = `${genre} ${area}${station}`;
  const dir = `store${String(i).padStart(2, "0")}`;

  return {
    id: i,
    slug: toSlug(name),
    name,
    area_label: `${area}・${station}`,
    genre,
    price: { lunch: 800 + (i % 5) * 100, dinner: 2500 + (i % 6) * 300 },
    images: {
      cover_url: `/images/stores/${dir}/mainImage.jpg`,
      thumb_url: `/images/stores/${dir}/store${((i - 1) % 9) + 1}.jpg`,
    },
    meta: { likes: likeFrom(i), tags: [featureTags[i % featureTags.length]] },
    descriptions: {
      body1: "旬の素材を活かした看板メニューが人気です。",
      body2: "カウンター中心でお一人様歓迎。テイクアウトあり。",
      body3: "WEB/電話予約に対応。混雑時は整理券制。",
    },
    stations: [station],
  };
};

export const laravelStoresMock: LaravelStore[] = [
  ...Array.from({ length: 9 }, (_, idx) => mkLaravel(idx + 1,  areas[idx % areas.length])),
  ...Array.from({ length: 9 }, (_, idx) => mkLaravel(idx + 10, areas[(idx + 2) % areas.length])),
];

// ---- Front 配列に変換 -----------------------------------------
export const allStores: Store = undefined as never; // 型推論のヒント用行（直下で再定義）
export const hotStores: Store = undefined as never;
export const newStores: Store = undefined as never;

// 上のダミー型ヒントを消して実体定義
// （TS が "export順で循環" を誤検出する場合の回避。問題なければまとめて1行でOK）
export const _allStores: Store[] = laravelStoresMock.map(mapLaravelStore);
export const _hotStores: Store[] = _allStores.slice(0, 9);
export const _newStores: Store[] = _allStores.slice(9, 18);

// 実際に使う名前を export（外部からは allStores/hotStores/newStores を参照）
export { _allStores as allStores, _hotStores as hotStores, _newStores as newStores };
