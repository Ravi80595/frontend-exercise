import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";

export default function Home() {
  const { setPlayerName, resetGame } = useGameContext();
  const [name, setName] = useState("");
  const [boardSize, setBoardSize] = useState("4x4");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) return;
    resetGame();
    setPlayerName(name);
    navigate("/game", { state: { boardSize } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-sm w-full transition-all duration-300 transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Memory Game 🧠
        </h1>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          />

          <select
            value={boardSize}
            onChange={(e) => setBoardSize(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          >
            <option value="2x2">2 x 2</option>
            <option value="4x4">4 x 4</option>
            <option value="6x6">6 x 6</option>
            <option value="4x5">4 x 5</option>
          </select>
        </div>

        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
            !name.trim()
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105"
          }`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}