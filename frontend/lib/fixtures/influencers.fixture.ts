// /Users/shogo/Desktop/JSPOT/frontend/delete/20251113-211743/lib/delete/mock/influencers.mock.ts
import { Influencer } from "@/lib/data/influencer";

export const infuluencersFixture: Influencer[] = [
  {
    id: "1",
    name: "Influencer 1",
    username: "@influencer1",
    bio: "Digital creator and content maker",
    followers: 150000,
    engagement: 4.5,
    category: "lifestyle",
    avatar: "/images/influencers/inf-1.jpg",
    socials: {
      instagram: "https://instagram.com/influencer1",
      twitter: "https://twitter.com/influencer1",
      tiktok: "https://tiktok.com/@influencer1",
    },
  },
  {
    id: "2",
    name: "Influencer 2",
    username: "@influencer2",
    bio: "Tech and gadget enthusiast",
    followers: 280000,
    engagement: 5.2,
    category: "technology",
    avatar: "",
    socials: {
      instagram: "https://instagram.com/influencer2",
      twitter: "https://twitter.com/influencer2",
      youtube: "https://youtube.com/@influencer2",
    },
  },
  {
    id: "3",
    name: "Influencer 3",
    username: "@influencer3",
    bio: "Fashion and beauty blogger",
    followers: 320000,
    engagement: 6.1,
    category: "fashion",
    avatar: "https://via.placeholder.com/150",
    socials: {
      instagram: "https://instagram.com/influencer3",
      tiktok: "https://tiktok.com/@influencer3",
    },
  },
];
