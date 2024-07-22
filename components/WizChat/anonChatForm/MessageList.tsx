import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import useMessages from "./hooks/useMessage";

export default function MessageList() {
  const messages = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="overflow-y-auto h-[430px] mb-4 space-y-2">
      {messages.map((data, index) => (
        <MessageItem key={index} {...data} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
