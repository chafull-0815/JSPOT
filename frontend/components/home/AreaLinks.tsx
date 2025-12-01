import Image from "next/image";
import Link from "next/link";
import Container from "../layout/Container";

// フロント表示専用（Laravelのtaxonomyとは別管理）
// value は検索クエリに入る値。Laravel側が area をこのラベルで返す想定ならそのままでOK。
type AreaCard = {
  label: string; // 表示名
  value: string; // ?area= に入れる値
  image: string; // 背景画像パス（public 配下）
};

const AREA_CARDS: AreaCard[] = [
  { label: "東京", value: "東京", image: "/images/areas/tokyo.jpg" },
  { label: "神奈川", value: "神奈川", image: "/images/areas/kanagawa.jpg" },
  { label: "大阪", value: "大阪", image: "/images/areas/osaka.jpg" },
  { label: "愛知", value: "愛知", image: "/images/areas/aichi.jpg" },
  { label: "京都", value: "京都", image: "/images/areas/kyoto.jpg" },
  { label: "福岡", value: "福岡", image: "/images/areas/fukuoka.jpg" },
];

export default function AreaLinks() {
  return (
    <Container>
      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold">エリアから探す</h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {AREA_CARDS.map((a) => (
            <Link
              key={a.label}
              href={`/stores?area=${encodeURIComponent(a.value)}`}
              className="group block w-full"
            >
              <div
                className="relative w-full overflow-hidden rounded-lg bg-zinc-200"
                style={{ aspectRatio: "4 / 3" }} // ← Tailwindに依存せず確実に4:3を作る
              >
                <Image
                  src={a.image}
                  alt={a.label}
                  fill
                  sizes="
                          (min-width: 1024px) 16vw,
                          (min-width: 640px) 30vw,
                          80vw
                        "
                  className="
                              object-cover object-center
                              transition-transform duration-300
                              group-hover:scale-105
                            "
                />

                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-x-0 bottom-0 p-2 text-center text-white font-semibold drop-shadow">
                  {a.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
