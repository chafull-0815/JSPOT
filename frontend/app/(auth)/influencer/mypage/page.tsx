// app/influencer/mypage/page.tsx
import { currentUser } from "@/lib/fixtures/users.fixture";

export default function InfluencerMypagePage() {
  const user = currentUser;

  return (
    <div className="min-h-[calc(100vh-64px-56px)] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* 上部：タイトル & アカウント情報 */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-medium text-fuchsia-700">
              <span>インフルエンサーマイページ</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              インフルエンサーマイページ
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              プロフィール情報や提携店舗、投稿内容の管理をここから行います。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">ログイン中のアカウント</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {user?.name ?? "インフルエンサー"}
            </p>
            <p className="text-xs text-slate-500">
              {user?.email ?? "メールアドレス未設定（開発中ダミー）"}
            </p>
          </div>
        </section>

        {/* 中段：提携 / 投稿 / 実績 */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">提携中の店舗数</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0</p>
            <p className="mt-1 text-xs text-slate-500">
              紐付けられた店舗との提携状況をここで一覧・管理するイメージです。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">投稿コンテンツ</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              公開中 0 / 下書き 0
            </p>
            <p className="mt-1 text-xs text-slate-500">
              紹介投稿やレビュー記事などの数を表示していく想定です。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">簡易実績</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              表示回数 / 反応率
            </p>
            <p className="mt-1 text-xs text-slate-500">
              将来的にインプレッションやクリック数などのサマリをここに置けます。
            </p>
          </div>
        </section>

        {/* 下段：プロフィール・リンク管理 */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              プロフィール管理
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              表示名・自己紹介文・SNSリンクなどの編集画面への導線をここにまとめます。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                プロフィール編集（ダミー）
              </button>
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                SNSリンク管理（ダミー）
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              今後の追加予定
            </h2>
            <ul className="mt-2 list-disc pl-4 text-xs text-slate-700 space-y-1">
              <li>提携店舗ごとの成果レポート表示</li>
              <li>投稿実績の一覧・フィルタリング</li>
              <li>管理者への変更依頼フローとの連携</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
