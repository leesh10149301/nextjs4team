"use client";

import supabase from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Join() {
  // input
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
  const [isCheckedNickname, setIsCheckedNickname] = useState<boolean>(false);

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

  // 닉네임 중복
  const handleValidateNickname = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("userinfo")
        .select()
        .eq("username", nickname);

      if (error) {
        console.error("Error from Supabase:", error);
        return;
      }

      console.log("Supabase data:", data);

      if (data?.length !== 0) {
        console.log("이미 사용 중인 닉네임");
        setIsValid(false);
        setIsCheckedNickname(false);
      } else {
        console.log("사용 가능한 닉네임입니다.");
        setIsValid(true);
        setIsCheckedNickname(true);
      }
    } catch (error) {
      console.log("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      console.error("Unexpected error:", error);
    }
  };

  // 회원가입 버튼
  const handleJoinBtnClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: nickname,
          },
        },
      });
      if (error) {
        if (error.message === "User already registered") {
          console.log("사용 중 이메일");
        } else {
          console.error("Sign up error:", error);
        }
      } else {
        console.log("회원가입 성공");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // 모두 충족하면 isValid === true
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
      <form onSubmit={handleJoinBtnClick} className="flex flex-col pt-24">
        <input
          placeholder="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <div>{emailError}</div>
        <input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <div>{passwordError}</div>
        <input
          placeholder="비밀번호 확인"
          type="password"
          value={isCheckedPassword}
          onChange={handleIsCheckedPasswordInput}
          required
        />
        <div>{isCheckedPasswordError}</div>
        <div>
          <input
            placeholder="사용할 닉네임 입력"
            value={nickname}
            onChange={handleNicknameInput}
            required
          />
          <button
            type="button"
            className={`p-2 rounded ${
              isCheckedNickname
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
            onClick={handleValidateNickname}
          >
            중복확인
          </button>
        </div>
        <div>{nicknameError}</div>
        <button disabled={!isValid}>회원가입</button>
      </form>
    </>
  );
}
