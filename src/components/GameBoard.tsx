import React from "react";
import Card from "./Card";
import { useGameLogic } from "../hooks/useGameLogic";

interface GameBoardProps {
  boardSize: string;
}

export default function GameBoard({ boardSize }: GameBoardProps) {
  const { cards, handleCardClick, moves } = useGameLogic(boardSize);
  const [rows, cols] = boardSize.split("x").map(Number);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl shadow-lg p-4 mb-8 w-full max-w-sm">
        <p className="text-xl sm:text-2xl font-bold text-center text-teal-300 animate-pulse">
          Moves: <span className="text-white ml-2">{moves}</span>
        </p>
      </div>

      <div
        className="grid gap-3 sm:gap-4 p-4 bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          width: `calc(${cols} * 8rem + ${cols - 1} * 1rem)`,
          aspectRatio: `${cols}/${rows}`
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}