export type Comment = {
  id: string;
  storeSlug: string;
  name: string;
  body: string;
  createdAt: string; // ISO
}

export const commentsByStoreSlug: Record<string, Comment[]> = {
  "test-1": [
    {
      id: "c-1",
      storeSlug: "test-1",
      name: "しょうごさん",
      body: "ここめっちゃ良さそう！",
      createdAt: "2025-11-01T10:00:00.000Z",
    },
    {
      id: "c-2",
      storeSlug: "test-1",
      name: "匿名",
      body: "ランチ行ってみたいです。",
      createdAt: "2025-11-03T12:30:00.000Z",
    },
  ],
  "test-2": [
    {
      id: "c-3",
      storeSlug: "test-2",
      name: "ユーザーA",
      body: "焼肉最高でした",
      createdAt: "2025-11-10T19:15:00.000Z",
    },
  ],
};

export function getFixtureComments(storeSlug: string): Comment[] {
  return commentsByStoreSlug[storeSlug] ?? [];
}