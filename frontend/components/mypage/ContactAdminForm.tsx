// components/mypage/ContactAdminForm.tsx
"use client";

import { useState } from "react";

type Props = {
  userType: "shop" | "influencer";
  className?: string;
};

const INQUIRY_TYPES = {
  shop: [
    { value: "store_info", label: "店舗情報の変更依頼" },
    { value: "photo", label: "写真の追加・変更" },
    { value: "campaign", label: "キャンペーン掲載について" },
    { value: "billing", label: "お支払いについて" },
    { value: "other", label: "その他" },
  ],
  influencer: [
    { value: "profile", label: "プロフィール情報の変更" },
    { value: "partnership", label: "店舗提携について" },
    { value: "content", label: "投稿コンテンツについて" },
    { value: "billing", label: "報酬・お支払いについて" },
    { value: "other", label: "その他" },
  ],
};

export function ContactAdminForm({ userType, className = "" }: Props) {
  const [formData, setFormData] = useState({
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = INQUIRY_TYPES[userType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ダミー送信処理（実際はAPIに送信）
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ inquiryType: "", subject: "", message: "" });

    // 3秒後にリセット
    setTimeout(() => setSubmitted(false), 3000);
  };

  const colorClass = userType === "shop" ? "emerald" : "fuchsia";

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      <h2 className="text-sm font-semibold text-slate-900">
        管理者へのお問い合わせ
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        ご質問や変更依頼がございましたら、下記フォームよりお問い合わせください。
      </p>

      {submitted ? (
        <div className={`mt-4 rounded-xl bg-${colorClass}-50 p-4 text-center`}>
          <p className={`text-sm font-medium text-${colorClass}-700`}>
            お問い合わせを受け付けました
          </p>
          <p className="mt-1 text-xs text-slate-500">
            担当者より順次ご連絡いたします。
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* 問い合わせ種別 */}
          <div>
            <label
              htmlFor="inquiryType"
              className="block text-xs font-medium text-slate-700"
            >
              お問い合わせ種別
            </label>
            <select
              id="inquiryType"
              value={formData.inquiryType}
              onChange={(e) =>
                setFormData({ ...formData, inquiryType: e.target.value })
              }
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="">選択してください</option>
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* 件名 */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-medium text-slate-700"
            >
              件名
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
              placeholder="お問い合わせの件名を入力"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* 本文 */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-slate-700"
            >
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows={4}
              placeholder="詳細をご記入ください"
              className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactAdminForm;
