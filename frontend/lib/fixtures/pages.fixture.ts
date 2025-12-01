// lib/fixtures/pages.fixture.ts
export type FrontPage = {
  heroSlides: { id: string; title: string; caption?: string; image: string }[];
  copy: { lead: string; ctaLabel: string; ctaHref: string };
};
export type StaticPage = { title: string; html?: string; md?: string };

export const frontPage: FrontPage = {
  heroSlides: [
    { id: "h1", title: "今月の注目店", caption: "編集部おすすめ", image: "/images/heros/hero1.jpg" },
    { id: "h2", title: "食べ歩き特集", caption: "屋台・市場・路地裏", image: "/images/heros/hero2.jpg" },
  ],
  copy: { lead: "JSPOT は現地の美味しさを日本語で届けます。", ctaLabel: "お店を探す", ctaHref: "/stores" },
};

export const aboutPage: StaticPage = {
  title: "About JSPOT",
  md: "**JSPOT** はタイの飲食店情報を発信するメディアです。",
};

export const contactPage: StaticPage = {
  title: "Contact",
  md: "お問い合わせは contact@example.com まで。",
};
