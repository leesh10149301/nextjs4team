"use client";

import { useState } from "react";
import PlayerCard from "./_components/PlayerCard";
import StadiumMap from "./_components/StadiumMap";

export default function page() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardSelect = (playerId: number) => {
    setSelectedCard(playerId);
  };
  return (
    <div className="flex flex-row p-10">
      <StadiumMap selectedCard={selectedCard} />
      <PlayerCard onCardSelect={handleCardSelect} />
    </div>
  );
}
