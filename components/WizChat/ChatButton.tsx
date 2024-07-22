import Image from "next/image";

export default function ChatButton({ onClick }) {
  return (
    <button
      className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-800 via-gray-900 to-black fixed bottom-4 right-4 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg z-50"
      onClick={onClick}
    >
      <div className="relative size-16">
        <Image
          src={"/icons/img-logo-black.svg"}
          alt="logo"
          priority
          fill
          className="transform transition-transform hover:rotate-12"
        />
      </div>
    </button>
  );
}
