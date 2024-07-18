// src/app/stores/useUserInfo.ts
import { create } from "zustand";

interface userInfoType {
  email: string;
  nickname: string;
}

interface UserInfoState {
  userInfo: userInfoType;
  isLoggedIn: boolean;
}

interface UserInfoActions {
  setUserInfo: (userInfo: userInfoType) => void;
  deleteUserInfo: () => void;
}

const defaultState = { email: "", nickname: "" };

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  isLoggedIn: false,
  setUserInfo: (userInfo: userInfoType) => {
    set({ userInfo, isLoggedIn: true });
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState, isLoggedIn: false });
  },
}));

export default useUserInfo;
