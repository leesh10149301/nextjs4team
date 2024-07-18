"use client";

import { useEffect, useState, useRef } from "react";
import supabase from "@/lib/utils/supabase/client";
import { getCookieValue } from "@/lib/getCookie";

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
    }
  };

  const kstDate = (date: string) => {
    const today = new Date();
    const messageDate = new Date(date);

    const isSameDay =
      today.getFullYear() === messageDate.getFullYear() &&
      today.getMonth() === messageDate.getMonth() &&
      today.getDate() === messageDate.getDate();

    if (isSameDay) {
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const timeFormatter = new Intl.DateTimeFormat("ko-KR", timeOptions);
      return timeFormatter.format(messageDate);
    } else {
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Seoul",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const dateFormatter = new Intl.DateTimeFormat("ko-KR", dateOptions);
      return dateFormatter.format(messageDate);
    }
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
          }
        }
      )
      .subscribe();

    // 컴포넌트 언마운트 시 구독 해지
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // 메시지가 변경될 때마다 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const itsMe = (uuid: string) => uuid === getCookieValue("user_uuid");

  return (
    <div className="flex flex-col rounded-lg shadow-md h-full p-2 bg-white">
      <div className="overflow-y-auto h-[430px] mb-4 space-y-2">
        {messages.map((data, index) => {
          const textColor = itsMe(data.user_id)
            ? "text-red-400"
            : "text-gray-400";

          return (
            <div key={index} className="mb-2">
              <div className="flex items-center mb-1">
                <span className={`font-semibold ${textColor}`}>
                  {data.nickname}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {data.created_at}
                </span>
              </div>
              <span className={`p-2 rounded-lg bg-gray-600 text-gray-200`}>
                {data.content}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
