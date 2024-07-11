"use client";

import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import ChatbotForm from "./chatbotForm";
import AnonChatForm from "./anonChatForm";

export type ChatType = "bot" | "anonymous";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const botRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [chatType, setChatType] = useState<ChatType>("bot");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (botRef.current && !botRef.current.contains(event.target as Node)) {
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 0);
    }
  };

  const handleChatTypeChange = (type: ChatType) => {
    setChatType(type);
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isClient && !isOpen && (
        <button
          className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-800 via-gray-900 to-black fixed bottom-4 right-4 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg z-50 ab"
          onClick={handleButtonClick}
        >
          <div className="relative size-16">
            <Image
              src={"/icons/img-logo-black.svg"}
              alt="logo"
              fill
              className="transform transition-transform hover:rotate-12"
            />
          </div>
        </button>
      )}
      {isClient &&
        isOpen &&
        ReactDOM.createPortal(
          <div
            ref={botRef}
            className={`fixed right-4 bottom-20 z-50 ${
              isOpen ? "animate-scale-up-br" : "animate-scale-down-br"
            }`}
            onAnimationEnd={handleAnimationEnd}
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
          </div>,
          document.getElementById("chatBot")
        )}
    </>
  );
}
