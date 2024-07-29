"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/app/utils/supabase/client";

// 중복 생성 방지
let hasGenerated = false;

export async function generateUser() {
  const cookieStore = cookies();
  // 쿠키에서 UUID 조회
  const hasUuid = cookieStore.has("user_uuid");
  if (hasUuid) {
    const { data: user, error } = await supabase
      .from("anon_user")
      .select("*")
      .eq("id", cookieStore.get("user_uuid").value)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }

    return user;
  } else if (!hasGenerated) {
    hasGenerated = true;

    const id = uuidv4();
    const nickname = generateNickname();

    // Supabase에 새로운 유저 저장
    const { data: newUser, error } = await supabase
      .from("anon_user")
      .insert([{ id, nickname }])
      .single();

    if (error) {
      console.error("Error creating user:", error);
      hasGenerated = false;
      return null;
    }

    // 쿠키에 UUID 저장
    cookies().set("user_uuid", id);

    return newUser;
  }

  return null;
}

const bigTemplates = [
  "열심히 응원하는 빅",
  "용감하게 외치는 빅",
  "끈기 있게 응원하는 빅",
  "밝게 웃는 빅",
  "춤추며 응원하는 빅",
];

const ttoriTemplates = [
  "신나게 응원하는 또리",
  "활기차게 외치는 또리",
  "열정적으로 응원하는 또리",
  "즐겁게 웃는 또리",
  "노래 부르며 응원하는 또리",
];

function getRandomNickname(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

function generateNickname() {
  const bigOrTtori = Math.random() < 0.5 ? bigTemplates : ttoriTemplates;
  const nickname = getRandomNickname(bigOrTtori);
  const randomNumber = generateRandomNumber();
  return `${nickname} ${randomNumber}`;
}
