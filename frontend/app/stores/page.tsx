// app/(searchbar)/stores/page.tsx
export const dynamic = "force-dynamic";

import { StoreSearchBar } from "@/components/stores";
import { StoreList } from "@/components/stores/archive/StoreList";
import Link from "next/link";
type SearchParams = Record<string, string | string[] | undefined>;
const PAGE_SIZE = 12;

import { getSearchMeta } from "@/lib/data/search";
import { getAllStores } from "@/lib/data/stores";
import type { Store } from "@/lib/fixtures/stores.fixture";

const toStr = (v: unknown) =>
  typeof v === "string" ? v : Array.isArray(v) ? v[0] ?? "" : "";
const toNum = (v: unknown) => {
  const s = toStr(v);
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
};

export default async function StoresPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // ✅ Nextのsync dynamic api対策：必ず unwrap
  const sp = await searchParams;

  const ALL: Store[] = await getAllStores();
  const meta = await getSearchMeta();

  // ---- クエリ取得（slugベース正）----
  const q = toStr(sp.q).trim().toLowerCase();
  const area = toStr(sp.area).trim();
  const station = toStr(sp.station).trim();

  // cooking は正( cooking ) + 旧互換( genre / category )
  const cookingQuery =
    toStr(sp.cooking).trim() ||
    toStr(sp.genre).trim() ||
    toStr(sp.category).trim();

  // tag は今UIにないが互換で受ける
  const tagQuery = toStr(sp.tag).trim();

  // 予算（新：labelプリセット）
  const lunchLabel = toStr(sp.lunch).trim(); // 例: "〜 ¥800"
  const dinnerLabel = toStr(sp.dinner).trim();

  // 予算（旧：min/max + budget上限）
  const lunchMin = toNum(sp.lunch_min);
  const lunchMax = toNum(sp.lunch_max);
  const dinnerMin = toNum(sp.dinner_min);
  const dinnerMax = toNum(sp.dinner_max);
  const budgetMax = toNum(sp.budget);

  // sort（今UIにないけど互換で）
  const sortKey = toStr(sp.sort).trim() || "popular";

  // page
  const page = Math.max(1, parseInt(toStr(sp.page) || "1", 10));

  // ---- helpers ----
  const findPreset = (
    label: string,
    presets: { label: string; min?: number; max?: number }[]
  ) => presets.find((p) => p.label === label);

  const inPresetRange = (
    price: number | undefined,
    preset?: { min?: number; max?: number }
  ) => {
    if (!preset) return true;
    if (typeof price !== "number") return false;
    if (preset.min != null && price < preset.min) return false;
    if (preset.max != null && price > preset.max) return false;
    return true;
  };

  const inRangeOld = (
    price: number | undefined,
    min?: number,
    max?: number
  ) => {
    if (min == null && max == null) return true;
    if (typeof price !== "number") return false;
    if (min != null && price < min) return false;
    if (max != null && price > max) return false;
    return true;
  };

  // ---- 絞り込み ----
  const hasFilters =
    !!q ||
    !!area ||
    !!station ||
    !!cookingQuery ||
    !!tagQuery ||
    !!lunchLabel ||
    !!dinnerLabel ||
    lunchMin != null ||
    lunchMax != null ||
    dinnerMin != null ||
    dinnerMax != null ||
    budgetMax != null;

  const filtered: Store[] = hasFilters
    ? ALL.filter((s) => {
        // q（テキスト検索）
        if (q) {
          const haystack = [
            s.name,
            s.area?.label,
            s.cooking?.label,
            ...(s.station ?? []).map((st) => st.label),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }

        // taxonomy（slug比較）
        if (area && s.area?.slug !== area) return false;

        if (station) {
          const ok = (s.station ?? []).some((st) => st.slug === station);
          if (!ok) return false;
        }

        if (cookingQuery && s.cooking?.slug !== cookingQuery) return false;

        // tag（互換）
        if (tagQuery) {
          const ok = (s.tags ?? []).some(
            (t: string | { slug?: string; label?: string }) =>
              typeof t === "string"
                ? t === tagQuery
                : t?.slug === tagQuery || t?.label === tagQuery
          );
          if (!ok) return false;
        }

        // budget（新：labelプリセット）
        if (lunchLabel) {
          const preset = findPreset(lunchLabel, meta.lunchBudgets);
          if (!inPresetRange(s.price?.lunch, preset)) return false;
        }
        if (dinnerLabel) {
          const preset = findPreset(dinnerLabel, meta.dinnerBudgets);
          if (!inPresetRange(s.price?.dinner, preset)) return false;
        }

        // budget（旧：min/max）
        if (!inRangeOld(s.price?.lunch, lunchMin, lunchMax)) return false;
        if (!inRangeOld(s.price?.dinner, dinnerMin, dinnerMax)) return false;

        // budget（旧：上限1本）
        if (budgetMax != null) {
          const lp = s.price?.lunch ?? Infinity;
          const dp = s.price?.dinner ?? Infinity;
          if (lp > budgetMax && dp > budgetMax) return false;
        }

        return true;
      })
    : ALL;

  // ---- 並び替え ----
  switch (sortKey) {
    case "price-asc":
      filtered.sort(
        (a, b) =>
          (a.price?.dinner ?? a.price?.lunch ?? Infinity) -
          (b.price?.dinner ?? b.price?.lunch ?? Infinity)
      );
      break;
    case "price-desc":
      filtered.sort(
        (a, b) =>
          (b.price?.dinner ?? b.price?.lunch ?? -Infinity) -
          (a.price?.dinner ?? a.price?.lunch ?? -Infinity)
      );
      break;
    case "new":
      // created_at が無い間は like を代用
      filtered.sort((a, b) => (b.like ?? 0) - (a.like ?? 0));
      break;
    case "popular":
    default:
      filtered.sort((a, b) => (b.like ?? 0) - (a.like ?? 0));
  }

  // ---- ページネーション ----
  const total = filtered.length;
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, lastPage);
  const offset = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(offset, offset + PAGE_SIZE);

  return (
    <>
      {/* 検索バー */}
      <div className="mb-6">
        <StoreSearchBar meta={meta} />
      </div>

      {/* ヘッダー */}
      <h1 className="mb-4 text-xl font-semibold">店舗一覧</h1>

      <div className="mb-2 text-xs text-gray-500">
        ALL: {ALL.length} / filtered: {filtered.length}
      </div>

      {/* 店舗リスト */}
      <StoreList stores={pageItems} />

      {/* ページネーション */}
      <Pagination page={safePage} lastPage={lastPage} params={sp} />
    </>
  );
}

