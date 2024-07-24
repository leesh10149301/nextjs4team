import { getCookieValue } from "@/lib/getCookie";

interface IMessageItemProps {
  user_id: string;
  nickname: string;
  created_at: string;
  content: string;
}
export default function MessageItem({
  user_id,
  nickname,
  created_at,
  content,
}: IMessageItemProps) {
  const itsMe = (uuid: string) => uuid === getCookieValue("user_uuid");
  const textColor = itsMe(user_id) ? "text-red-400" : "text-gray-400";
  return (
    <div className="mb-2">
      <div className="flex items-center mb-1">
        <span className={`font-semibold ${textColor}`}>{nickname}</span>
        <span className="text-xs text-gray-500 ml-2">{created_at}</span>
      </div>
      <span className={`p-2 rounded-lg bg-gray-600 text-gray-200`}>
        {content}
      </span>
    </div>
  );
}
