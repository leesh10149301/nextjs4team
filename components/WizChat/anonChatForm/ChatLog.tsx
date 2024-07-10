"use client";

import { useEffect, useState, useRef } from "react";
import supabase from "@/lib/utils/supabase/client";

interface IChatLogProps {}

export default function ChatLog(props: IChatLogProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchNickname = async (userId: string) => {
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

  const handleNewMessage = async (message: any) => {
    const nickname = await fetchNickname(message.user_id);
    if (nickname) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, nickname, created_at: kstDate(message.created_at) },
      ]);
      scrollToBottom();
    }
  };

  const kstDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Seoul",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formatter = new Intl.DateTimeFormat("ko-KR", options);
    const formattedDate = formatter.format(new Date(date));

    return formattedDate;
  };

  // 유저 및 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase.rpc(
          "get_messages_with_nicknames"
        );
        if (data.error) {
          console.log(data.error);
        } else {
          // 데이터 포맷팅
          const formattedData = data.map((message: any) => {
            return {
              ...message,
              created_at: kstDate(message.created_at),
            };
          });

          setMessages(formattedData);
          scrollToBottom();
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();

    // Realtime 메시지 구독 설정 (읽기와 쓰기만 구독)
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
            scrollToBottom();
          }
        }
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해지
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="flex flex-col p-4 max-w-lg mx-auto rounded-lg shadow-md">
      <div className="overflow-y-auto h-96 mb-4 space-y-2">
        {messages.map((data, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center mb-1">
              <span className="text-base font-semibold text-gray-400">
                {data.nickname}
              </span>
            </div>
            <span className="bg-gray-200 p-2 rounded-lg">{data.content}</span>
            <span className="text-xs text-gray-500 ml-2">
              {data.created_at}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
