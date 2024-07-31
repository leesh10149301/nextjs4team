type TeamRecord = {
  wins: number;
  losses: number;
  draws: number;
};

type TeamStats = {
  teamName: string;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  remainingGames: number;
};

const parseRecord = (record: string): TeamRecord => {
  const [wins, losses, draws] = record.split("-").map(Number);
  return { wins: wins || 0, losses: losses || 0, draws: draws || 0 };
};

const calculateWinRate = (wins: number, losses: number): number => {
  const totalGames = wins + losses;
  return totalGames === 0 ? 0 : wins / totalGames;
};

const calculateTeamStats = (data: any): TeamStats[] => {
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format: data should be an array");
  }

  return data.map((team: any) => {
    const teamName = team["팀명"];
    const record = team["합계"];

    if (typeof record !== "string") {
      throw new Error(`Invalid record format for team ${teamName}`);
    }

    const { wins, losses, draws } = parseRecord(record);
    const winRate = calculateWinRate(wins, losses);
    const totalGames = wins + losses + draws;
    const remainingGames = 144 - totalGames;

    return { teamName, wins, losses, draws, winRate, remainingGames };
  });
};

export default calculateTeamStats;
