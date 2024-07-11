"use client";

import React, { useEffect, useState } from "react";
import PlayerCard from "@/app/fan/homerun/_components/PlayerCard";
import StadiumMap from "@/app/fan/homerun/_components/StadiumMap";

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

  const handleCardSelect = (playerId: number | null) => {
    setSelectedPlayerId(playerId);
  };

  const getPlayersHomerunData = async () => {
    try {
      const response = await fetch("/api/homerun/predict/players");
      if (response.ok) {
        const allPlayers = await response.json();
        const homerunData = await Promise.all(
          allPlayers.map(async (player: any) => {
            const res = await fetch(`/api/homerun/predict/${player.id}`);
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
    <div className="flex flex-row p-10">
      <StadiumMap
        playersHomerunData={playersHomerunData}
        selectedPlayerId={selectedPlayerId}
        error={error}
      />
      <PlayerCard onCardSelect={handleCardSelect} />
    </div>
  );
}
