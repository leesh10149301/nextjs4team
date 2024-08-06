import React, { useState } from "react";
import Image from "next/image";
import { addUserMessage } from "./actions/addUserMessage";

export default function MessageInput() {
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addUserMessage(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="mt-2 relative">
      <input
        type="text"
        value={value}
        name="content"
        className="flex-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        placeholder="KT Wiz 선수팀을 응원해주세요!"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-1 rounded-md"
      >
        <Image src={"/icons/arrow.svg"} alt="arrow" height={20} width={20} />
      </button>
    </form>
  );
}
