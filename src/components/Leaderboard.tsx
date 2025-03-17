import React, { useState, useEffect } from "react";
import "../styles/Leaderboard.css";

const shortenAddress = (address: string): string =>
  address.slice(0, 4) + "..." + address.slice(-4);

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://cheeserush.xyz/api/v1/leaderboard");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (err: any) {
        setError(err.message || "Error fetching leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="leaderboard-block">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="leaderboard-block">Error: {error}</div>;
  }

  return (
    <div className="leaderboard-block">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Level</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{shortenAddress(row.player)}</td>
              <td>{row.level}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;