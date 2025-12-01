// lib/mock.ts
export type Article = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
};

export const categories = ["最新", "特集", "ビジネス", "カルチャー", "テック", "ライフ"];

export const featured: Article[] = [
  {
    id: "a1",
    title: "アジアの街角、ローカル朝市の熱気を歩く",
    excerpt: "夜明け前から始まる生活のリズム。食と人が交差する朝の一時間を追った。",
    image: "/images/feat1.jpg",
    category: "特集",
    date: "2025-10-01",
    author: "編集部",
  },
  {
    id: "a2",
    title: "B級グルメ最前線：屋台のイノベーション",
    excerpt: "キャッシュレス対応、行列制御…進化する屋台の裏側。",
    image: "/images/feat2.jpg",
    category: "カルチャー",
    date: "2025-10-03",
    author: "編集部",
  },
  {
    id: "a3",
    title: "ナイトマーケット経済圏のリアル",
    excerpt: "観光だけではない、地域雇用と小さな起業を支える仕組み。",
    image: "/images/feat3.jpg",
    category: "ビジネス",
    date: "2025-10-10",
    author: "編集部",
  },
];

export const latest: Article[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `l${i}`,
  title: `ローカル線に揺られて ${i + 1}`,
  excerpt: "小さな駅に降りると、そこから物語が始まる。",
  image: `/images/card${(i % 6) + 1}.jpg`,
  category: categories[(i % (categories.length - 1)) + 1],
  date: "2025-10-20",
  author: "JSPOT",
}));

export const ranking: Article[] = [
  { id: "r1", title: "ディープ路地裏マップ", excerpt: "", image: "/images/card1.jpg", category: "特集", date: "", author: "" },
  { id: "r2", title: "ローカル鉄道 完全ガイド", excerpt: "", image: "/images/card2.jpg", category: "テック", date: "", author: "" },
  { id: "r3", title: "市場で朝ごはん", excerpt: "", image: "/images/card3.jpg", category: "ライフ", date: "", author: "" },
  { id: "r4", title: "カフェ文化の現在地", excerpt: "", image: "/images/card4.jpg", category: "カルチャー", date: "", author: "" },
  { id: "r5", title: "アジア屋台最強メニュー", excerpt: "", image: "/images/card5.jpg", category: "カルチャー", date: "", author: "" },
];
