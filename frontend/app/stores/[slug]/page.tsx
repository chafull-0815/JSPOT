// app/stores/[slug]/page.tsx

import {
  StoreCommentsSection,
  StoreGallery,
  StoreMap,
} from "@/components/stores";
import { getAllStores } from "@/lib/data/stores";
import Link from "next/link";
import Script from "next/script";

type Props = {
  params: Promise<{ slug: string }>;
};

// ---------- helpers（型ゆれ吸収） ----------
// Store 詳細で使う「ゆるい型」たち
type StoreLike = {
  introduction?: unknown;
  introduction_text?: unknown;
  station?: unknown;
  stations?: unknown;
  tags?: unknown;
  images?: {
    cover_url?: string | null;
    thumb_url?: string | null;
    gallery_urls?: (string | null | undefined)[];
    [key: string]: unknown; // other_url_1 など
  } | null;
  descriptions?: {
    body1?: unknown;
    body2?: unknown;
    body3?: unknown;
  } | null;
  description?: {
    body1?: unknown;
    body2?: unknown;
    body3?: unknown;
  } | null;
};

type Station = { slug: string; label: string };
type TagShape = { slug?: string; label?: string };
type TagInput = TagShape | string | null | undefined;

// ---------------------- helpers ----------------------

const getIntroduction = (s: StoreLike): string => {
  const val = s.introduction ?? s.introduction_text;
  return val == null ? "" : String(val);
};

const getStations = (s: StoreLike): Station[] => {
  const { station, stations } = s;

  const isStation = (v: unknown): v is Station =>
    !!v &&
    typeof v === "object" &&
    "slug" in v &&
    "label" in v &&
    typeof (v as Station).slug === "string" &&
    typeof (v as Station).label === "string";

  if (Array.isArray(station)) {
    return station.filter(isStation);
  }

  if (isStation(station)) {
    return [station];
  }

  if (Array.isArray(stations)) {
    return stations.filter(isStation);
  }

  return [];
};

const normalizeTag = (x: TagInput): TagShape | null => {
  if (!x) return null;
  if (typeof x === "string") return { label: x };
  return x;
};

const getTags = (s: StoreLike): TagShape[] => {
  const raw = s.tags as TagInput | TagInput[] | undefined;
  if (!raw) return [];

  const arr = Array.isArray(raw) ? raw : [raw];

  return arr.map(normalizeTag).filter((t): t is TagShape => t !== null);
};

const getCoverUrl = (s: StoreLike): string => {
  const images = s.images;
  if (!images) return "/images/no-image.png";

  const url = images.cover_url || images.thumb_url;
  return typeof url === "string" && url.length > 0
    ? url
    : "/images/no-image.png";
};

const getGalleryUrls = (s: StoreLike): string[] => {
  const images = s.images;
  if (!images) return [];

  if (Array.isArray(images.gallery_urls)) {
    return images.gallery_urls.filter(
      (u): u is string => typeof u === "string" && u.length > 0
    );
  }

  // other_url_1, other_url_2 ... 的なキーを拾う
  return Object.keys(images)
    .filter((k) => k.startsWith("other_url_"))
    .map((k) => {
      const v = images[k];
      return typeof v === "string" ? v : null;
    })
    .filter((v): v is string => v !== null && v.length > 0);
};

const getBodies = (s: StoreLike): string[] => {
  const d = s.descriptions ?? s.description ?? null;

  const raw = [d && d.body1, d && d.body2, d && d.body3];

  return raw
    .map((v) => (v == null ? "" : typeof v === "string" ? v : String(v)))
    .filter((v) => v.length > 0);
};

