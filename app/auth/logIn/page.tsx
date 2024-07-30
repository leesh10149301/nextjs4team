"use client";

import { useState, useEffect } from "react";
import useUserInfo from "@/app/stores/useUserInfo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";
import { LoginApi } from "@/app/api/auth/route";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const { setUserInfo } = useUserInfo();
  const router = useRouter();
  const { loading, user } = useAuth();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("이메일 아이디를 입력해주세요.");
    } else if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleLoginBtnClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (emailError || passwordError) return;

    try {
      const user = await LoginApi(email, password);
      setUserInfo({
        email: user.email,
        nickname: user.user_metadata?.nickname || "",
      });
      router.push("/");
    } catch (err: any) {
      setPasswordError(err.message);
    }
  };

  useEffect(() => {
    if (!email.includes("@") || password.length < 8) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }, [email, password]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="flex items-center justify-center h-[700px]">
      {user ? (
        <div className="flex flex-col items-center"></div>
      ) : (
        <div className="w-[500px] h-[500px] max-w-md p-4 border-4 flex flex-col items-center justify-center">
          <img src="/images/ktwiz_login.png" className="w-[150px] mb-4" />
          <form
            onSubmit={handleLoginBtnClick}
            className="w-full flex flex-col items-center"
          >
            <input
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={handleEmailInput}
              required
              onBlur={validateEmail}
              className="w-2/3 mb-2 p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500 text-sm mb-2">{emailError}</div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePasswordInput}
              required
              onBlur={validatePassword}
              className="w-2/3 mb-2 p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500 text-sm mb-2">{passwordError}</div>
            <button
              disabled={!isValid}
              className={`p-2 rounded mb-2 w-2/3 ${
                isValid ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}
            >
              로그인
            </button>
            <Link
              href={`/auth/join`}
              className="p-2 bg-gray-300 text-black rounded w-2/3 text-center"
            >
              회원가입
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
