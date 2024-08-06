"use client";

import { useState, useEffect, MouseEventHandler } from "react";
import BotFloatButton from "./BotFloatButton";
import ChatModal from "./ChatModel";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    //클라이언트에서만 작동하도록
    setIsClient(true);
  }, []);

  const handleOpenChatbot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleCloseChatbot: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsOpen(false);
  };

  return (
    <>
      {isClient && !isOpen && <BotFloatButton onClick={handleOpenChatbot} />}
      {isClient && isOpen && (
        <ChatModal isOpen={isOpen} onClose={handleCloseChatbot} />
      )}
    </>
  );
}
