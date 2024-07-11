import useUserInfo from "@/app/stores/useUserInfo";

export default function AuthBottons() {
  const { userInfo, deleteUserInfo } = useUserInfo();

  const handleLogout = () => {
    deleteUserInfo();
  };

  if (userInfo.email) {
    return <button onClick={handleLogout}>로그아웃</button>;
  }
  return (
    <>
      <button>로그인</button>
      <button>로그아웃</button>
    </>
  );
}
