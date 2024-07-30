"use client";

import useUserInfo from "@/app/stores/useUserInfo";
import { useRouter } from "next/navigation";
import supabase from "@/app/utils/supabase/client";

export default function Logout() {
  const { deleteUserInfo } = useUserInfo();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error("로그아웃 중 오류가 발생하였습니다.");

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
