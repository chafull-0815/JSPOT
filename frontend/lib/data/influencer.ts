// lib/data/influencer.ts

export type SocialLinks = {
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  facebook?: string;
};

export type Influencer = {
  id: string;
  name: string;
  username: string;
  bio: string;
  followers: number;
  engagement: number;
  category: string;
  avatar: string;
  socials: SocialLinks;
};
