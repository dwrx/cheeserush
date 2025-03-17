import React from "react";
import "../styles/Leaderboard.css";

const dummyData = [
  { player: "3Hq8Tyv1QKpJ6c8z4QG9sDfS7mLw4E3rP2Jb5VQ3xC1D", level: 8, score: 1247 },
  { player: "4sUQJwDPqxeZxCZqCmb7Q97aQKJbQH99m22sZzvK8N8q", level: 7, score: 1115 },
  { player: "9Hx5J8tmn6gARfw5YHdRG34rZaQaRkExdZ1hL4R7F2Qe", level: 7, score: 1059 },
  { player: "7rQ5QTKWJJ2vPh8C7G5UkkQHCFnifSH6Pvj6PJfWvsmQ", level: 7, score: 1042 },
  { player: "2GqkuG6G5KZPZs1G4qEX3fFxrmFhNMc8hzn9swhpqBiw", level: 6, score: 892 },
  { player: "3vNyYtX8yXeYcKxU97NsT3pXDr7T3f7hXEBJ6vFhLKf3", level: 5, score: 781 },
  { player: "9zV7Gf5LrXk6M2sR1Qb8TjN3wP7cY6xV5rC4qJ8dF2nP", level: 4, score: 654 },
  { player: "6W8MSEtnJX3kQXR7C52kWqmW84RH62v5xvP9ZwC4Jn7E", level: 4, score: 609 },
  { player: "5kTj6f6hF4jP3rBYwWf29bQH8xRzq2ZspPpZ1QdFqKrU", level: 4, score: 598 },
  { player: "8nR4mB9VaCqX7H2V7e2Y7gT6sRf2K4sLPQ2Z6Ydk7aL2", level: 1, score: 32 },
];

const shortenAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

const Leaderboard: React.FC = () => {
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
          {dummyData.map((row, index) => (
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
