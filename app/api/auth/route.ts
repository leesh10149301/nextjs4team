import supabase from "@/app/utils/supabase/client";

// 회원가입
export const signUp = async (
  email: string,
  password: string,
  nickname: string
) => {
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
        throw new Error("사용 중인 이메일입니다.");
      } else {
        throw new Error(error.message);
      }
    } else {
      return data;
    }
  } catch (error) {
    throw new Error("Unexpected error: " + error);
  }
};

// 이메일 중복
export const validateEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("userinfo")
      .select()
      .eq("email", email);

    console.log(email);
    console.log("email", data);

    if (error) {
      console.error("Error from Supabase:", error);
      throw new Error("Error from Supabase: " + error.message);
    }

    if (data?.length !== 0) {
      console.error("Email already in use:", email);
      throw new Error("이미 사용 중인 이메일입니다.");
    } else {
      return "사용 가능한 이메일입니다.";
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error: " + error.message);
  }
};

// 닉네임 중복
export const validateNickname = async (nickname: string) => {
  try {
    const { data, error } = await supabase
      .from("userinfo")
      .select()
      .eq("username", nickname);

    console.log(nickname);
    console.log("data", data);

    if (error) {
      console.error("Error from Supabase:", error);
      throw new Error("Error from Supabase: " + error.message);
    }

    if (data?.length !== 0) {
      console.error("Nickname already in use:", nickname);
      throw new Error("이미 사용 중인 닉네임입니다.");
    } else {
      return "사용 가능한 닉네임입니다.";
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error: " + error.message);
  }
};

// 로그인
export const LoginApi = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("이메일 혹은 비밀번호를 확인해주세요.");
    }

    return data.user;
  } catch (err) {
    console.error("로그인 요청 중 오류 발생:", err);
    throw new Error("로그인에 실패하였습니다.");
  }
};

// 로그아웃
export const LogoutApi = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("로그아웃 중 오류가 발생하였습니다.");
    }

    return true;
  } catch (error) {
    console.log("로그아웃 요청 중 오류 발생", error);
    throw new Error("로그아웃에 실패하였습니다.");
  }
};