// ---- クエリを保ったまま page だけ変える ----
function Pagination({
  page,
  lastPage,
  params,
}: {
  page: number;
  lastPage: number;
  params: SearchParams;
}) {
  if (lastPage <= 1) return null;

  const makeHref = (p: number) => {
    const usp = new URLSearchParams();
    const pick = (k: keyof SearchParams) => {
      const v = params[k];
      const s = Array.isArray(v) ? v[0] : v;
      if (s) usp.set(String(k), String(s));
    };

    (
      [
        "q",
        "area",
        "station",
        "cooking",
        "genre",
        "category",
        "tag",
        "lunch",
        "dinner",
        "lunch_min",
        "lunch_max",
        "dinner_min",
        "dinner_max",
        "budget",
        "sort",
      ] as const
    ).forEach(pick);

    usp.set("page", String(p));
    return `?${usp.toString()}`;
  };

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1).slice(
    Math.max(0, page - 3),
    Math.max(5, page + 2)
  );

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="ページネーション"
    >
      <Link
        href={makeHref(Math.max(1, page - 1))}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
        prefetch={false}
      >
        前へ
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={makeHref(p)}
          prefetch={false}
          aria-current={p === page ? "page" : undefined}
          className={`rounded-lg border px-3 py-2 text-sm ${
            p === page ? "bg-black text-white" : "hover:bg-muted"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={makeHref(Math.min(lastPage, page + 1))}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
        prefetch={false}
      >
        次へ
      </Link>
    </nav>
  );
}
