import React from "react";

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function Card({
  image,
  isFlipped,
  isMatched,
  onClick,
}: CardProps) {
  return (
    <div
      className="aspect-square cursor-pointer [perspective:1000px] w-24"
      onClick={onClick}
    >
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl shadow-lg bg-slate-700 flex items-center justify-center p-2">
          <img src="/growy_logo.svg" alt="Logo" className="w-1/2 h-1/2 object-contain filter grayscale opacity-70" />
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl shadow-lg bg-white [transform:rotateY(180deg)] overflow-hidden">
          <img
            src={image}
            alt="card"
            className="w-full h-full object-cover transition-all duration-300 transform hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}