// app/user/mypage/page.tsx
import { currentUser } from "@/lib/fixtures/users.fixture";

export default function UserMypagePage() {
  const user = currentUser;

  return (
    <div className="min-h-[calc(100vh-64px-56px)] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* 上部：タイトル & ユーザー情報 */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              <span>ユーザーマイページ</span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              マイページ
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              イベント参加履歴やポイント、口コミなどをここから確認できます。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">ログイン中のアカウント</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {user?.name ?? "ゲストユーザー"}
            </p>
            <p className="text-xs text-slate-500">
              {user?.email ?? "メールアドレス未設定（開発中ダミー）"}
            </p>
          </div>
        </section>

        {/* 中段：ポイント / イベント / 口コミ */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">保有ポイント</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0 pt</p>
            <p className="mt-1 text-xs text-slate-500">
              実際のポイント連携は、Laravel 接続後に実装予定です。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              参加したイベント
            </p>
            <p className="mt-2 text-sm text-slate-900">
              まだイベント参加履歴はありません。
            </p>
            <p className="mt-1 text-xs text-slate-500">
              ここに参加済みイベントの一覧を表示していきます。
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              口コミ・コメント
            </p>
            <p className="mt-2 text-sm text-slate-900">
              まだ投稿された口コミはありません。
            </p>
            <p className="mt-1 text-xs text-slate-500">
              投稿した口コミの管理や編集導線をここに置くイメージです。
            </p>
          </div>
        </section>

        {/* 下段：設定系 */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              アカウント設定
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              プロフィール編集やパスワード変更など、基本的な設定への導線をここにまとめます。
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
                通知設定（ダミー）
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              今後の追加予定
            </h2>
            <ul className="mt-2 list-disc pl-4 text-xs text-slate-700 space-y-1">
              <li>イベント参加履歴の表示・フィルタリング</li>
              <li>ポイント履歴・獲得履歴の表示</li>
              <li>口コミ履歴・編集機能</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
