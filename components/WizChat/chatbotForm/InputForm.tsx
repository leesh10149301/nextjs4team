import { useFaqStore } from "@/lib/stores/faqStore";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface IInputFormProps {
  input: string;
  faqClick: boolean;
  setInput: (input: string) => void;
  setFaqClick: (state: boolean) => void;
  handleSubmit: (e?: React.FormEvent) => void;
}
export default function InputForm({
  input,
  faqClick,
  setInput,
  setFaqClick,
  handleSubmit,
}: IInputFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { setFaqVisible } = useFaqStore();

  useEffect(() => {
    if (input && formRef.current && faqClick) {
      formRef.current.requestSubmit();
      setFaqVisible(false);
      setFaqClick(false);
    }
  }, [input, faqClick]);
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center"
      ref={formRef}
    >
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
          <Image src={"/icons/arrow.svg"} alt="arrow" height={20} width={20} />
        </button>
      )}
    </form>
  );
}
