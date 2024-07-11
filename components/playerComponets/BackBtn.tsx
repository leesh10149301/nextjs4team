"use client";
import { useRouter } from "next/navigation";
export default function BackBtn() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-[1100px] my-[1%] border-b-2 border-red-200">
      <button className="" onClick={handleBack}>
        뒤로가기
      </button>
    </div>
  );
}
