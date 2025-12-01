// components/storeCard/predicate.ts
import type { Store, Tag } from "@/lib/fixtures/stores.fixture";
import type { BudgetPreset } from "@/lib/fixtures/search.fixture";

/* =========================
 * tags（fixturesが string[] でも Tag[] でも動く互換）
 * ========================= */
const isTagObj = (t: any): t is Tag =>
  t && typeof t === "object" && "slug" in t && "label" in t;

export const hasTag = (store: Store, slugOrLabel: string) =>
  (store.tags ?? []).some((t: any) => {
    if (typeof t === "string") return t === slugOrLabel;
    if (isTagObj(t)) return t.slug === slugOrLabel || t.label === slugOrLabel;
    return false;
  });

export const tagHot = (store: Store) =>
  hasTag(store, "hot") || hasTag(store, "HOT");

export const tagNew = (store: Store) =>
  hasTag(store, "new") || hasTag(store, "NEW");

/* =========================
 * taxonomy（slugで比較）
 * ========================= */
export const taxonomyArea = (store: Store, areaSlug: string) =>
  !areaSlug || store.area?.slug === areaSlug;

export const taxonomyCooking = (store: Store, cookingSlug: string) =>
  !cookingSlug || store.cooking?.slug === cookingSlug;

export const taxonomyStation = (store: Store, stationSlug: string) =>
  !stationSlug ||
  (store.station ?? []).some((st) => st.slug === stationSlug);

/* =========================
 * budget（labelプリセットで比較）
 * URLは label を載せる設計なので一致でOK
 * ========================= */
const findPreset = (label: string, presets: BudgetPreset[]) =>
  presets.find((p) => p.label === label);

const inRange = (price: number, preset: BudgetPreset) => {
  if (preset.min != null && price < preset.min) return false;
  if (preset.max != null && price > preset.max) return false;
  return true;
};

export const budgetLunch = (
  store: Store,
  label: string,
  presets: BudgetPreset[]
) => {
  if (!label) return true;
  const preset = findPreset(label, presets);
  if (!preset) return true;

  const price = store.price?.lunch;
  if (typeof price !== "number") return false;
  return inRange(price, preset);
};

export const budgetDinner = (
  store: Store,
  label: string,
  presets: BudgetPreset[]
) => {
  if (!label) return true;
  const preset = findPreset(label, presets);
  if (!preset) return true;

  const price = store.price?.dinner;
  if (typeof price !== "number") return false;
  return inRange(price, preset);
};
