import { create } from "zustand";

interface userInfoType {
  email: string;
  nickname: string;
}

interface UserInfoState {
  userInfo: userInfoType;
}

interface UserInfoActions {
  setUserInfo: (userInfo: userInfoType) => void;
  deleteUserInfo: () => void;
}

const defaultState = { email: "", nickname: "" };

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  setUserInfo: (userInfo: userInfoType) => {
    set({ userInfo });
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState });
  },
}));

export default useUserInfo;
