"use client";

import { useEffect, useState } from "react";
import useUserInfo from "@/app/stores/useUserInfo";
import { LoginApi } from "@/app/api/auth/route";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const { setUserInfo } = useUserInfo();
  const router = useRouter();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUserInfo() {
      const response = await fetch("/api/auth");
      const data = await response.json();
      setUsers(data);
      console.log(data);
    }

    fetchUserInfo();
  }, []);

  // inp;ut
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  // validate check
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

  const handleLoginBtnClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (emailError || passwordError) return;

    try {
      const user = await LoginApi(email, password);
      setUserInfo({
        email: user.email,
        nickname: user.username,
      });
      console.log("로그인 성공:", user.username);
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

  return (
    <div className="flex items-center justify-center h-[680px]">
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user}</p>
          </li>
        ))}
      </ul>
      <div className="w-[800px] h-[393px] border-4 flex justify-center items-center p-4">
        <img src="/images/ktwiz_login.png" className="w-[150px] mr-8" />
        <div className="w-[80px]"></div> {/* 가운데 여백 */}
        <form
          onSubmit={handleLoginBtnClick}
          className="flex flex-col justify-center p-4"
        >
          <input
            placeholder="이메일 주소를 입력해주세요"
            value={email}
            onChange={handleEmailInput}
            required
            onBlur={validateEmail}
            className="w-[250px] mb-2 p-2 border border-gray-300 rounded"
          />
          <div className="text-red-500 text-sm mb-2">{emailError}</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordInput}
            required
            onBlur={validatePassword}
            className="w-[250px] mb-2 p-2 border border-gray-300 rounded"
          />
          <div className="text-red-500 text-sm mb-2">{passwordError}</div>
          <button
            disabled={!isValid}
            className={`p-2 rounded mb-2 ${
              isValid
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white w-[250px]"
            }`}
          >
            로그인
          </button>
          <div className="flex justify-center w-full">
            <Link
              href={`/auth/join`}
              className="p-2 bg-gray-300 text-black rounded w-[250px] text-center"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}