import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { useEffect, useState } from "react";
import { getScores, saveScore, Score } from "../utils/leaderboard";

export default function EndPage() {
  const { playerName, moves, time, resetGame } = useGameContext();
  console.log(moves, playerName, 'moves')
  const navigate = useNavigate();
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    saveScore({ name: playerName, moves, time });
    setScores(getScores());
  }, [playerName, moves, time]);

  const handlePlayAgain = () => {
    resetGame();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-4">
      <div className="bg-purple-800 bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-purple-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 animate-pulse">
          Game Over! 🏆
        </h1>
        <p className="text-xl mb-1 text-gray-200">
          Player: <span className="font-bold text-white">{playerName}</span>
        </p>
        <p className="text-xl mb-1 text-gray-200">
          Moves Taken: <span className="font-bold text-white">{moves}</span>
        </p>
        <p className="text-xl mb-6 text-gray-200">
          Time Spent: <span className="font-bold text-white">{time}s</span>
        </p>

        <button
          onClick={handlePlayAgain}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 mb-10"
        >
          Play Again
        </button>
      </div>
      
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-6 mt-8 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-400">Top Scores</h2>
        <ol className="text-lg space-y-2">
          {scores.map((score, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-700 rounded-lg p-3"
            >
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white w-6 text-left">{index + 1}.</span>
                <span className="text-gray-300">{score.name}</span>
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-white">{score.moves}</span> moves -{" "}
                <span className="font-semibold text-white">{score.time}</span>s
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}