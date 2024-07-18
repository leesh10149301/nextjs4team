"use client";

import { useState, useRef, useEffect, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import ChatbotForm from "./chatbotForm";
import AnonChatForm from "./anonChatForm";

export type ChatType = "bot" | "anonymous";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [chatType, setChatType] = useState<ChatType>("bot");
  const botRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //클라이언트에서만 작동하도록
    setIsClient(true);
  }, []);

  const handleOpenChatbot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleCloseChatbot: MouseEventHandler<HTMLDivElement> = (event) => {
    if (botRef.current && !botRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleChatTypeChange = (type: ChatType) => {
    setChatType(type);
  };

  return (
    <>
      {isClient && !isOpen && (
        <button
          className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-800 via-gray-900 to-black fixed bottom-4 right-4 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg z-50"
          onClick={handleOpenChatbot}
        >
          <div className="relative size-16">
            <Image
              src={"/icons/img-logo-black.svg"}
              alt="logo"
              priority
              fill
              className="transform transition-transform hover:rotate-12"
            />
          </div>
        </button>
      )}
      {isClient &&
        isOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-[9998]" onClick={handleCloseChatbot}>
            <div
              ref={botRef}
              className={`fixed right-4 bottom-20 z-[9999] ${
                isOpen ? "animate-scale-up-br" : "animate-scale-down-br"
              }`}
              onClick={(e) => e.stopPropagation()} // 클릭 이벤트의 전파를 막음
            >
              <div className="w-[360px] h-[600px] bg-gray-100 border border-gray-300 shadow-lg rounded-lg flex flex-col">
                <div className="flex-grow overflow-auto text-black">
                  {chatType === "bot" ? <ChatbotForm /> : <AnonChatForm />}
                </div>
                <div className="flex justify-between border-t border-gray-300 h-16">
                  <button
                    onClick={() => handleChatTypeChange("bot")}
                    className={`flex-1 p-2 border-r border-gray-300 transition-colors rounded-bl-lg ${
                      chatType === "bot"
                        ? "bg-red-500 text-white"
                        : "bg-white text-red-500 hover:bg-red-100"
                    }`}
                  >
                    WizBot
                  </button>
                  <button
                    onClick={() => handleChatTypeChange("anonymous")}
                    className={`flex-1 p-2 transition-colors rounded-br-lg ${
                      chatType === "anonymous"
                        ? "bg-red-500 text-white"
                        : "bg-white text-red-500 hover:bg-red-100"
                    }`}
                  >
                    응원톡
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById("chatBot")
        )}
    </>
  );
}
