
export const APP = {
  routes: {
    stores: "/stores",
  },
  image: {
    // フォールバック画像の単一情報源
    fallback: "/images/stores/no-image.png",
  },
  search: {
    pageSize: 12,
    defaults: {
      area: "",
      genre: "",
      station: "",
      target: "dinner" as "lunch" | "dinner",
      presetIndex: 0,
    },
    placeholders: {
      area: "エリア",
      genre: "ジャンル",
      station: "最寄り駅",
    },
  },
} as const;
