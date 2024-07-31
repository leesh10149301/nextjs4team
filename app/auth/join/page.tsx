// src/app/components/Join.tsx
"use client";

import { useEffect, useState } from "react";
import { signUp, validateEmail, validateNickname } from "@/app/api/_auth/route";
import useUserInfo from "@/app/stores/useUserInfo";
import Link from "next/link";

export default function Join() {
  // iuput
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isCheckedPassword, setIsCheckedPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  // error
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isCheckedPasswordError, setIsCheckedPasswordError] =
    useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");

  //validate check
  const [isCheckedEmail, setIsCheckedEmail] = useState<boolean>(false);
  const [isCheckedNickname, setIsCheckedNickname] = useState<boolean>(false);

  const { setUserInfo } = useUserInfo();

  // input
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(newEmail);
    if (!newEmail) setEmailError("이메일 아이디를 입력해주세요.");
    else if (!emailRegex.test(newEmail))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!newPassword) setPasswordError("비밀번호를 입력해주세요.");
    else if (newPassword.length < 8)
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    else setPasswordError("");
  };

  const handleIsCheckedPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPasswordAgain = e.target.value;
    setIsCheckedPassword(newPasswordAgain);
    if (!newPasswordAgain)
      setIsCheckedPasswordError("비밀번호 확인을 입력해주세요.");
    else if (password !== newPasswordAgain)
      setIsCheckedPasswordError("비밀번호를 잘못 입력하셨습니다.");
    else setIsCheckedPasswordError("");
  };

  const handleNicknameInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    if (!newNickname) {
      setNicknameError("닉네임을 입력해주세요.");
      setIsCheckedNickname(false);
    } else if (newNickname.length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 합니다.");
      setIsCheckedNickname(false);
    } else {
      setNicknameError("");
      setIsCheckedNickname(false);
    }
  };

  // 이메일 중복
  const handleValidationEmail = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const message = await validateEmail(email);
      console.log(message);
      setIsCheckedEmail(true);
      setEmailError("");
    } catch (error) {
      console.log(error.message);
      setIsCheckedEmail(false);
      setEmailError(error.message);
    }
  };

  // 닉네임 중복
  const handleValidateNickname = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const message = await validateNickname(nickname);
      console.log(message);
      setIsCheckedNickname(true);
      setNicknameError("");
    } catch (error) {
      console.log(error.message);
      setIsCheckedNickname(false);
      setNicknameError(error.message);
    }
  };

  const handleJoinBtnClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      const user = await signUp(email, password, nickname);
      setUserInfo({
        email: user.user.email,
        nickname: user.user.user_metadata.username,
      });
      console.log("회원가입 성공:", user.user.user_metadata.username);
      console.log("userinfo 테이블 업데이트 완료");
    } catch (error: any) {
      console.error("회원가입 오류:", error.message);
      setEmailError(error.message);
    }
  };

  useEffect(() => {
    if (
      !email.includes("@") ||
      password.length < 8 ||
      password !== isCheckedPassword ||
      nickname.length < 2 ||
      !isCheckedNickname
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password, isCheckedPassword, nickname, isCheckedNickname]);

  return (
    <>
      <div className="flex items-center justify-center h-[700px]">
        <div className="w-[500px] h-[600px] border-4 flex flex-col justify-center items-center p-4">
          <img src="/images/ktwiz_login.png" className="w-[150px] mb-8" />
          <form
            onSubmit={handleJoinBtnClick}
            className="flex flex-col justify-center p-4"
          >
            <div>
              <input
                placeholder="이메일 주소를 입력해주세요"
                value={email}
                onChange={handleEmailInput}
                required
                className="w-[250px] mb-2 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                className={`p-2 rounded ml-4 ${
                  isCheckedEmail
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                onClick={handleValidationEmail}
              >
                중복확인
              </button>
            </div>
            <div className="text-red-500 text-sm mb-2">{emailError}</div>
            <input
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={password}
              onChange={handlePasswordInput}
              required
              className="w-[250px] mb-2 p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500 text-sm mb-2">{passwordError}</div>
            <input
              placeholder="비밀번호 확인"
              type="password"
              value={isCheckedPassword}
              onChange={handleIsCheckedPasswordInput}
              required
              className="w-[250px] mb-2 p-2 border border-gray-300 rounded"
            />
            <div className="text-red-500 text-sm mb-2">
              {isCheckedPasswordError}
            </div>
            <div>
              <input
                placeholder="사용할 닉네임 입력"
                value={nickname}
                onChange={handleNicknameInput}
                required
                className="w-[250px] mb-2 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                className={`p-2 rounded ml-4 ${
                  isCheckedNickname
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                onClick={handleValidateNickname}
              >
                중복확인
              </button>
            </div>
            <div className="text-red-500 text-sm mb-2">{nicknameError}</div>
            <button
              type="submit"
              disabled={!isValid}
              className={`p-2 rounded mb-2 ${
                isValid ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              <Link href={`/auth/logIn`}>회원가입</Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
