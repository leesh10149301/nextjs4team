import supabase from "@/app/utils/supabase/client";

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
