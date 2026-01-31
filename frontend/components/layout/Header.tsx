// components/layout/Header.tsx
"use client";

import { currentUser, UserRole } from "@/lib/fixtures/users.fixture";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// 基本ナビゲーション
const NAV = [
  { href: "/", label: "Home" },
  { href: "/stores", label: "Stores" },
  { href: "/influencers", label: "Influencers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// ロール別マイページ設定
type MypageOption = {
  role: UserRole;
  href: string;
  label: string;
};

const MYPAGE_OPTIONS: MypageOption[] = [
  { role: "user", href: "/user/mypage", label: "ユーザーマイページ" },
  { role: "shop_owner", href: "/shop/mypage", label: "店舗マイページ" },
  { role: "influencer", href: "/influencer/mypage", label: "インフルエンサーマイページ" },
];

// 管理者用リンク
const ADMIN_LINKS: MypageOption[] = [
  { role: "admin", href: "/admin", label: "管理画面" },
  { role: "super_admin", href: "/admin", label: "管理画面" },
];

// ユーザーが利用可能なマイページオプションを取得
const getAvailableMypages = (role: UserRole): MypageOption[] => {
  const options: MypageOption[] = [];

  // ユーザーマイページは全員利用可能
  options.push(MYPAGE_OPTIONS[0]);

  // 店舗オーナーの場合
  if (role === "shop_owner") {
    options.push(MYPAGE_OPTIONS[1]);
  }

  // インフルエンサーの場合
  if (role === "influencer") {
    options.push(MYPAGE_OPTIONS[2]);
  }

  // 管理者の場合
  if (role === "admin" || role === "super_admin") {
    const adminLink = ADMIN_LINKS.find((l) => l.role === role);
    if (adminLink) options.push(adminLink);
  }

  return options;
};

// デフォルトマイページを取得
const getDefaultMypage = (role: UserRole): string => {
  switch (role) {
    case "shop_owner":
      return "/shop/mypage";
    case "influencer":
      return "/influencer/mypage";
    case "admin":
    case "super_admin":
      return "/admin";
    default:
      return "/user/mypage";
  }
};

// インフルエンサーかどうか
const isInfluencer = (role: UserRole): boolean => role === "influencer";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mypageDropdownOpen, setMypageDropdownOpen] = useState(false);
  const pathname = usePathname();

  const user = currentUser;
  const isLoggedIn = !!user;
  const availableMypages = user ? getAvailableMypages(user.role) : [];
  const defaultMypage = user ? getDefaultMypage(user.role) : "/user/mypage";
  const showSponsorLink = user && isInfluencer(user.role);

  const isAuthPage =
    pathname.startsWith("/user/login") ||
    pathname.startsWith("/shop/login") ||
    pathname.startsWith("/influencer/login");

  const isOnMypage = pathname.startsWith("/user/mypage") ||
    pathname.startsWith("/shop/mypage") ||
    pathname.startsWith("/influencer/mypage");

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

            {/* インフルエンサー専用: 協賛店舗 */}
            {showSponsorLink && (
              <Link
                href="/influencer/sponsors"
                className={`rounded-xl px-3 py-2 text-sm transition hover:bg-amber-50 ${
                  pathname === "/influencer/sponsors"
                    ? "font-semibold text-amber-600"
                    : "text-amber-500"
                }`}
              >
                協賛店舗
              </Link>
            )}

            {/* マイページ（ドロップダウン） */}
            {isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={() => setMypageDropdownOpen(true)}
                onMouseLeave={() => setMypageDropdownOpen(false)}
              >
                <Link
                  href={defaultMypage}
                  className={`ml-2 flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50 ${
                    isOnMypage ? "underline" : ""
                  }`}
                >
                  マイページ
                  {availableMypages.length > 1 && (
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        mypageDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* ドロップダウンメニュー */}
                {mypageDropdownOpen && availableMypages.length > 1 && (
                  <div className="absolute right-0 top-full mt-1 w-56 rounded-xl border bg-white py-2 shadow-lg">
                    {availableMypages.map((option) => (
                      <Link
                        key={option.href}
                        href={option.href}
                        className={`block px-4 py-2 text-sm hover:bg-sky-50 ${
                          pathname === option.href
                            ? "bg-sky-50 font-semibold text-sky-600"
                            : "text-slate-700"
                        }`}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : !isAuthPage ? (
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
            aria-label="メニューを開く"
            onClick={() => setMobileMenuOpen(true)}
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

      {/* SPメニュー */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-xs overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-base font-semibold">メニュー</span>
              <button
                aria-label="メニューを閉じる"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-3">
              {/* 基本ナビ */}
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm hover:bg-black/5 ${
                    pathname === n.href ? "font-semibold" : ""
                  }`}
                >
                  {n.label}
                </Link>
              ))}

              {/* インフルエンサー専用: 協賛店舗 */}
              {showSponsorLink && (
                <Link
                  href="/influencer/sponsors"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm hover:bg-amber-50 ${
                    pathname === "/influencer/sponsors"
                      ? "font-semibold text-amber-600"
                      : "text-amber-500"
                  }`}
                >
                  協賛店舗
                </Link>
              )}

              {/* 区切り線 */}
              <div className="my-2 border-t" />

              {/* ログイン状態で出し分け */}
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2 text-xs font-semibold uppercase text-slate-400">
                    マイページ
                  </div>
                  {availableMypages.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-xl px-3 py-3 text-sm hover:bg-sky-50 ${
                        pathname === option.href
                          ? "bg-sky-50 font-semibold text-sky-600"
                          : "text-sky-600"
                      }`}
                    >
                      {option.label}
                    </Link>
                  ))}
                </>
              ) : !isAuthPage ? (
                <>
                  <Link
                    href="/user/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-black/5"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/user/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl bg-sky-500 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-sky-400"
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
