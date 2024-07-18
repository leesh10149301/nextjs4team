"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MESSAGES, INIT_FAQ_SENTENCE } from "@/lib/constants/chatbot";
import DOMPurify from "dompurify";
import supabase from "@/lib/utils/supabase/client";
import { gptModel } from "./actions/gptModel";
import FaqButton from "../FaqButton";

type ChatLog = {
  role: "user" | "assistant" | "system";
  content: string;
};

const initialLog: ChatLog[] = [
  { role: "assistant", content: MESSAGES.WELCOME },
];

const colors = ["bg-red-600", "bg-red-500", "bg-red-400"];

export default function ChatbotForm() {
  const [log, setLog] = useState(initialLog);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const [faqClick, setFaqClick] = useState(false);
  const [faqData, setFaqData] =
    useState<{ sentence: string }[]>(INIT_FAQ_SENTENCE);

  const logEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const faqRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // XXS 방지용 소독
  const sanitizeHTML = (html: string) => DOMPurify.sanitize(html);

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

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [log]);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const { data, error } = await supabase
          .from("sentence")
          .select("sentence")
          .order("count", { ascending: false })
          .limit(3);

        if (error) {
          throw new Error(`Error fetching top sentences: ${error.message}`);
        }
        if (data.length > 0) setFaqData(data);
      } catch (error) {
        console.error("Error in fetchTopSentences:", error);
        throw error;
      }
    };

    fetchFaqData();
  }, []);

  useEffect(() => {
    if (input && formRef.current && faqClick) {
      formRef.current.requestSubmit();
      setFaqVisible(false);
      setFaqClick(false);
    }
  }, [input, faqClick]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        faqRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setFaqVisible(false);
      }
    };

    if (faqVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [faqVisible]);

  const handleFaqClick = (question: string) => {
    setInput(question);
    setFaqClick(true);
  };

  const setFaqRef = (index: number, el: HTMLButtonElement | null) => {
    faqRefs.current[index] = el;
  };

  return (
    <div className="relative h-full">
      <form
        onSubmit={handleSubmit}
        className="p-4 flex flex-col h-full"
        ref={formRef}
      >
        <div className="flex flex-col h-full overflow-y-auto space-y-2">
          {log.map((entry: ChatLog, index: number) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-max ${
                entry.role === "user"
                  ? "bg-red-100 text-red-800 self-end"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              <p
                className="inline-block [&>a]:text-blue-400"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(entry.content),
                }}
              ></p>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-full">
              <div className="rounded-md bg-gray-300 animate-pulse h-8 mb-2 flex-grow" />
            </div>
          )}
          <div ref={logEndRef} />
        </div>
        <div className="flex flex-col mt-auto">
          <FaqButton faqVisible={faqVisible} setFaqVisible={setFaqVisible} />
          {faqData.map((faq, index) => (
            <button
              type="button"
              key={index}
              ref={(el) => setFaqRef(index, el)}
              className={`absolute right-4 p-1.5 rounded-md text-gray-100 mb-2 ${
                colors[index % colors.length]
              } ${faqVisible ? "animate-scale-up-hor-left" : "hidden"}`}
              style={{
                bottom: `${4 + index * 2.5}rem`,
                animationDelay: `${index * 0.2}s`,
              }}
              onClick={() => handleFaqClick(faq.sentence)}
            >
              {faq.sentence}
            </button>
          ))}
          <div className="relative flex items-center">
            <input
              type="text"
              name="question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="무엇이든 물어보세요."
              className="p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 flex-grow"
            />
            {input.length > 0 && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-md"
              >
                <Image
                  src={"/icons/arrow.svg"}
                  alt="arrow"
                  height={20}
                  width={20}
                />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
