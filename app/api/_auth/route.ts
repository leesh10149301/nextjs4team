import supabase from "@/lib/utils/supabase/client";

// 로그인 유지시키는 코드
export const getId = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log("getId error", error);
    return null;
  }
  return data?.session?.user?.id || null;
};

const addUserInfo = async (userId: string, email: string, nickname: string) => {
  try {
    const { error } = await supabase
      .from("userinfo")
      .insert([{ id: userId, email: email, username: nickname }]);

    if (error) {
      console.error("userinfo 테이블에 데이터 삽입 중 오류 발생:", error);
      throw new Error("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error: " + error.message);
  }
};

// 회원가입
export const signUp = async (email, password, nickname) => {
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
      const user = data.user;
      await addUserInfo(user.id, email, nickname);
      return data;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error: " + error.message);
  }
};

// 이메일 중복 확인
export const validateEmail = async (email) => {
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

// 닉네임 중복 확인
export const validateNickname = async (nickname) => {
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

    const user = data.user;

    // username 가져오기
    const { data: userinfo, error: userinfoError } = await supabase
      .from("userinfo")
      .select("username")
      .eq("id", user.id)
      .single();

    if (userinfoError) throw new Error("사용자 이름 가져오는데 실패했습니다.");

    return { ...user, username: userinfo.username };
  } catch (err: any) {
    console.error("로그인 요청 중 오류 발생:", err.message);
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

// username으로 사용자 정보 가져오기
export const getUserByUsername = async (username) => {
  try {
    const { data, error } = await supabase
      .from("userinfo")
      .select("*")
      .eq("username", username)
      .single();

    if (error) {
      console.error("Error from Supabase:", error);
      throw new Error("사용자 정보를 가져오는데 실패하였습니다.");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error: " + error.message);
  }
};

// username으로 사용자 정보 업데이트
export const updateUserByUsername = async (username, updateData) => {
  try {
    const { data, error } = await supabase
      .from("userinfo")
      .update(updateData)
      .eq("username", username);

    if (error) {
      console.error("Error from Supabase:", error);
      throw new Error("사용자 정보를 업데이트하는데 실패하였습니다.");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error: " + error.message);
  }
};

// username으로 사용자 삭제
export const deleteUserByUsername = async (username) => {
  try {
    const { data, error } = await supabase
      .from("userinfo")
      .delete()
      .eq("username", username);

    if (error) {
      console.error("Error from Supabase:", error);
      throw new Error("사용자를 삭제하는데 실패하였습니다.");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error: " + error.message);
  }
};

// 유저 정보 가져오기
const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

const getTargetUserinfo = async () => {
  const { data: usernameData } = await supabase
    .from("userinfo")
    .select("username");
  return usernameData;
};
