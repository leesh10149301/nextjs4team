"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PurchaseModalProps {
  onClose: () => void;
  allAreaNames: string;
}

export default function PurchaseModal({
  onClose,
  allAreaNames,
}: PurchaseModalProps) {
  const router = useRouter();
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="p-2 flex flex-col border border-black w-1/5 h-36 rounded-md right-1/2 bottom-1/3 bg-white fixed z-50 opacity-90">
      <button
        onClick={handleClose}
        className="p-1 bg-black text-white rounded ml-auto text-sm"
      >
        닫기
      </button>
      <p className="font-semibold text-lg text-center">{allAreaNames}</p>

      <a
        href="https://www.ticketlink.co.kr/sports/baseball/62#reservation"
        rel="noopener noreferrer"
        target="_blank"
        className="mt-4 px-4 py-2 bg-[#d60c0c] text-white rounded text-center"
      >
        좌석 예매하기
      </a>
    </div>
  );
}
