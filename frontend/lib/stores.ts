// lib/stores.ts
export type Store = {
  id: string;
  name: string;
  area: string;       // 例: "東京" / "大阪"
  category: string;   // 例: "焼肉" / "寿司"
  catch: string;
  image: string;      // /images/store*.jpg
  likes_count: number;
};

export const regions = ["東京", "大阪", "名古屋", "福岡", "札幌", "仙台", "京都", "神戸"];

const mk = (i: number, area = "東京"): Store => ({
  id: `s${i}`,
  name: `テスト店 ${i}`,
  area,
  category: ["焼肉","寿司","カフェ","中華","和食"][i%5],
  catch: "地域密着・丁寧施工（ダミー）",
  image: `/images/store${((i-1)%9)+1}.jpg`,
  likes_count: Math.floor(10 + Math.random()*300),
});

export const hotStores: Store[]  = Array.from({length: 9}, (_,i)=> mk(i+1, regions[i%regions.length]));
export const newStores: Store[]  = Array.from({length: 9}, (_,i)=> mk(i+10, regions[(i+2)%regions.length]));

export const heroSlides = [
  { id: "h1", title: "今月の注目店", caption: "編集部おすすめの名店", image: "/images/hero1.jpg" },
  { id: "h2", title: "食べ歩き特集", caption: "屋台・市場・路地裏", image: "/images/hero2.jpg" },
  { id: "h3", title: "深夜営業まとめ", caption: "夜更かしの味方", image: "/images/hero3.jpg" },
];
