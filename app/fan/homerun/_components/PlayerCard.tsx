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
  setTooltipVisible: (visible: boolean) => void;
}

const PlayerCard = ({ onCardSelect, setTooltipVisible }: PlayerCardProps) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleClick = (playerId: number | null) => {
    setSelectedPlayerId(playerId);
    onCardSelect(playerId);
    // console.log(playerId);
  };

  useEffect(() => {
    async function fetchPlayers() {
      const response = await fetch("/api/homerun/predict/players");
      const data = await response.json();
      setPlayers(data);
      // console.log(data);
    }

    fetchPlayers();
  }, []);

  return (
    <div className="w-1/4  bg-white pr-4 pl-4 ">
      <div className="flex flex-col h-full cursor-pointer">
        <div
          className={`content-center mb-4 p-2 border-b hover:shadow-xl hover:scale-105 cursor-pointer h-[65px] text-center ${
            selectedPlayerId === null ? "text-[#d60c0c]" : ""
          }`}
          onClick={() => handleClick(null)}
        >
          <h2 className="text-lg font-semibold ">전체 선수 </h2>
        </div>
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center mb-4 p-2 border-b hover:shadow-xl hover:scale-105 h-[65px]"
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
