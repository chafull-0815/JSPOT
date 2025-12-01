// src/fixtures/users.ts

// ロールとステータスの型
export type UserRole =
  | "super_admin"
  | "admin"
  | "shop_owner"
  | "influencer"
  | "user";
export type UserStatus = "active" | "suspended" | "pending";

// usersテーブル想定の型（フロント用に camelCase に寄せてます）
export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

// サンプルユーザー一覧（開発用）
export const users: User[] = [
  // 管理者（Filament用）
  {
    id: 0,
    name: "システムスーパー管理者",
    email: "admin@example.com",
    role: "super_admin",
    status: "active",
    emailVerifiedAt: "2025-01-01T00:00:00+09:00",
    lastLoginAt: "2025-11-20T10:00:00+09:00",
    createdAt: "2025-01-01T00:00:00+09:00",
    updatedAt: "2025-11-20T10:00:00+09:00",
    deletedAt: null,
  },
  {
    id: 1,
    name: "システム管理者",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    emailVerifiedAt: "2025-01-01T00:00:00+09:00",
    lastLoginAt: "2025-11-20T10:00:00+09:00",
    createdAt: "2025-01-01T00:00:00+09:00",
    updatedAt: "2025-11-20T10:00:00+09:00",
    deletedAt: null,
  },

  // 店舗管理者
  {
    id: 2,
    name: "山田 太郎（店舗管理者）",
    email: "shop-owner-1@example.com",
    role: "shop_owner",
    status: "active",
    emailVerifiedAt: "2025-02-01T00:00:00+09:00",
    lastLoginAt: "2025-11-20T09:30:00+09:00",
    createdAt: "2025-02-01T00:00:00+09:00",
    updatedAt: "2025-11-20T09:30:00+09:00",
    deletedAt: null,
  },
  {
    id: 3,
    name: "佐藤 花子（店舗管理者）",
    email: "shop-owner-2@example.com",
    role: "shop_owner",
    status: "active",
    emailVerifiedAt: "2025-03-10T00:00:00+09:00",
    lastLoginAt: "2025-11-18T14:15:00+09:00",
    createdAt: "2025-03-10T00:00:00+09:00",
    updatedAt: "2025-11-18T14:15:00+09:00",
    deletedAt: null,
  },

  // インフルエンサー
  {
    id: 4,
    name: "グルメ太郎（インフルエンサー）",
    email: "influencer-1@example.com",
    role: "influencer",
    status: "active",
    emailVerifiedAt: "2025-04-01T00:00:00+09:00",
    lastLoginAt: "2025-11-19T20:00:00+09:00",
    createdAt: "2025-04-01T00:00:00+09:00",
    updatedAt: "2025-11-19T20:00:00+09:00",
    deletedAt: null,
  },
  {
    id: 5,
    name: "カフェ花子（インフルエンサー）",
    email: "influencer-2@example.com",
    role: "influencer",
    status: "pending", // 審査中の例
    emailVerifiedAt: null,
    lastLoginAt: null,
    createdAt: "2025-10-01T00:00:00+09:00",
    updatedAt: "2025-10-01T00:00:00+09:00",
    deletedAt: null,
  },

  // 一般ユーザー
  {
    id: 6,
    name: "一般ユーザーA",
    email: "user-1@example.com",
    role: "user",
    status: "active",
    emailVerifiedAt: "2025-05-01T00:00:00+09:00",
    lastLoginAt: "2025-11-20T08:00:00+09:00",
    createdAt: "2025-05-01T00:00:00+09:00",
    updatedAt: "2025-11-20T08:00:00+09:00",
    deletedAt: null,
  },
  {
    id: 7,
    name: "一般ユーザーB（利用停止）",
    email: "user-2@example.com",
    role: "user",
    status: "suspended",
    emailVerifiedAt: "2025-06-01T00:00:00+09:00",
    lastLoginAt: "2025-09-01T12:00:00+09:00",
    createdAt: "2025-06-01T00:00:00+09:00",
    updatedAt: "2025-09-01T12:00:00+09:00",
    deletedAt: null,
  },
];

// roleごとに1人取ってくる
export const getFirstUserByRole = (role: UserRole): User | undefined =>
  users.find((u) => u.role === role);

// 開発中の現在ログインユーザー（見たいロールに変える）
const DEFAULT_ROLE: UserRole | null = "shop_owner";

export const currentUser: User | null = DEFAULT_ROLE
  ? getFirstUserByRole(DEFAULT_ROLE) ?? null
  : null;

// 一応、同じファイル内に「admin権限」の判定も置いておくと便利
export const isSuperAdmin = (user: User | null | undefined): boolean =>
  !!user && user.role === "super_admin";

export const isAdminLike = (user: User | null | undefined): boolean =>
  !!user && (user.role === "admin" || user.role === "super_admin");
