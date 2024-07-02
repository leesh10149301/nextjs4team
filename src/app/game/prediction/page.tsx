"use client";

import { useEffect, useState } from "react";
import gamedata from "../../data/gamedata.json"; // Assuming the data structure is directly exportable

interface GameData {
  [date: string]: {
    home: string;
    hscore: number;
    visit: string;
    vscore: number;
  };
}

export default function GamePrediction() {
  const [data, setData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null);
      try {
        // gamedata.json에서 데이터 가져오기
        setData(gamedata.gamedata); // gamedata.json의 구조에 맞게 gamedata.gamedata를 설정
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError("Failed to fetch data. Please try again later.");
      }
      setLoading(false);
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 데이터를 가져오도록 설정

  return (
    <div>
      <h1>KT GAME</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Home Score</th>
              <th>Away Score</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.keys(data).map((date, index) => (
                <tr key={index}>
                  <td>{date}</td>
                  <td>{data[date].home}</td>
                  <td>{data[date].visit}</td>
                  <td>{data[date].hscore}</td>
                  <td>{data[date].vscore}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
