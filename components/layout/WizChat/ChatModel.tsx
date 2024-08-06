import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import ChatbotForm from "./chatbotForm";
import AnonChatForm from "./anonChatForm";
import ChatButton from "./ChatButton";

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
            <ChatButton
              isActive={currentChatType === "bot"}
              onClick={() => handleChatTypeChange("bot")}
              label="WizBot"
              className="border-r border-gray-300 rounded-bl-lg"
            />
            <ChatButton
              isActive={currentChatType === "anonymous"}
              onClick={() => handleChatTypeChange("anonymous")}
              label="응원톡"
              className="rounded-br-lg"
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("chatBot")
  );
}
