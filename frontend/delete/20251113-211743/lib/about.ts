// lib/about.ts
export type Feature = { title: string; desc: string };
export type Stat = { label: string; value: string };

export type AboutMeta = {
  siteName: string;
  tagline: string;
  mission: string;
  story: string;
  features: Feature[];
  stats: Stat[];
  heroImage?: string; // 例: /images/about/hero.jpg
};

export function getAboutMeta(): AboutMeta {
  return {
    siteName: "Gourmet Guide",
    tagline: "おいしいを、もっと近くに。",
    mission: "地域の名店とユーザーをやさしくつなぐ、シンプルなレストラン発見体験を提供します。",
    story:
      "私たちは“見た目がキレイで、探しやすく、確かな情報”にこだわります。写真は雰囲気が伝わること、検索は迷わないこと、そして運営のおすすめや特集で偶然の出会いがあること。地元の人にも、旅行者にも、楽しく使ってもらえるガイドを目指しています。",
    features: [
      { title: "シンプル設計", desc: "流し読みでも迷わないUI。必要な情報だけキレイに配置。" },
      { title: "やさしい検索", desc: "エリア・ジャンル・昼/夜の料金・最寄り駅で直感的に絞り込み。" },
      { title: "信頼できる写真", desc: "アイキャッチは mainImage、サブは丁寧に整理して掲載。" },
      { title: "特集＆編集部推薦", desc: "月替りの特集で“いま行きたい”を提案。" },
    ],
    stats: [
      { label: "掲載エリア", value: "8都市" },
      { label: "掲載店舗", value: "1,800+" },
      { label: "月間ユーザー", value: "120K+" },
      { label: "レビュー承認率", value: "98%" },
    ],
    heroImage: "/images/about/hero.jpg",
  };
}
