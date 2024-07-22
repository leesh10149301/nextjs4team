import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import ChatbotForm from "./chatbotForm";
import AnonChatForm from "./anonChatForm";

export type ChatType = "bot" | "anonymous";

interface IChatModalProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent) => void;
}

export default function ChatModal({ isOpen, onClose }: IChatModalProps) {
  const [currentChatType, setCurrentChatType] = useState<ChatType>("bot");
  const botRef = useRef<HTMLDivElement>(null);

  const handleChatTypeChange = (type: "bot" | "anonymous") => {
    setCurrentChatType(type);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9998]" onClick={onClose}>
      <div
        ref={botRef}
        className={`fixed right-4 bottom-20 z-[9999] ${
          isOpen ? "animate-scale-up-br" : "animate-scale-down-br"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[360px] h-[600px] bg-gray-100 border border-gray-300 shadow-lg rounded-lg flex flex-col">
          <div className="flex-grow overflow-auto text-black">
            {currentChatType === "bot" ? <ChatbotForm /> : <AnonChatForm />}
          </div>
          <div className="flex justify-between border-t border-gray-300 h-16">
            <button
              onClick={() => handleChatTypeChange("bot")}
              className={`flex-1 p-2 border-r border-gray-300 transition-colors rounded-bl-lg ${
                currentChatType === "bot"
                  ? "bg-red-500 text-white"
                  : "bg-white text-red-500 hover:bg-red-100"
              }`}
            >
              WizBot
            </button>
            <button
              onClick={() => handleChatTypeChange("anonymous")}
              className={`flex-1 p-2 transition-colors rounded-br-lg ${
                currentChatType === "anonymous"
                  ? "bg-red-500 text-white"
                  : "bg-white text-red-500 hover:bg-red-100"
              }`}
            >
              응원톡
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("chatBot")
  );
}
