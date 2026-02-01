// app/mypage/page.tsx - マイページ入口
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/fixtures/users.fixture";

export default function MypageIndexPage() {
  const user = currentUser;

  // 未ログインならログインページへ
  if (!user) {
    redirect("/login");
  }

  // ロールに応じてデフォルトページへリダイレクト
  switch (user.role) {
    case "shop_owner":
      redirect("/mypage/shop");
    case "influencer":
      redirect("/mypage/influencer");
    default:
      redirect("/mypage/me");
  }
}
