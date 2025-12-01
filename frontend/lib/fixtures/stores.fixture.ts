// lib/fixtures/stores.fixture.ts
// 開発用モック（本番では Laravel から取得する想定）
//
// ✅ Front内部の最終Store型をここで確定
// - taxonomy は {slug,label}
// - station は複数許容で Taxonomy[]
// - tags も理想形の Tag[]
// - images は cover_url + gallery_urls の配列で柔軟に
//   （Laravel返却が別形でも lib/data でここに正規化する）

/** taxonomy */
export type Taxonomy = {
  slug: string;
  label: string;
};

/** feature tag */
export type Tag = {
  slug: string;
  label: string;
};

export type Store = {
  id: number | string;
  slug: string;
  name: string;
  introduction: string;

  // address
  address: string;
  address_ja: string;

  // taxonomy
  area: Taxonomy;
  cooking: Taxonomy;
  station: Taxonomy[]; // ✅ 複数駅

  // meta
  tags: Tag[]; // ✅ 理想形
  like: number;

  price: {
    lunch?: number;
    dinner?: number;
  };

  // 座標
  lat: number; // y
  lng: number; // x

  images: {
    cover_url: string; // ✅ mainImage.jpg
    gallery_urls: string[]; // ✅ store1.jpg〜存在分だけ
  };

  descriptions: {
    body1?: string;
    body2?: string;
    body3?: string;
  };
};

// Laravel の返却形も同じ想定で一旦OK（変わったら lib/data 側で吸収）
export type LaravelStore = Store;

// Laravel→Front 変換（Laravel形が変わったらここで吸収）
export function mapLaravelStore(s: LaravelStore): Store {
  return s;
}

/** --------------------------------
 * 画像URLの組み立て helper
 * slug が public/images/stores/<slug>/ のフォルダ名になる前提
 * galleryCount は店舗ごとに変えられる
 * -------------------------------- */
export const buildImages = (
  slug: string,
  galleryCount = 9
): Store["images"] => ({
  cover_url: `/images/stores/${slug}/mainImage.jpg`,
  gallery_urls: Array.from(
    { length: galleryCount },
    (_, i) => `/images/stores/${slug}/store${i + 1}.jpg`
  ),
});

/** --------------------------------
 * stores mock
 * ※ここに18店舗分を同じ形で追加していけばOK
 * -------------------------------- */
