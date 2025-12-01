// lib/search/meta.ts
// 検索メタの単一窓口（将来 Laravel のメタAPIに切替える場合も、このファイルだけ差し替え）

export {
  // 正式名（UI/URL はこちらを使用）
  areas,
  stations,
  genres,
  lunchBudgets,
  dinnerBudgets,
  sortOptions,
  featureTags,
  searchMeta as defaultSearchMeta,
} from "@/lib/delete/mock/stores.mock";

// ※ 旧名（regions 等）は提供しません。使わない方針のため export もしない。
