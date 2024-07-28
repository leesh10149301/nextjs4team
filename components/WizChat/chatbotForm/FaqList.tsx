import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { INIT_FAQ_SENTENCE } from "@/lib/constants/chatbot";
import supabase from "@/lib/utils/supabase/client";
import { useFaq } from "./FaqProvider";

const FAQ_COLOR = ["bg-red-600", "bg-red-500", "bg-red-400"];

interface IFaqListProps {
  handleFaqClick: (question: string) => void;
}
export default function FaqList({ handleFaqClick }: IFaqListProps) {
  const [faqData, setFaqData] =
    useState<{ sentence: string }[]>(INIT_FAQ_SENTENCE);
  const { faqVisible, setFaqVisible } = useFaq();
  const faqRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  const setFaqRef = (index: number, el: HTMLButtonElement | null) => {
    faqRefs.current[index] = el;
  };

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

  return (
    <>
      {faqData.map((faq, index) => (
        <button
          type="button"
          key={index}
          ref={(el) => setFaqRef(index, el)}
          className={`absolute right-4 p-1.5 rounded-md text-gray-100 mb-2 ${
            FAQ_COLOR[index % FAQ_COLOR.length]
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
    </>
  );
}
