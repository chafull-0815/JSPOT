// app/page.tsx
import Link from "next/link";

import { AreaLinks, MainHeroSlider } from "@/components/home";
import { StoreCard, StoreSearchBar, tagHot, tagNew } from "@/components/stores";

import { getSearchMeta } from "@/lib/data/search";
import { getAllStores } from "@/lib/data/stores";
import type { Store } from "@/lib/fixtures/stores.fixture";
import { Suspense } from "react";

export default async function Page() {
  const all = await getAllStores();
  const hot = all.filter(tagHot).slice(0, 9);
  const news = all.filter(tagNew).slice(0, 9);

  const meta = await getSearchMeta();

  // ★ スライドはトップ直書き（方針どおり）
  const heroSlides = [
    {
      src: "/images/heros/hero1.jpg",
      title: "北陸のうまい店、ぜんぶ。",
      subtitle: "気分で探せるグルメ検索",
    },
    {
      src: "/images/heros/hero2.jpg",
      title: "今日の一杯、どこ行く？",
      subtitle: "人気店も新着もサクッとチェック",
    },
  ];

  return (
    <main className="pb-16">
      <MainHeroSlider slides={heroSlides} />

      <Suspense fallback={null}>
        <StoreSearchBar meta={meta} />
      </Suspense>

      <AreaLinks></AreaLinks>

      <SectionRow title="最近HOTなお店" items={hot} />
      <SectionRow title="新着のお店" items={news} />
    </main>
  );
}

function SectionRow({ title, items }: { title: string; items: Store[] }) {
  return (
    <section className="mx-auto mt-10 max-w-6xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link
          className="text-sm text-mut  ed-foreground hover:underline"
          href=""
        >
          すべて見る
        </Link>
      </div>

      {/* SP: 横スクロール */}
      <div className="block md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
          {items.map((s) => (
            <div key={s.id} className="w-[280px] snap-start">
              <StoreCard
                key={s.id}
                href={`/stores/${s.slug}`}
                name={s.name ?? ""}
                area={s.area?.label ?? ""} // ✅ ここ
                category={s.cooking?.label ?? ""} // ✅ ここ
                lunch={s.price?.lunch ?? null}
                dinner={s.price?.dinner ?? null}
                src={s.images.cover_url}
                likes={s.like}
              />
            </div>
          ))}
        </div>
      </div>

      {/* PC: 4列グリッド */}
      <div className="hidden grid-cols-4 gap-6 md:grid xl:gap-7">
        {items.map((s) => (
          <StoreCard
            key={s.id}
            href={`/stores/${s.slug}`}
            name={s.name ?? ""}
            area={s.area?.label ?? ""} // ✅ ここ
            category={s.cooking?.label ?? ""} // ✅ ここ
            lunch={s.price?.lunch ?? null}
            dinner={s.price?.dinner ?? null}
            src={s.images.cover_url}
            likes={s.like}
          />
        ))}
      </div>
    </section>
  );
}
