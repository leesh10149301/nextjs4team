"use client";

import supabase from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

export default function LogIn() {
  // input
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // error
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  // 유효성검사
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) setEmailError("이메일 아이디를 입력해주세요.");
    else if (!emailRegex.test(email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");
  };

  const validatePassword = () => {
    if (!password) setPasswordError("비밀번호를 입력해주세요.");
    else if (password.length < 8)
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    else setPasswordError("");
  };

  // 이메일 로그인
  const handleLoginBtnClick = async () => {
    validateEmail();
    validatePassword();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user !== null) {
      console.log("성공");
    } else {
      setPasswordError("이메일 혹은 비밀번호를 확인해주세요.");
      console.log("실패");
    }
  };

  // isValid === true
  useEffect(() => {
    if (!email.includes("@") || password.length < 8) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }, [email, password]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault} className="pt-24 flex flex-col">
        <input
          type="text"
          placeholder="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleEmailInput}
          required
          onBlur={validateEmail}
        />
        <div>{emailError}</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordInput}
          required
          onBlur={validatePassword}
        />
        <div>{passwordError}</div>
        <button
          type="submit"
          disabled={isValid ? false : true}
          className={`p-2 rounded ${
            isValid ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
          onClick={handleLoginBtnClick}
        >
          로그인
        </button>
      </form>
    </>
  );
}
