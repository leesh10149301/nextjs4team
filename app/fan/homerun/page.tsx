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

interface Player {
  id: string;
  created_at: string;
  p_code: number;
  player_name: string;
  back_number: number;
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
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const router = useRouter();

  const handleCardSelect = (playerId: number | null) => {
    setSelectedPlayerId(playerId);
    setTooltipVisible(true);
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
        const allPlayers: Player[] = await response.json();

        const homerunData: PlayerHomerunData[] = await Promise.all(
          allPlayers.map(async (player: Player) => {
            const res = await fetch(`/api/homerun/predict/${player.id}`);
            if (res.ok) {
              const data = await res.json();
              return {
                playerId: parseInt(player.id, 10),
                x_coord: data.x_coord,
                y_coord: data.y_coord,
              } as PlayerHomerunData;
            } else {
              throw new Error(`Failed to fetch data for player ${player.id}`);
            }
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
    <div className="flex justify-center">
      <div className="p-10 w-[1200px]">
        <div className="flex mb-10">
          <Description />
        </div>

        <div className="flex flex-row border">
          <StadiumMap
            playersHomerunData={playersHomerunData}
            selectedPlayerId={selectedPlayerId}
            error={error}
            onStadiumData={handleStadiumData}
            tooltipVisible={tooltipVisible}
            setTooltipVisible={setTooltipVisible}
          />

          <PlayerCard
            onCardSelect={handleCardSelect}
            setTooltipVisible={setTooltipVisible}
          />
        </div>

        {isModalOpen && (
          <PurchaseModal
            onClose={handleModalClose}
            allAreaNames={allAreaNames}
          />
        )}
      </div>
    </div>
  );
}
