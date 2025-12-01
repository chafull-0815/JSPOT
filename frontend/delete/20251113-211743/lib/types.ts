
export type Store = {
  id: string;
  slug: string;
  name: string;
  area: string;
  station: string;
  cooking: string;
  likes: number;
  lunch?: number | null;
  dinner?: number | null;
  mainImage: string; // アイキャッチ
  image: string;     // サブ画像のベース（/store1..6.jpg を組み立て用に使う想定もOK）
};

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

export type Influencer = {
  id: string;
  name_en: string;
  display_name?: string;
  avatar: string;
  bio?: string;
  socials: SocialLinks;
};
