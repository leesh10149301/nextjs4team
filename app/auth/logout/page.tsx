// src/app/components/Logout.tsx
"use client";

import useUserInfo from "@/app/stores/useUserInfo";
import { LogoutApi } from "@/app/api/auth/route";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { deleteUserInfo } = useUserInfo();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await LogoutApi();
      deleteUserInfo();
      console.log("로그아웃 성공");
      router.push("/");
    } catch (error: any) {
      console.error("로그아웃 오류:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 rounded bg-red-500 text-white"
    >
      로그아웃
    </button>
  );
}
