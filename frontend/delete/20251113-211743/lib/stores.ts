// lib/stores.ts

import { toSlug } from "@/lib/slug";

// 例: エリアごとの代表駅（ダミー）
export const AREA_STATIONS: Record<string, string[]> = {
  東京: ["東京", "新宿", "渋谷", "池袋", "品川"],
  大阪: ["梅田", "なんば", "天王寺", "京橋"],
  名古屋: ["名古屋", "栄", "金山"],
  福岡: ["博多", "天神"],
  札幌: ["札幌", "大通"],
  仙台: ["仙台", "長町"],
  京都: ["京都", "四条"],
  神戸: ["三宮", "元町"],
};

export type Store = {
  id: string;
  name: string;
  slug: string;
  area: string;
  station: string;           // ← 追加
  cooking: string;
  likes: number;
  lunch?: number | null;
  dinner?: number | null;
  mainImage: string;
  image: string;
};

// AREA_STATIONSのキーからエリアリストを生成（単一の情報源として使用）
export const area = Object.keys(AREA_STATIONS);

const mk = (i: number, area = "東京"): Store => {
  const name = `テスト店-${i}`;
  const base = toSlug(name);
  // slugが空の場合はフォールバックとしてidベースのslugを使用
  const slug = base || `s${i}`;
  const dir = name;
  // ダミーの駅をエリアから拝借
  const candidates = AREA_STATIONS[area] ?? [area];
  const station = candidates[i % candidates.length];

  return {
    id: `s${i}`,
    name,
    slug,
    area,
    station,
    cooking: ["焼肉", "寿司", "カフェ", "中華", "和食"][i % 5],
    likes: Math.floor(10 + Math.random() * 300),
    lunch: 800,
    dinner: 2500,
    mainImage: `/images/stores/${dir}/mainImage.jpg`, 
    image: `/images/stores/${dir}/store${((i - 1) % 9) + 1}.jpg`,
  };
};

export const hotStores: Store[]  = Array.from({ length: 9 }, (_, i) => mk(i + 1,  area[i % area.length]));
export const newStores: Store[]  = Array.from({ length: 9 }, (_, i) => mk(i + 10, area[(i + 2) % area.length]));

export const heroSlides = [
  { id: "h1", title: "今月の注目店", caption: "編集部おすすめの名店", image: "/images/hero1.jpg" },
  { id: "h2", title: "食べ歩き特集", caption: "屋台・市場・路地裏", image: "/images/hero2.jpg" },
  { id: "h3", title: "深夜営業まとめ", caption: "夜更かしの味方", image: "/images/hero3.jpg" },
];
