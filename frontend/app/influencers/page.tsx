// app/influencers/page.tsx

import InfluencerCard from "@/components/influencers/InfluencerCard";
import type { Influencer } from "@/lib/data/influencer";
import { infuluencersFixture } from "@/lib/fixtures/influencers.fixture";

// 必要ならここに metadata も書ける
// export const metadata = { title: "Influencers | J SPOT" };

export default async function InfluencersPage() {
  // ★ fixture から直接データ取得（Server Component なので async OK）
  const influencers: Influencer[] = infuluencersFixture;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Influencers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          登録インフルエンサーの一覧
        </p>
      </header>

      {influencers.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          まだインフルエンサーが登録されていません。
        </p>
      ) : (
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {influencers.map((inf) => (
            <InfluencerCard key={inf.id} data={inf} />
          ))}
        </section>
      )}
    </main>
  );
}
