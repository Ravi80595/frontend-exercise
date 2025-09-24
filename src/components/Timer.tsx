import { useEffect } from "react";
import { useGameContext } from "../context/GameContext";

export default function Timer() {
  const { time, setTime, gameOver } = useGameContext();

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, setTime]);

  return (
    <div className="text-white text-lg font-semibold mb-4">
       Time: {time}s
    </div>
  );
}
