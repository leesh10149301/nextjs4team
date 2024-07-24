"use client";

import { useState } from "react";
import { MESSAGES } from "@/lib/constants/chatbot";
import { gptModel } from "./actions/gptModel";
import FaqButton from "../FaqButton";
import ChatLog from "./ChatLog";
import FaqList from "./FaqList";
import InputForm from "./InputForm";
import { FaqProvider } from "./FaqProvider";

type ChatLog = {
  role: "user" | "assistant" | "system";
  content: string;
};

const initialLog: ChatLog[] = [
  { role: "assistant", content: MESSAGES.WELCOME },
];

export default function ChatbotForm() {
  const [log, setLog] = useState(initialLog);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [faqClick, setFaqClick] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const userMessage: ChatLog = { role: "user", content: input };
    setLog((prevLog) => [...prevLog, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await gptModel(input);
      const assistantMessage: ChatLog = {
        role: "assistant",
        content: response,
      };
      setLog((prevLog) => [...prevLog, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatLog = {
        role: "assistant",
        content: MESSAGES.SERVER_ERROR,
      };
      setLog((prevLog) => [...prevLog, errorMessage]);
    } finally {
      setIsLoading(false);
      setFaqClick(false);
    }
  };

  const handleFaqClick = (question: string) => {
    setInput(question);
    setFaqClick(true);
  };

  return (
    <FaqProvider>
      <div className="relative h-full">
        <div className="p-4 flex flex-col h-full">
          <ChatLog log={log} isLoading={isLoading} />
          <div className="flex flex-col mt-auto">
            <FaqButton />
            <FaqList handleFaqClick={handleFaqClick} />
            <InputForm
              input={input}
              setInput={setInput}
              faqClick={faqClick}
              setFaqClick={setFaqClick}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </FaqProvider>
  );
}