// ---- ダミー18件（座標入り） ----
const L: Store[] = [
  {
    id: 1,
    slug: "test-1",
    name: "テスト店-1",
    introduction: "テスト1のお店です",

    address: "1-1-1 Shinjuku, Shinjuku-ku, Tokyo",
    address_ja: "東京都新宿区新宿1-1-1",

    area: { slug: "tokyo", label: "東京" },
    cooking: { slug: "sushi", label: "寿司" },
    station: [{ slug: "shinjuku", label: "新宿" }],
    tags: [
      { slug: "hot", label: "HOT" },
      { slug: "new", label: "NEW" },
    ],
    like: 210,
    price: { lunch: 1200, dinner: 4000 },
    lat: 35.6895,
    lng: 139.7006,
    images: {
      cover_url: "/images/stores/テスト店-1/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-1/store1.jpg",
        "/images/stores/テスト店-1/store2.jpg",
        "/images/stores/テスト店-1/store3.jpg",
        "/images/stores/テスト店-1/store4.jpg",
        "/images/stores/テスト店-1/store5.jpg",
        "/images/stores/テスト店-1/store6.jpg",
        "/images/stores/テスト店-1/store7.jpg",
        "/images/stores/テスト店-1/store8.jpg",
        "/images/stores/テスト店-1/store9.jpg",
      ],
    },
    descriptions: { body1: "説明1", body2: "説明2", body3: "説明3" },
  },

  {
    id: 2,
    slug: "test-2",
    name: "テスト店-2",
    introduction: "テスト2のお店です",

    address: "2-2-2 Shibuya, Shibuya-ku, Tokyo",
    address_ja: "東京都渋谷区渋谷2-2-2",

    area: { slug: "tokyo", label: "東京" },
    cooking: { slug: "yakiniku", label: "焼肉" },
    station: [{ slug: "shibuya", label: "渋谷" }],
    tags: [{ slug: "new", label: "NEW" }],
    like: 120,
    price: { lunch: 1500, dinner: 5000 },
    lat: 35.6595,
    lng: 139.7013,
    images: {
      cover_url: "/images/stores/テスト店-2/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-2/store1.jpg",
        "/images/stores/テスト店-2/store2.jpg",
        "/images/stores/テスト店-2/store3.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 3,
    slug: "test-3",
    name: "テスト店-3",
    introduction: "テスト3のお店です",

    address: "3-3-3 Umeda, Kita-ku, Osaka",
    address_ja: "大阪府大阪市北区梅田3-3-3",

    area: { slug: "osaka", label: "大阪" },
    cooking: { slug: "izakaya", label: "居酒屋" },
    station: [{ slug: "umeda", label: "梅田" }],
    tags: [{ slug: "new", label: "NEW" }],
    like: 45,
    price: { dinner: 3200 },
    lat: 34.7025,
    lng: 135.4983,
    images: {
      cover_url: "/images/stores/テスト店-3/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-3/store1.jpg",
        "/images/stores/テスト店-3/store2.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 4,
    slug: "test-4",
    name: "テスト店-4",
    introduction: "テスト4のお店です",

    address: "4-4-4 Minatomirai, Nishi-ku, Yokohama, Kanagawa",
    address_ja: "神奈川県横浜市西区みなとみらい4-4-4",

    area: { slug: "kanagawa", label: "神奈川" },
    cooking: { slug: "ramen", label: "ラーメン" },
    station: [{ slug: "yokohama", label: "横浜" }],
    tags: [{ slug: "new", label: "NEW" }],
    like: 88,
    price: { lunch: 900, dinner: 1400 },
    lat: 35.4658,
    lng: 139.6221,
    images: {
      cover_url: "/images/stores/テスト店-4/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-4/store1.jpg",
        "/images/stores/テスト店-4/store2.jpg",
        "/images/stores/テスト店-4/store3.jpg",
      ],
    },
    descriptions: { body1: "説明1", body2: "説明2" },
  },

  {
    id: 5,
    slug: "test-5",
    name: "テスト店-5",
    introduction: "テスト5のお店です",

    address: "5-5-5 Meieki, Nakamura-ku, Nagoya, Aichi",
    address_ja: "愛知県名古屋市中村区名駅5-5-5",

    area: { slug: "aichi", label: "愛知" },
    cooking: { slug: "cafe", label: "カフェ" },
    station: [{ slug: "nagoya", label: "名古屋" }],
    tags: [{ slug: "new", label: "NEW" }],
    like: 64,
    price: { lunch: 1100 },
    lat: 35.1709,
    lng: 136.9066,
    images: {
      cover_url: "/images/stores/テスト店-5/mainImage.jpg",
      gallery_urls: ["/images/stores/テスト店-5/store1.jpg"],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 6,
    slug: "test-6",
    name: "テスト店-6",
    introduction: "テスト6のお店です",

    address: "6-6-6 Higashishiokoji, Shimogyo-ku, Kyoto",
    address_ja: "京都府京都市下京区東塩小路町6-6-6",

    area: { slug: "kyoto", label: "京都" },
    cooking: { slug: "kaiseki", label: "会席" },
    station: [{ slug: "kyoto", label: "京都" }],
    tags: [{ slug: "new", label: "NEW" }],
    like: 132,
    price: { dinner: 7800 },
    lat: 35.0116,
    lng: 135.7681,
    images: {
      cover_url: "/images/stores/テスト店-6/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-6/store1.jpg",
        "/images/stores/テスト店-6/store2.jpg",
        "/images/stores/テスト店-6/store3.jpg",
      ],
    },
    descriptions: { body1: "説明1", body2: "説明2" },
  },

  {
    id: 7,
    slug: "test-7",
    name: "テスト店-7",
    introduction: "テスト7のお店です",

    address: "7-7-7 Tenjin, Chuo-ku, Fukuoka",
    address_ja: "福岡県福岡市中央区天神7-7-7",

    area: { slug: "fukuoka", label: "福岡" },
    cooking: { slug: "motsunabe", label: "もつ鍋" },
    station: [{ slug: "tenjin", label: "天神" }],
    tags: [{ slug: "night", label: "夜営業" }],
    like: 98,
    price: { dinner: 3600 },
    lat: 33.5902,
    lng: 130.4017,
    images: {
      cover_url: "/images/stores/テスト店-7/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-7/store1.jpg",
        "/images/stores/テスト店-7/store2.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 8,
    slug: "test-8",
    name: "テスト店-8",
    introduction: "テスト8のお店です",

    address: "8-8-8 Ginza, Chuo-ku, Tokyo",
    address_ja: "東京都中央区銀座8-8-8",

    area: { slug: "tokyo", label: "東京" },
    cooking: { slug: "tempura", label: "天ぷら" },
    station: [{ slug: "ginza", label: "銀座" }],
    tags: [{ slug: "counter", label: "カウンター" }],
    like: 155,
    price: { lunch: 2200, dinner: 6500 },
    lat: 35.6717,
    lng: 139.7671,
    images: {
      cover_url: "/images/stores/テスト店-8/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-8/store1.jpg",
        "/images/stores/テスト店-8/store2.jpg",
        "/images/stores/テスト店-8/store3.jpg",
        "/images/stores/テスト店-8/store4.jpg",
      ],
    },
    descriptions: { body1: "説明1", body2: "説明2" },
  },

  {
    id: 9,
    slug: "test-9",
    name: "テスト店-9",
    introduction: "テスト9のお店です",

    address: "9-9-9 Namba, Chuo-ku, Osaka",
    address_ja: "大阪府大阪市中央区難波9-9-9",

    area: { slug: "osaka", label: "大阪" },
    cooking: { slug: "okonomiyaki", label: "お好み焼き" },
    station: [{ slug: "namba", label: "難波" }],
    tags: [{ slug: "local", label: "ローカル" }],
    like: 72,
    price: { lunch: 980, dinner: 1800 },
    lat: 34.6686,
    lng: 135.5019,
    images: {
      cover_url: "/images/stores/テスト店-9/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-9/store1.jpg",
        "/images/stores/テスト店-9/store2.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 10,
    slug: "test-10",
    name: "テスト店-10",
    introduction: "テスト10のお店です",

    address: "10-10-10 Komachi, Kamakura, Kanagawa",
    address_ja: "神奈川県鎌倉市小町10-10-10",

    area: { slug: "kanagawa", label: "神奈川" },
    cooking: { slug: "seafood", label: "海鮮" },
    station: [{ slug: "kamakura", label: "鎌倉" }],
    tags: [{ slug: "view", label: "景色◎" }],
    like: 61,
    price: { lunch: 1600, dinner: 4200 },
    lat: 35.3192,
    lng: 139.5467,
    images: {
      cover_url: "/images/stores/テスト店-10/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-10/store1.jpg",
        "/images/stores/テスト店-10/store2.jpg",
        "/images/stores/テスト店-10/store3.jpg",
      ],
    },
    descriptions: { body1: "説明1", body2: "説明2" },
  },

  {
    id: 11,
    slug: "test-11",
    name: "テスト店-11",
    introduction: "テスト11のお店です",

    address: "11-11-11 Kanayama, Naka-ku, Nagoya, Aichi",
    address_ja: "愛知県名古屋市中区金山11-11-11",

    area: { slug: "aichi", label: "愛知" },
    cooking: { slug: "unagi", label: "うなぎ" },
    station: [{ slug: "kanayama", label: "金山" }],
    tags: [],
    like: 83,
    price: { lunch: 2400, dinner: 5200 },
    lat: 35.1442,
    lng: 136.8579,
    images: {
      cover_url: "/images/stores/テスト店-11/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-11/store1.jpg",
        "/images/stores/テスト店-11/store2.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 12,
    slug: "test-12",
    name: "テスト店-12",
    introduction: "テスト12のお店です",

    address: "12-12-12 Kawaramachi-dori, Nakagyo-ku, Kyoto",
    address_ja: "京都府京都市中京区河原町通12-12-12",

    area: { slug: "kyoto", label: "京都" },
    cooking: { slug: "udon", label: "うどん" },
    station: [{ slug: "kawaramachi", label: "河原町" }],
    tags: [{ slug: "cheap", label: "安い" }],
    like: 50,
    price: { lunch: 700, dinner: 1200 },
    lat: 35.0036,
    lng: 135.7706,
    images: {
      cover_url: "/images/stores/テスト店-12/mainImage.jpg",
      gallery_urls: ["/images/stores/テスト店-12/store1.jpg"],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 13,
    slug: "test-13",
    name: "テスト店-13",
    introduction: "テスト13のお店です",

    address: "13-13-13 Hakataekimae, Hakata-ku, Fukuoka",
    address_ja: "福岡県福岡市博多区博多駅前13-13-13",

    area: { slug: "fukuoka", label: "福岡" },
    cooking: { slug: "ramen", label: "ラーメン" },
    station: [{ slug: "hakata", label: "博多" }],
    tags: [{ slug: "spicy", label: "辛め" }],
    like: 140,
    price: { lunch: 950 },
    lat: 33.5898,
    lng: 130.4219,
    images: {
      cover_url: "/images/stores/テスト店-13/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-13/store1.jpg",
        "/images/stores/テスト店-13/store2.jpg",
        "/images/stores/テスト店-13/store3.jpg",
      ],
    },
    descriptions: { body1: "説明1", body2: "説明2" },
  },

  {
    id: 14,
    slug: "test-14",
    name: "テスト店-14",
    introduction: "テスト14のお店です",

    address: "14-14-14 Ebisu, Shibuya-ku, Tokyo",
    address_ja: "東京都渋谷区恵比寿14-14-14",

    area: { slug: "tokyo", label: "東京" },
    cooking: { slug: "italian", label: "イタリアン" },
    station: [{ slug: "ebisu", label: "恵比寿" }],
    tags: [{ slug: "date", label: "デート" }],
    like: 77,
    price: { lunch: 1800, dinner: 4800 },
    lat: 35.6476,
    lng: 139.7101,
    images: {
      cover_url: "/images/stores/テスト店-14/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-14/store1.jpg",
        "/images/stores/テスト店-14/store2.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 15,
    slug: "test-15",
    name: "テスト店-15",
    introduction: "テスト15のお店です",

    address: "15-15-15 Tennoji, Tennoji-ku, Osaka",
    address_ja: "大阪府大阪市天王寺区天王寺15-15-15",

    area: { slug: "osaka", label: "大阪" },
    cooking: { slug: "yakitori", label: "焼き鳥" },
    station: [{ slug: "tennoji", label: "天王寺" }],
    tags: [
      { slug: "hot", label: "HOT" },
      { slug: "new", label: "NEW" },
    ],
    like: 69,
    price: { dinner: 2800 },
    lat: 34.6466,
    lng: 135.5183,
    images: {
      cover_url: "/images/stores/テスト店-15/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-15/store1.jpg",
        "/images/stores/テスト店-15/store2.jpg",
        "/images/stores/テスト店-15/store3.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 16,
    slug: "test-16",
    name: "テスト店-16",
    introduction: "テスト16のお店です",

    address: "16-16-16 Minatomirai, Nishi-ku, Yokohama, Kanagawa",
    address_ja: "神奈川県横浜市西区みなとみらい16-16-16",

    area: { slug: "kanagawa", label: "神奈川" },
    cooking: { slug: "cafe", label: "カフェ" },
    station: [{ slug: "minatomirai", label: "みなとみらい" }],
    tags: [
      { slug: "hot", label: "HOT" },
      { slug: "new", label: "NEW" },
    ],
    like: 58,
    price: { lunch: 1300, dinner: 2200 },
    lat: 35.4576,
    lng: 139.6362,
    images: {
      cover_url: "/images/stores/テスト店-16/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-16/store1.jpg",
        "/images/stores/テスト店-16/store2.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },

  {
    id: 17,
    slug: "test-17",
    name: "テスト店-17",
    introduction: "テスト17のお店です",

    address: "17-17-17 Sakae, Naka-ku, Nagoya, Aichi",
    address_ja: "愛知県名古屋市中区栄17-17-17",

    area: { slug: "aichi", label: "愛知" },
    cooking: { slug: "teishoku", label: "定食" },
    station: [{ slug: "sakae", label: "栄" }],
    tags: [
      { slug: "hot", label: "HOT" },
      { slug: "new", label: "NEW" },
    ],
    like: 112,
    price: { lunch: 980, dinner: 1800 },
    lat: 35.1681,
    lng: 136.9054,
    images: {
      cover_url: "/images/stores/テスト店-17/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-17/store1.jpg",
        "/images/stores/テスト店-17/store2.jpg",
        "/images/stores/テスト店-17/store3.jpg",
      ],
    },
    descriptions: { body1: "説明1", body2: "説明2" },
  },

  {
    id: 18,
    slug: "test-18",
    name: "テスト店-18",
    introduction: "テスト18のお店です",

    address: "18-18-18 Gionmachi, Higashiyama-ku, Kyoto",
    address_ja: "京都府京都市東山区祇園町18-18-18",

    area: { slug: "kyoto", label: "京都" },
    cooking: { slug: "sweets", label: "スイーツ" },
    station: [{ slug: "gion", label: "祇園" }],
    tags: [{ slug: "takeout", label: "テイクアウト" }],
    like: 39,
    price: { lunch: 1200 },
    lat: 35.003,
    lng: 135.7788,
    images: {
      cover_url: "/images/stores/テスト店-18/mainImage.jpg",
      gallery_urls: [
        "/images/stores/テスト店-18/store1.jpg",
        "/images/stores/テスト店-18/store2.jpg",
      ],
    },
    descriptions: { body1: "説明1" },
  },
];

// Laravelとの接続
export const laravelStoresMock = L;

// 一覧
export const allStores: Store[] = L;
