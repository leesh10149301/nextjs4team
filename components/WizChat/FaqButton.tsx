import { Dispatch, SetStateAction, useState } from "react";

interface IFaqButtonProps {
  faqVisible: boolean;
  setFaqVisible: Dispatch<SetStateAction<boolean>>;
}

export default function FaqButton({
  faqVisible,
  setFaqVisible,
}: IFaqButtonProps) {
  return (
    <div className="flex justify-end items-center py-1">
      <button
        type="button"
        onClick={() => setFaqVisible(!faqVisible)}
        className={`text-gray-100 bg-red-500 border border-gray-300 rounded-full px-3 py-1 transition-opacity duration-500 ${
          faqVisible ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        자주 물어보는 질문
      </button>
    </div>
  );
}
