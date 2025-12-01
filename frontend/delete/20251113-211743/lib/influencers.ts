// lib/influencers.ts
export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

export type Influencer = {
  id: string;
  name_en: string;         // 英語名キー
  display_name?: string;
  avatar: string;          // /images/influencer/inf-*.jpg を想定
  bio?: string;
  socials: SocialLinks;
};

// 画像ファイル規約
export const AVATAR_DIR = "/images/influencers";
export const FALLBACK_AVATAR = "/images/influencers/no-man-image.png";


// ★ いまはダミー（後でここを Laravel fetch に置換）
export async function getInfluencers(): Promise<Influencer[]> {
  const base: Omit<Influencer, "id" | "name_en" | "avatar" | "bio" | "socials"> = {
    display_name: undefined,
  };

  const rows: Omit<Influencer, "id">[] = [
    {
      name_en: "john-doe",
      display_name: "John Doe",
      avatar: "/images/influencers/inf-1.jpg",
      bio: "Food & travel YouTuber based in Tokyo.",
      socials: {
        facebook: "https://facebook.com/johndoe",
        instagram: "https://instagram.com/johndoe",
        youtube: "https://youtube.com/@johndoe",
        tiktok: "https://www.tiktok.com/@johndoe",
      },
    },
    {
      name_en: "emma-smith",
      display_name: "Emma Smith",
      avatar: "/images/influencers/inf-2.jpg",
      bio: "Coffee & brunch spots curator.",
      socials: { instagram: "https://instagram.com/emma" },
    },
    {
      name_en: "li-wei",
      display_name: "Li Wei",
      avatar: "/images/influencers/inf-3.jpg", // 外部URLでもOK
      bio: "Street food explorer.",
      socials: { youtube: "https://youtube.com/@liwei" },
    },
    {
      name_en: "sofia-garcia",
      display_name: "Sofia Garcia",
      avatar: "/images/influencers/inf-4.jpg",
      bio: "Dessert hunter & café lover.",
      socials: { tiktok: "https://www.tiktok.com/@sofia" },
    },
    {
      name_en: "adam-brown",
      display_name: "Adam Brown",
      avatar: "/images/influencers/inf-5.jpg",
      bio: "Hidden gems reporter.",
      socials: {},
    },
    {
      name_en: "mia-tan",
      display_name: "Mia Tan",
      avatar: "/images/influencers/inf-6.jpg",
      bio: "Vegan eats & coffee.",
      socials: { instagram: "https://instagram.com/miatan" },
    },
    {
      name_en: "noah-kim",
      display_name: "Noah Kim",
      avatar: "/images/influencers/inf-7.jpg",
      bio: "Late-night noodles.",
      socials: { youtube: "https://youtube.com/@noahkim" },
    },
    {
      name_en: "olivia-chan",
      display_name: "Olivia Chan",
      avatar: "/images/influencers/inf-8.jpg",
      bio: "Bakeries & sweets.",
      socials: { facebook: "https://facebook.com/olivia" },
    },
  ];
  
  return rows.map((r, i) => ({
    id: String(i + 1),
    name_en: r.name_en,
    display_name: r.display_name,
    avatar: r.avatar || FALLBACK_AVATAR,
    bio: r.bio,
    socials: r.socials,
    ...base,
  }));
}

