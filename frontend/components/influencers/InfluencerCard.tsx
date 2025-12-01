// components/influencers/InfluencerCard.tsx
"use client";

import type { Influencer, SocialLinks } from "@/lib/data/influencer";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

// アバターが空 or 取得失敗時のフォールバック
// public/images/no-man-image.png を用意しておくか、好きなパスに変えてください
const FALLBACK_AVATAR = "/images/influencers/no-man-image.png";

// SNS を並べる順番
const socialOrder: (keyof SocialLinks)[] = [
  "instagram",
  "tiktok",
  "youtube",
  "facebook",
  "twitter",
];

// 各SNSアイコン
const Icon: Record<keyof SocialLinks, ReactNode> = {
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M12 2.2c3.2 0 3.6.01 4.9.07 3.2.15 4.8 1.7 4.9 4.9.06 1.3.07 1.7.07 4.9s-.01 3.6-.07 4.9c-.15 3.2-1.7 4.8-4.9 4.9-1.3.06-1.7.07-4.9.07s-3.6-.01-4.9-.07c-3.2-.15-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.15-3.2 1.7-4.8 4.9-4.9C8.4 2.2 8.8 2.2 12 2.2zm0 2c-3.1 0-3.5.01-4.8.07-2.3.1-3.4 1.2-3.5 3.5C3.7 9 3.7 9.4 3.7 12c0 2.6.01 3 .07 4.3.1 2.3 1.2 3.4 3.5 3.5 1.3.06 1.7.07 4.8.07s3.5-.01 4.8-.07c2.3-.1 3.4-1.2 3.5-3.5.06-1.3.07-1.7.07-4.3 0-2.6-.01-3-.07-4.3-.1-2.3-1.2-3.4-3.5-3.5C15.5 4.2 15.1 4.2 12 4.2zm0 2.8a5 5 0 1 1 0 10.1 5 5 0 0 1 0-10.1zm0 2a3 3 0 1 0 0 6.1 3 3 0 0 0 0-6.1zm5.3-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
    </svg>
  ),
  youtube: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8 .0 12 .0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 16 .0 12 .0 12s0-4-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z" />
    </svg>
  ),
  tiktok: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.5v13.7a2.9 2.9 0 1 1-2.3-4.5c.3 0 .6.05.9.13V9.4a7 7 0 0 0-1-.05A6.3 6.3 0 1 0 18 15.7v-7a8.2 8.2 0 0 0 4.8 1.5v-3.4a4.9 4.9 0 0 1-1-.1z" />
    </svg>
  ),
  facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.3C0 23.4.6 24 1.3 24h11.5v-9.3H9.8V11h3V8.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.6.2 2.6.2v3h-1.5c-1.5 0-2 .9-2 1.9V11h3.4l-.5 3.7h-2.9V24h5.6c.7 0 1.3-.6 1.3-1.3V1.3C24 .6 23.4 0 22.7 0z" />
    </svg>
  ),
  twitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M22.5 5.9c-.8.3-1.5.5-2.4.6a4 4 0 0 0 1.7-2.2 7.7 7.7 0 0 1-2.5 1 3.9 3.9 0 0 0-6.8 3.6 11 11 0 0 1-8-4 3.9 3.9 0 0 0 1.2 5.2c-.6 0-1.1-.2-1.6-.4v.1a3.9 3.9 0 0 0 3.1 3.8 4 4 0 0 1-1 .1c-.3 0-.5 0-.8-.1a3.9 3.9 0 0 0 3.7 2.8A7.8 7.8 0 0 1 2 19.1a11 11 0 0 0 6 1.8c7.2 0 11.1-6 11.1-11.1v-.5a7.8 7.8 0 0 0 1.9-2z" />
    </svg>
  ),
};

type Props = {
  data: Influencer;
};

export default function InfluencerCard({ data }: Props) {
  const { name, username, avatar, bio, socials } = data;

  const displayName = name || username.replace(/^@/, "");

  const hasAvatar = !!avatar;

  const [broken, setBroken] = useState(false);

  const src = !hasAvatar || broken ? FALLBACK_AVATAR : avatar;

  return (
    <article className="group flex flex-col rounded-3xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mx-auto h-42 w-42 overflow-hidden rounded-full bg-zinc-100">
        <Image
          src={src}
          alt={displayName}
          width={128}
          height={128}
          className="h-full w-full object-cover"
          unoptimized
          onError={hasAvatar ? () => setBroken(true) : undefined}
        />
      </div>

      <div className="mt-4 text-center">
        <div className="text-base font-semibold">{displayName}</div>
        <div className="text-xs text-muted-foreground">{username}</div>
        {bio && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {bio}
          </p>
        )}
      </div>

      <div className="mt-auto flex items-center justify-center gap-3 pt-4">
        {socialOrder.map((k) => {
          const url = socials?.[k];
          if (!url) return null;

          return (
            <Link
              key={k}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={k}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-neutral-600 shadow-sm transition hover:scale-105"
            >
              {Icon[k]}
            </Link>
          );
        })}
      </div>
    </article>
  );
}
