import { kstDate } from "@/lib/kstDate";
import supabase from "@/lib/utils/supabase/client";

export const fetchNickname = async (userId: string) => {
  const { data, error } = await supabase
    .from("anon_user")
    .select("nickname")
    .eq("id", userId)
    .single();
  if (error) {
    console.error("Error fetching nickname:", error);
    return null;
  }
  return data.nickname;
};

export const fetchMessages = async () => {
  try {
    const { data } = await supabase.rpc("get_messages_with_nicknames");
    if (data.error) {
      // console.log(data.error);
    } else {
      // 데이터 포맷팅
      const formattedData = data.map((message: any) => {
        return {
          ...message,
          created_at: kstDate(message.created_at),
        };
      });

      //   setMessages(formattedData);
      return formattedData;
    }
  } catch (err) {
    console.log(err);
  }
};