// ---------- page ----------
export default async function StoreDetail({ params }: Props) {
  const { slug } = await params;

  const allStores = await getAllStores();
  const store =
    allStores.find((s) => s.slug === slug) ||
    allStores.find((s) => String(s.id) === slug);

  if (!store) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm text-muted-foreground">
          店舗が見つかりませんでした。
        </p>
        <Link
          href="/stores"
          className="mt-4 inline-block rounded border px-4 py-2"
        >
          一覧へ戻る
        </Link>
      </main>
    );
  }

  const intro = getIntroduction(store);
  const stations = getStations(store);
  const tags = getTags(store);
  const coverUrl = getCoverUrl(store);
  const galleryUrls = getGalleryUrls(store);
  const bodies = getBodies(store);

  // メイン + サブ を1配列に（重複除去）
  const images = Array.from(new Set([coverUrl, ...galleryUrls]));

  // JSON-LD（最低限）
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const absCover = coverUrl.startsWith("http")
    ? coverUrl
    : site
    ? `${site}${coverUrl}`
    : coverUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: store.name,
    servesCuisine: store.cooking?.label,
    areaServed: store.area?.label,
    image: absCover,
    priceRange: store.price?.dinner
      ? `¥${store.price.dinner}`
      : store.price?.lunch
      ? `¥${store.price.lunch}`
      : undefined,
    url: site ? `${site}/stores/${store.slug}` : `/stores/${store.slug}`,
  } as const;

  return (
    <main className="mx-auto max-w-6xl px-1 sm:px-4 pb-16">
      {/* パンくず */}
      <nav className="py-3 text-sm text-muted-foreground">
        <Link href="/">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/stores">店舗一覧</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{store.name}</span>
      </nav>

      {/* タイトル */}
      <section>
        {intro && (
          <p className="mt-2 text-[15px] text-muted-foreground">{intro}</p>
        )}
        <h1 className="text-2xl font-semibold">{store.name}</h1>
      </section>

      {/* 本文 */}
      <section className="mt-6 grid gap-8">
        {/* ギャラリー */}
        <StoreGallery name={store.name} images={images} initialIndex={0} />

        {/* 基本情報 */}
        <section aria-labelledby="basic-info" className="mt-5">
          {/* ヘッダー（borderの外） */}
          <div className="flex items-center mb-4">
            <h2 id="basic-info" className="text-xl font-semibold mr-6">
              基本情報
            </h2>

            <div className="inline-flex items-center gap-1 rounded-full border bg-muted px-3 py-1 text-xs">
              <span aria-hidden>❤️</span>
              <span className="tabular-nums">{store.like ?? 0}</span>
            </div>
          </div>

          {/* 中身（borderの中） */}
          <div className="mt-2 rounded-2xl border bg-white/60 p-4 shadow-sm">
            <dl className="grid grid-cols-1 gap-x-10 gap-y-3 text-[15px] text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-5 rounded-lg bg-muted/40 px-0 sm:px-3 py-1 sm:py-2">
                <dt className="shrink-0 text-foreground">🗺️ エリア</dt>
                <dd className="text-left">{store.area?.label ?? "-"}</dd>
              </div>

              <div className="flex items-center gap-5 rounded-lg bg-muted/40 px-0 sm:px-3 py-1 sm:py-2">
                <dt className="shrink-0 text-foreground">🚉 最寄り駅</dt>
                <dd className="text-left">
                  {stations.length
                    ? stations.map((st) => st.label).join(" / ")
                    : "-"}
                </dd>
              </div>

              <div className="flex items-center gap-5 rounded-lg bg-muted/40 px-0 sm:px-3 py-1 sm:py-2">
                <dt className="shrink-0 text-foreground">🍽️ ジャンル</dt>
                <dd className="text-left">{store.cooking?.label ?? "-"}</dd>
              </div>

              <div className="flex items-center gap-5 rounded-lg bg-muted/40 px-0 sm:px-3 py-1 sm:py-2">
                <dt className="shrink-0 text-foreground">☀️ 予算(昼)</dt>
                <dd className="text-left">
                  {store.price?.lunch != null
                    ? `¥${store.price.lunch.toLocaleString()}`
                    : "-"}
                </dd>
              </div>

              <div className="flex items-center gap-5 rounded-lg bg-muted/40 px-0 sm:px-3 py-1 sm:py-2">
                <dt className="shrink-0 text-foreground">🌙 予算(夜)</dt>
                <dd className="text-left">
                  {store.price?.dinner != null
                    ? `¥${store.price.dinner.toLocaleString()}`
                    : "-"}
                </dd>
              </div>
            </dl>

            {/* タグ（borderの中でOK） */}
            {tags.length > 0 && (
              <div className="mt-4 border-t pt-6">
                <h3 className="mb-4 text-base font-semibold text-foreground">
                  おすすめ
                </h3>

                <div className="flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span
                      key={i}
                      className="
                        rounded-full border bg-white px-3 py-1 text-xs text-foreground
                        shadow-sm transition hover:-translate-y-0.5 hover:bg-muted
                      "
                    >
                      {t.label ?? t.slug}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 説明 */}
        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">店舗説明</h2>

          {bodies.length > 0 ? (
            bodies.map((text, i) => (
              <section
                key={i}
                className="mt-5 rounded-2xl border bg-white/60 p-4 shadow-sm"
              >
                <h3 className="mb-2 text-base font-semibold">
                  アピールポイント その{i + 1}
                </h3>
                <p
                  key={i}
                  className="whitespace-pre-wrap text-[15px] leading-7 text-muted-foreground"
                >
                  {text}
                </p>
              </section>
            ))
          ) : (
            <p className="text-[15px] leading-7 text-muted-foreground">
              ここに店舗概要。Laravel 連携時はAPIの詳細に差し替え。
            </p>
          )}
        </section>

        {/* Map */}
        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Map</h2>
          <aside className="border">
            <StoreMap
              lat={store.lat}
              lng={store.lng}
              label={store.name}
              height="300px"
              addres={store.address}
            />
          </aside>
        </section>

        <StoreCommentsSection storeSlug={store.slug} />
      </section>

      {/* JSON-LD */}
      <Script
        id="ld-json-store"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
