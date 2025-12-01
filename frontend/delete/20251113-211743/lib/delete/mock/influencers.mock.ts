import type { Influencer } from "@/lib/types";

export const FALLBACK_AVATAR = "/images/no-man-image.png";
export const AVATAR_DIR = "/images/influencer";

export const influencersMock: Influencer[] = [
  { id: "1", name_en: "john-doe",     display_name: "John Doe",     avatar: `${AVATAR_DIR}/inf-1.jpg`, bio: "Food & travel YouTuber based in Tokyo.", socials: { facebook:"https://facebook.com/johndoe", instagram:"https://instagram.com/johndoe", youtube:"https://youtube.com/@johndoe", tiktok:"https://www.tiktok.com/@johndoe" } },
  { id: "2", name_en: "emma-smith",   display_name: "Emma Smith",   avatar: `${AVATAR_DIR}/inf-2.jpg`, bio: "Coffee & brunch spots curator.", socials: { instagram:"https://instagram.com/emma" } },
  { id: "3", name_en: "li-wei",       display_name: "Li Wei",       avatar: `${AVATAR_DIR}/inf-3.jpg`, bio: "Street food explorer.", socials: { youtube:"https://youtube.com/@liwei" } },
  { id: "4", name_en: "sofia-garcia", display_name: "Sofia Garcia", avatar: `${AVATAR_DIR}/inf-4.jpg`, bio: "Dessert hunter & café lover.", socials: { tiktok:"https://www.tiktok.com/@sofia" } },
];
