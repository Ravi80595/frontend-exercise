import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  moves: number;
  setMoves: (moves: number) => void;
  time: number;
  setTime: (time: number) => void;
  gameOver: boolean;
  setGameOver: (over: boolean) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const resetGame = () => {
    setMoves(0);
    setTime(0);
    setGameOver(false);
  };

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        moves,
        setMoves,
        time,
        setTime,
        gameOver,
        setGameOver,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
};
