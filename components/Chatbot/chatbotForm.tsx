"use client";

import { gptChatBot } from "./actions";
import { ChatLog } from ".";
import { useState, useEffect, useRef } from "react";
import { MESSAGES } from "@/lib/constants/chatbot";

const initialLog: ChatLog[] = [
  { role: "assistant", content: MESSAGES.WELCOME },
];

export default function ChatbotForm() {
  const [log, setLog] = useState(initialLog);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const logEndRef = useRef<null | HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage: ChatLog = { role: "user", content: input };
    setLog((prevLog) => [...prevLog, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await gptChatBot(input);
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
    }
  };

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [log]);

  useEffect(() => {
    //FAQ 리스트 업
  }, []);

  return (
    <div className="w-[360px] h-96 bg-white border border-black shadow-lg rounded-lg fixed right-4 bottom-28 transition-opacity">
      <form onSubmit={handleSubmit} className="p-4 flex flex-col h-full">
        <div className="flex flex-col h-full overflow-y-auto space-y-2">
          {log.map((entry: ChatLog, index: number) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-max ${
                entry.role === "user"
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start"
              }`}
            >
              <span className="inline-block text-gray-700">
                {entry.content}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="rounded-md bg-gray-100 self-start animate-pulse h-4 mb-2">
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          )}
          <div ref={logEndRef} />
        </div>
        <div className="text-end">
          <button
            type="button"
            onClick={() => setFaqVisible(!faqVisible)}
            className="text-blue-500"
          >
            FAQ
          </button>
        </div>
        {faqVisible && (
          <div className="flex flex-col text-end gap-1 absolute z-10 right-5 bottom-20 items-end *:text-sm">
            <span className="bg-red-100 p-1.5 rounded-md inline-block w-auto">
              강백호 선수에 대해 알려줘.
            </span>
            <span className="bg-red-200 p-1.5 rounded-md inline-block w-auto">
              KT Wiz는 언제 창단되었어?
            </span>
            <span className="bg-red-300 p-1.5 rounded-md inline-block w-auto">
              KT Wiz의 인기 선수는 누구야?
            </span>
          </div>
        )}
        <div className="flex flex-col mt-auto">
          <input
            type="text"
            name="question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="무엇이든 물어보세요."
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button type="submit" className="hidden">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
