"use client";

import { useEffect, useState } from "react";

export interface Player {
  id: number;
  player_name: string;
  back_number: string;
  image: string;
}

interface PlayerCardProps {
  onCardSelect: (playerId: number | null) => void;
}

const PlayerCard = ({ onCardSelect }: PlayerCardProps) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleClick = (playerId: number | null) => {
    setSelectedPlayerId(playerId);
    onCardSelect(playerId);
    console.log(playerId);
  };

  useEffect(() => {
    async function fetchPlayers() {
      const response = await fetch("/api/homerun/predict/players");
      const data = await response.json();
      setPlayers(data);
    }

    fetchPlayers();
  }, []);

  return (
    <div className="w-1/4 overflow-y-scroll bg-white p-4">
      <div className="flex flex-col h-[calc(100vh)]">
        <div
          className={`flex items-center mb-4 p-2 border-b hover:shadow-xl hover:scale-105 cursor-pointer ${
            selectedPlayerId === null ? "text-[#d60c0c]" : ""
          }`}
          onClick={() => handleClick(null)}
        >
          <img
            src=""
            alt="select_all_image"
            className="w-12 h-12 rounded-full mr-4"
          />
          <h2 className="text-lg font-semibold">전체 선택</h2>
        </div>
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center mb-4 p-2 border-b hover:shadow-xl hover:scale-105"
            onClick={() => handleClick(player.id)}
          >
            <img
              src={player.image}
              alt="player_image"
              className="w-12 h-12 rounded-full mr-4"
            />
            <h2 className="text-lg font-semibold">{player.player_name}</h2>
            <p
              className={`ml-auto text-xl font-semibold ${
                selectedPlayerId === player.id ? "text-[#d60c0c]" : ""
              }`}
            >
              {player.back_number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerCard;
