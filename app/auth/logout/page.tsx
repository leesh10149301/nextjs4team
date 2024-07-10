"use client";

import supabase from "@/app/utils/supabase/client";
import { useState } from "react";

export default function LogOut() {
  const user = useState("");
  const handleLogoutBtnClick = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
    }
    if (!user) {
      // 회원가입 페이지로 이동
    }
  };
  return (
    <>
      <button onClick={handleLogoutBtnClick}>
        {user ? "로그아웃" : "로그인"}
      </button>
    </>
  );
}
