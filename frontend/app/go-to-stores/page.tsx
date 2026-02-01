// app/go-to-stores/page.tsx
import { currentUser } from "@/lib/fixtures/users.fixture";
import Link from "next/link";

// ダミーの協賛店舗データ
const SPONSOR_STORES = [
  {
    id: 1,
    name: "焼肉 炎の牛",
    category: "焼肉",
    area: "渋谷",
    description: "A5ランク黒毛和牛を提供する高級焼肉店。インフルエンサー向け特別プランあり。",
    partnershipType: "PR投稿",
    benefit: "お食事代50%OFF + 報酬あり",
    status: "募集中",
  },
  {
    id: 2,
    name: "鮨 銀座 匠",
    category: "寿司",
    area: "銀座",
    description: "ミシュラン一つ星の江戸前寿司。職人のこだわりを発信してくれる方を募集。",
    partnershipType: "レビュー記事",
    benefit: "コース無料招待 + 報酬あり",
    status: "募集中",
  },
  {
    id: 3,
    name: "ビストロ パリの風",
    category: "フレンチ",
    area: "表参道",
    description: "カジュアルフレンチビストロ。季節のコースをSNSで紹介してください。",
    partnershipType: "SNS投稿",
    benefit: "ペアディナー招待",
    status: "残り2枠",
  },
  {
    id: 4,
    name: "天ぷら 雅",
    category: "天ぷら",
    area: "新宿",
    description: "創業50年の老舗天ぷら店。伝統の味を若い世代に広めたい。",
    partnershipType: "動画コンテンツ",
    benefit: "お食事代全額 + 報酬あり",
    status: "募集中",
  },
];

export default function GoToStoresPage() {
  const user = currentUser;

  // インフルエンサー以外はアクセス不可（実際はmiddlewareで制御）
  if (user?.role !== "influencer") {
    return (
      <div className="min-h-[calc(100vh-64px-56px)] bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-900">
            このページはインフルエンサー専用です
          </p>
          <p className="mt-2 text-sm text-slate-500">
            インフルエンサーとして登録されている方のみアクセスできます。
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px-56px)] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* ヘッダー */}
        <section>
          <div className="flex items-center gap-2">
            <Link
              href="/mypage/influencer"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              ダッシュボード
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-sm font-medium text-slate-900">協賛店舗</span>
          </div>

          <div className="mt-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              <span>インフルエンサー限定</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              協賛店舗一覧
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              コラボレーション可能な協賛店舗です。興味のある店舗があれば、詳細をご確認ください。
            </p>
          </div>
        </section>

        {/* フィルター（将来実装用スタブ） */}
        <section className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white"
          >
            すべて
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            PR投稿
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            レビュー記事
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            動画コンテンツ
          </button>
        </section>

        {/* 店舗リスト */}
        <section className="grid gap-4 md:grid-cols-2">
          {SPONSOR_STORES.map((store) => (
            <div
              key={store.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              {/* ステータスバッジ */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{store.area}</span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs text-slate-500">{store.category}</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    store.status === "募集中"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {store.status}
                </span>
              </div>

              {/* 店舗名 */}
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {store.name}
              </h3>

              {/* 説明 */}
              <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                {store.description}
              </p>

              {/* 提携タイプ・特典 */}
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    提携タイプ:
                  </span>
                  <span className="rounded bg-fuchsia-50 px-2 py-0.5 text-xs text-fuchsia-700">
                    {store.partnershipType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    特典:
                  </span>
                  <span className="text-xs text-slate-700">{store.benefit}</span>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  詳細を見る
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  お気に入り
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* 注意事項 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            協賛店舗との提携について
          </h2>
          <ul className="mt-2 list-disc pl-4 text-xs text-slate-600 space-y-1">
            <li>提携申請後、店舗側の審査があります（通常3営業日以内）</li>
            <li>投稿内容は店舗の確認が必要な場合があります</li>
            <li>報酬の支払いは月末締め・翌月末払いとなります</li>
            <li>詳細な条件は各店舗の詳細ページでご確認ください</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
