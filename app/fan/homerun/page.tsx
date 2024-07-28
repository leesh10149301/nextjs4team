"use client";

import React, { useEffect, useState } from "react";
import PlayerCard from "@/app/fan/homerun/_components/PlayerCard";
import StadiumMap from "@/app/fan/homerun/_components/StadiumMap";
import Description from "./_components/Description";
import { useRouter } from "next/navigation";
import PurchaseModal from "./@modal/(.)purchase/page";

export interface PlayerHomerunData {
  playerId: number;
  x_coord: number;
  y_coord: number;
}

export default function Page() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [playersHomerunData, setPlayersHomerunData] = useState<
    PlayerHomerunData[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [allAreaNames, setAllAreaNames] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [previousPath, setPreviousPath] = useState<string>("");

  const router = useRouter();

  const handleCardSelect = (playerId: number | null) => {
    setSelectedPlayerId(playerId);
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    console.log("상위페이지", allAreaNames);
    if (allAreaNames) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        setPreviousPath(window.location.pathname);
      }, 500);
      return () => clearTimeout(timer); // 클린업 함수
    }
  }, [allAreaNames]);

  const handleStadiumData = (areaNames: string) => {
    console.log("handleStadiumData called with:", areaNames);
    setAllAreaNames((prev) =>
      prev !== areaNames ? areaNames : areaNames + " "
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push(previousPath);
  };

  const getPlayersHomerunData = async () => {
    try {
      const response = await fetch("/api/homerun/predict/players");

      if (response.ok) {
        const allPlayers = await response.json();

        const homerunData = await Promise.all(
          allPlayers.map(async (player: any) => {
            const res = await fetch(`/api/homerun/predict/${player.id}`);
            console.log(res);
            return res.json();
          })
        );
        setPlayersHomerunData(homerunData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
      setPlayersHomerunData([]);
    }
  };

  useEffect(() => {
    getPlayersHomerunData();
  }, []);

  return (
    <div className="flex flex-col p-10">
      <div className="flex mb-10">
        <Description />
      </div>

      <div className="flex flex-row">
        <StadiumMap
          playersHomerunData={playersHomerunData}
          selectedPlayerId={selectedPlayerId}
          error={error}
          onStadiumData={handleStadiumData}
        />

        <PlayerCard onCardSelect={handleCardSelect} />
      </div>

      {isModalOpen && (
        <PurchaseModal onClose={handleModalClose} allAreaNames={allAreaNames} />
      )}
    </div>
  );
}
