"use client";

import { useState } from "react";

interface Player {
  id: number;
  name: string;
  position: string;
  image: string;
}

const players: Player[] = [
  { id: 1, name: "Player 1", position: "Pitcher", image: "player1.jpg" },
  { id: 2, name: "Player 2", position: "Catcher", image: "player2.jpg" },
  { id: 3, name: "Player 1", position: "Pitcher", image: "player1.jpg" },
  { id: 4, name: "Player 2", position: "Catcher", image: "player2.jpg" },
  { id: 5, name: "Player 1", position: "Pitcher", image: "player1.jpg" },
  { id: 6, name: "Player 2", position: "Catcher", image: "player2.jpg" },
  { id: 7, name: "Player 1", position: "Pitcher", image: "player1.jpg" },
  { id: 8, name: "Player 2", position: "Catcher", image: "player2.jpg" },
];

interface PlayerCardProps {
  onCardSelect: (playerId: number) => void;
}

export default function PlayerCard({ onCardSelect }: PlayerCardProps) {
  const [selectCard, setSelecCard] = useState<number | null>(null);

  const handleClick = (playerId: number) => {
    setSelecCard(playerId);
    onCardSelect(playerId);
  };

  return (
    <div className=" w-1/4 overflow-y-scroll bg-white p-4">
      <div className="flex flex-col h-[calc(100vh)]">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center mb-4 p-2 border-b hover:shadow-xl hover:scale-105 "
            onClick={() => handleClick(player.id)}
          >
            <img
              src={player.image}
              alt={player.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="">
              <h2 className="text-lg font-semibold">{player.name}</h2>
              <p className="text-sm text-gray-600">{player.position}</p>
            </div>
            {selectCard === player.id && (
              <img
                src="/images/card-icon.png" // 여기에 원하는 아이콘 이미지 URL을 입력하세요
                alt="cardIcon"
                className="w-10 h-10 ml-auto"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
