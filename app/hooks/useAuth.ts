import { useEffect, useState } from "react";
import useUserInfo from "@/app/stores/useUserInfo";
import supabase from "../../lib/utils/supabase/client";

const useAuth = () => {
  const { setUserInfo } = useUserInfo();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
      } else if (data?.user) {
        setUser(data.user);
        setUserInfo({
          email: data.user.email,
          nickname: data.user.user_metadata?.nickname || "",
        });
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
          setUserInfo({
            email: session.user.email,
            nickname: session.user.user_metadata?.nickname || "",
          });
        } else {
          setUser(null);
          setUserInfo(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUserInfo]);

  return { loading, user };
};

export default useAuth;
