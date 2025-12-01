// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About | J SPOT" };

// ここで全部直書き（静的）
const ABOUT_META = {
  siteName: "J SPOT",
  tagline: "日本の“行きたい”スポットをサクッと探せるグルメ＆スポットメディア",
  mission:
    "J SPOT は、日本各地の“今行きたい場所”を、できるだけシンプルに・分かりやすく見つけられるようにすることを目指したメディアです。エリア・ジャンル・シーンから直感的に検索でき、現地のリアルな情報をもとにしたセレクトだけをお届けします。",
  story:
    "観光サイトやグルメサイトが増えすぎて「結局どこに行けばいいのか分からない」という声から、J SPOT は生まれました。私たちは、写真とシンプルな情報設計にこだわり、広告に左右されない“行きたい理由が分かるスポット紹介”を大切にしています。今後もエリアやジャンルを拡充しながら、日本のローカルな魅力を丁寧に発信していきます。",
  heroImage: "/images/heros/hero1.jpg", // ない場合は /images/no-image.png などに変更
  features: [
    {
      title: "シンプルな検索体験",
      desc: "エリア・ジャンル・シーンから、迷わずサクッとスポットを探せます。",
    },
    {
      title: "写真重視のセレクト",
      desc: "“ここ行きたい！”と思えるビジュアルを中心にスポットを紹介します。",
    },
    {
      title: "ローカルに強い",
      desc: "メジャーどころだけでなく、ローカルな人気店・穴場も丁寧にピックアップ。",
    },
    {
      title: "インフルエンサー連携",
      desc: "現地に詳しいインフルエンサーと連携し、最新のおすすめ情報をお届けします。",
    },
  ],
  stats: [
    { label: "掲載エリア数", value: "6+" },
    { label: "掲載スポット数", value: "100+" },
    { label: "提携インフルエンサー", value: "10+" },
    { label: "月間閲覧ユーザー", value: "Coming soon" },
  ],
};

export default function AboutPage() {
  const meta = ABOUT_META;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h1 className="text-2xl font-semibold">{meta.siteName}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{meta.tagline}</p>
            <p className="mt-4 leading-7">{meta.mission}</p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-2xl bg-black px-6 text-white transition hover:opacity-90"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto aspect-4/3 w-full overflow-hidden rounded-3xl ring-2 ring-pink-100/60 relative">
              <Image
                src={meta.heroImage || "/images/no-image.png"}
                alt="About hero"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">私たちについて</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{meta.story}</p>
      </section>

      {/* Features */}
      <section className="mt-8">
        <h3 className="mb-3 text-lg font-semibold">大切にしていること</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {meta.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-2 text-base font-semibold">{f.title}</div>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">数字で見る</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {meta.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border bg-white p-4 text-center shadow-sm"
            >
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-8 rounded-3xl border bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">
          メディア掲載・タイアップのご相談もお気軽にどうぞ。
        </p>
        <div className="mt-3">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-2xl bg-black px-6 text-white transition hover:opacity-90"
          >
            Contact
          </Link>
        </div>
      </section>
    </main>
  );
}
