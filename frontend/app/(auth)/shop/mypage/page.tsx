// app/shop/mypage/page.tsx
import { currentUser } from "@/lib/fixtures/users.fixture";

export default function ShopMypagePage() {
  const user = currentUser;

  return (
    <div className="min-h-[calc(100vh-64px-56px)] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* 上部：タイトル & アカウント情報 */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              <span>店舗管理者マイページ</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              店舗管理マイページ
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              店舗情報の編集や掲載内容の管理、お知らせの投稿などをここから行います。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">ログイン中のアカウント</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {user?.name ?? "店舗担当者"}
            </p>
            <p className="text-xs text-slate-500">
              {user?.email ?? "メールアドレス未設定（開発中ダミー）"}
            </p>
          </div>
        </section>

        {/* 中段：店舗ステータス系 */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              店舗掲載ステータス
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">公開中</p>
            <p className="mt-1 text-xs text-slate-500">
              公開 / 下書き / 非公開
              といった状態をここで表示・切り替えできる想定です。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">掲載中の投稿</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0 件</p>
            <p className="mt-1 text-xs text-slate-500">
              メニューやキャンペーン情報など、店舗投稿の件数を表示予定です。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              保留中の変更依頼
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">0 件</p>
            <p className="mt-1 text-xs text-slate-500">
              変更依頼フォーム → GSS → 管理側承認
              というフローの件数を表示する想定です。
            </p>
          </div>
        </section>

        {/* 下段：ショートカット */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              店舗情報の管理
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              店舗名・住所・営業時間・写真・タグなどの編集画面への導線をここにまとめます。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                店舗情報を編集（ダミー）
              </button>
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                写真・ギャラリー管理（ダミー）
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              お知らせ・キャンペーン
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              イベントやキャンペーン情報の投稿・編集画面への導線をここに置きます。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                新規お知らせを作成（ダミー）
              </button>
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                過去のお知らせ一覧（ダミー）
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
