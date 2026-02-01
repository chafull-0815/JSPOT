// components/layout/Header.tsx
"use client";

import { currentUser, UserRole } from "@/lib/fixtures/users.fixture";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// 基本ナビゲーション
const NAV = [
  { href: "/", label: "Home" },
  { href: "/stores", label: "Stores" },
  { href: "/influencers", label: "Influencers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// マイページオプション（全ロール共通で表示）
const MYPAGE_OPTIONS = [
  { href: "/mypage/me", label: "ユーザー" },
  { href: "/mypage/shop", label: "店舗" },
  { href: "/mypage/influencer", label: "インフルエンサー" },
];

// インフルエンサーかどうか
const isInfluencer = (role: UserRole): boolean => role === "influencer";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mypageDropdownOpen, setMypageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const user = currentUser;
  const isLoggedIn = !!user;
  const showSponsorLink = user && isInfluencer(user.role);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isOnMypage = pathname.startsWith("/mypage");

  // クリック外でドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMypageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ドロップダウンのトグル
  const toggleMypageDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setMypageDropdownOpen(!mypageDropdownOpen);
  };

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
                href="/go-to-stores"
                className={`rounded-xl px-3 py-2 text-sm transition hover:bg-amber-50 ${
                  pathname === "/go-to-stores"
                    ? "font-semibold text-amber-600"
                    : "text-amber-500"
                }`}
              >
                協賛店舗
              </Link>
            )}

            {/* マイページ（クリックで開閉） */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleMypageDropdown}
                  className={`ml-2 flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-50 ${
                    isOnMypage ? "bg-sky-50" : ""
                  }`}
                >
                  マイページ
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
                </button>

                {/* ドロップダウンメニュー */}
                {mypageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border bg-white py-2 shadow-lg">
                    {MYPAGE_OPTIONS.map((option) => (
                      <Link
                        key={option.href}
                        href={option.href}
                        onClick={() => setMypageDropdownOpen(false)}
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
                  href="/login"
                  className="rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-black/5"
                >
                  ログイン
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-400"
                >
                  新規登録
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
                  href="/go-to-stores"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm hover:bg-amber-50 ${
                    pathname === "/go-to-stores"
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
                  {MYPAGE_OPTIONS.map((option) => (
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
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-black/5"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl bg-sky-500 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-sky-400"
                  >
                    新規登録
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
