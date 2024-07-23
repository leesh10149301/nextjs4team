import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

type ChatLog = {
  role: "user" | "assistant" | "system";
  content: string;
};

interface IChatLogProps {
  log: ChatLog[];
  isLoading: boolean;
}
export default function ChatLog({ log, isLoading }: IChatLogProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [log]);

  const sanitizeHTML = (html: string) => DOMPurify.sanitize(html);

  return (
    <div className="flex flex-col h-full max-h-[420px] overflow-y-auto space-y-2">
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
  );
}
