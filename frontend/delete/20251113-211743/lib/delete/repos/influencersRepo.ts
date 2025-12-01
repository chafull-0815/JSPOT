import type { Influencer } from "@/lib/types";
import { influencersMock } from "@/lib/delete/mock/influencers.mock";

export async function fetchInfluencers(): Promise<Influencer[]> {
  // TODO: Laravel API に差し替え
  return influencersMock;
}
