"use client";

import { useState } from "react";
import ChatbotForm from "./chatbotForm";
import Image from "next/image";

export type ChatLog = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="w-20 h-20 rounded-full bg-neutral-900 absolute bottom-4 right-4 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src={"icon/img-logo-black.svg"}
          alt="logo"
          width={64}
          height={64}
        />
      </button>
      {isOpen && <ChatbotForm />}
    </>
  );
}
