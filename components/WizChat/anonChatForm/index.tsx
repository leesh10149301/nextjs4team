import { useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import ChatLog from "./ChatLog";
import { generateUser } from "./actions/generateUser";
import { addUserMessage } from "./actions/addUserMessage";

export default function AnonChatForm() {
  const [_, dispatch] = useFormState(addUserMessage, null);

  useEffect(() => {
    generateUser();
  }, []);

  return (
    <div className="p-4 flex flex-col h-full bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      {/** 메시지 나오는 영역 */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-white rounded-lg">
        <ChatLog />
      </div>
      {/** 메시지 입력 영역 */}
      <div className="mt-2 relative">
        <form action={dispatch}>
          <input
            type="text"
            name="content"
            className="flex-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            placeholder="KT Wiz 선수팀을 응원해주세요!"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-1 rounded-md"
          >
            <Image
              src={"/icons/arrow.svg"}
              alt="arrow"
              height={20}
              width={20}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
