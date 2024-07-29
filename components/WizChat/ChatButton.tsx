interface IChatButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  className?: string;
}
export default function ChatButton({
  isActive,
  onClick,
  label,
  className,
}: IChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 p-2 transition-colors ${className} ${
        isActive
          ? "bg-red-500 text-white"
          : "bg-white text-red-500 hover:bg-red-100"
      }`}
    >
      {label}
    </button>
  );
}
