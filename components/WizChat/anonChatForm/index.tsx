"use client";

import { useEffect } from "react";
import { generateUser } from "./actions/generateUser";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function AnonChatForm() {
  useEffect(() => {
    generateUser();
  }, []);

  return (
    <div className="p-4 flex flex-col h-full bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex-1 space-y-2 rounded-lg">
        <div className="flex flex-col rounded-lg shadow-md h-full p-2 bg-white">
          <MessageList />
        </div>
      </div>
      <MessageInput />
    </div>
  );
}
