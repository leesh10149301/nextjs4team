"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TSearchBarProps } from "./PlayerRole";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: TSearchBarProps) {
  const [searchPlayer, setSearchPlayer] = useState(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlayer(e.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchPlayer);
  };

  return (
    <div className=" mr-10 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
      <input
        type="text"
        value={searchPlayer}
        onChange={handleInputChange}
        placeholder="선수검색"
        className="w-44 ml-4 py-2 font-normal text-base placeholder-gray-500 bg-white focus:outline-none flex-grow"
      />
      <button onClick={handleSearch} className="px-4 py-2">
        <FaSearch />
      </button>
    </div>
  );
}
