// components/auth/LoginPage.tsx
"use client";

import { useRouter } from "next/navigation";

type AuthRole = "user" | "shop_owner" | "influencer";

type LoginPageProps = {
  role: AuthRole;
};

const roleMeta: Record<
  AuthRole,
  { title: string; description: string; badge: string }
> = {
  user: {
    title: "ユーザーログイン",
    description:
      "イベント・ポイント・口コミの確認のためにログインしてください。",
    badge: "ユーザー",
  },
  shop_owner: {
    title: "店舗ログイン",
    description: "店舗情報の編集やお知らせの管理のためにログインしてください。",
    badge: "店舗管理者",
  },
  influencer: {
    title: "インフルエンサーログイン",
    description: "プロフィールの編集や投稿管理のためにログインしてください。",
    badge: "インフルエンサー",
  },
};

export default function LoginPage({ role }: LoginPageProps) {
  const meta = roleMeta[role];
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ★ いまは「通る前提」でマイページへ遷移するだけ
    const dest =
      role === "user"
        ? "/user/mypage"
        : role === "shop_owner"
        ? "/shop/mypage"
        : "/influencer/mypage";

    router.push(dest);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-sky-50 px-4 overflow-hidden">
      {/* ぼかし背景 */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-100 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-60" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
            {meta.badge}
          </span>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">
            {meta.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{meta.description}</p>
        </div>

        <div className="rounded-2xl bg-white/90 border border-slate-200 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-sm">
          {/* メールログイン */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-800"
              >
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-slate-500">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-300 bg-white text-sky-500 focus:ring-0"
                />
                <span>ログイン状態を保持する</span>
              </label>
              <button type="button" className="text-sky-500 hover:text-sky-400">
                パスワードをお忘れの方
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-400 transition-colors"
            >
              ログイン
            </button>
          </form>

          {/* 区切り線 */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">または</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* ソーシャルログイン見た目だけ */}
          <div className="mt-4 grid gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Googleでログイン</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Appleでログイン</span>
            </button>
          </div>

          {/* 新規登録リンク */}
          <p className="mt-6 text-center text-xs text-slate-500">
            アカウントをお持ちでない方は{" "}
            <a
              href={
                role === "shop_owner"
                  ? "/shop/register"
                  : role === "influencer"
                  ? "/influencer/register"
                  : "/user/register"
              }
              className="text-sky-500 hover:text-sky-400"
            >
              新規登録はこちら
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
