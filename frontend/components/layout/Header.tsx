// components/layout/Header.tsx
"use client";

import { currentUser, UserRole } from "@/lib/fixtures/users.fixture"; // パスは実際の場所に合わせて
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/stores", label: "Stores" },
  { href: "/influencers", label: "Influencers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const getMypageHref = (role: UserRole): string | null => {
  switch (role) {
    case "user":
      return "/user/mypage";
    case "shop_owner":
      return "/shop/mypage";
    case "influencer":
      return "/influencer/mypage";
    case "admin":
      return "/admin"; // 運営管理画面
    case "super_admin":
      return "/super-admin"; // システム設定用ダッシュボード or /admin でもOK
    default:
      return null;
  }
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 今は fixture。あとでLaravel認証につなぐときに差し替え。
  const user = currentUser;
  const isLoggedIn = !!user;
  const mypageHref = user ? getMypageHref(user.role) : null;

  const isAuthPage =
    pathname.startsWith("/user/login") ||
    pathname.startsWith("/shop/login") ||
    pathname.startsWith("/influencer/login");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
        {/* ロゴ */}
        <Link href="/" className="text-lg font-semibold tracking-wide">
          J SPOT
        </Link>

        {/* 右側 */}
        <div className="ml-auto flex items-center gap-3">
          {/* PCナビ */}
          <nav className="hidden items-center gap-2 md:flex">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-xl px-3 py-2 text-sm transition hover:bg-black/5 ${
                    active ? "font-semibold" : "text-slate-500"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}

            {/* 右端：ログイン状態で出し分け */}
            {isLoggedIn && mypageHref ? (
              <Link
                href={mypageHref}
                className={`ml-2 rounded-xl px-3 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50 ${
                  pathname.startsWith(mypageHref) ? "underline" : ""
                }`}
              >
                マイページ
              </Link>
            ) : !isAuthPage ? (
              // ログインしていなくて、かつログインページではないときだけ表示
              <>
                <Link
                  href="/user/login"
                  className="rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-black/5"
                >
                  ログイン
                </Link>
                <Link
                  href="/user/register"
                  className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-400"
                >
                  会員登録
                </Link>
              </>
            ) : null}
          </nav>

          {/* SP: ハンバーガー */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                fill="currentColor"
                d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* SPメニュー（簡略版） */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-base font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-3">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm hover:bg-black/5"
                >
                  {n.label}
                </Link>
              ))}

              {isLoggedIn && mypageHref ? (
                <Link
                  href={mypageHref}
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl px-3 py-3 text-sm font-semibold text-sky-600 hover:bg-sky-50"
                >
                  マイページ
                </Link>
              ) : !isAuthPage ? (
                <>
                  <Link
                    href="/user/login"
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-black/5"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/user/register"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-sky-500 px-3 py-3 text-sm font-semibold text-white hover:bg-sky-400"
                  >
                    会員登録
                  </Link>
                </>
              ) : null}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
