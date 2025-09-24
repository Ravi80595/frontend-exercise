import { useLocation, useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import GameBoard from "../components/GameBoard";
import Timer from "../components/Timer";
import { useEffect } from "react";

export default function GamePage() {
  const { playerName, gameOver } = useGameContext();
  const location = useLocation();
  const navigate = useNavigate();

  const boardSize = (location.state as { boardSize: string })?.boardSize || "4x4";
  console.log("Board size:", boardSize);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        navigate("/end");
      }, 1000);
    }
  }, [gameOver, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-4xl transition-all duration-300">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-2 sm:mb-0">
            Memory Challenge
          </h2>
          <div className="flex items-center space-x-4 text-lg">
            <span className="font-semibold text-gray-300">Player:</span>
            <span className="font-bold text-xl text-white">{playerName}</span>
            <div className="w-1 h-6 bg-gray-600 rounded-full hidden sm:block"></div>
            <span className="font-semibold text-gray-300">Time:</span>
            <Timer />
          </div>
        </header>
        <GameBoard boardSize={boardSize} />
      </div>
    </div>
  );
}