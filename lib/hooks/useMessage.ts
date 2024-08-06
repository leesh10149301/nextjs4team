import { useEffect, useState } from "react";
import supabase from "@/lib/utils/supabase/client";
import {
  fetchMessages,
  fetchNickname,
} from "../../components/layout/WizChat/anonChatForm/actions/databaseService";
import { kstDate } from "@/lib/utils/kstDate";

const useMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const handleNewMessage = async (message: any) => {
    const nickname = await fetchNickname(message.user_id);
    if (nickname) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, nickname, created_at: kstDate(message.created_at) },
      ]);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await fetchMessages();
      setMessages(messages);
    };

    loadMessages();

    const subscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          await handleNewMessage(payload.new);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        async (payload) => {
          const nickname = await fetchNickname(payload.new.user_id);
          if (nickname) {
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === payload.new.id
                  ? {
                      ...payload.new,
                      nickname,
                      created_at: kstDate(payload.new.created_at),
                    }
                  : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return messages;
};

export default useMessages;
