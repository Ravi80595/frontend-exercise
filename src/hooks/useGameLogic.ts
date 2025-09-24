import { useState, useEffect } from "react";
import { shuffleArray } from "../utils/shuffle";
import { useGameContext } from "../context/GameContext";

interface CardType {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const IMAGES = [
  "/plant01.jpg",
  "/plant02.jpg",
  "/plant03.jpg",
  "/plant04.jpg",
  "/plant05.jpg",
  "/plant06.jpg",
  "/plant07.jpg",
  "/plant08.jpg",
];

export const useGameLogic = (boardSize: string) => {
  // Use 'setMoves' from the context directly
  const { setGameOver, setMoves, moves } = useGameContext();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  // ❌ Remove the local moves state: const [moves, localSetMoves] = useState(0);

  useEffect(() => {
    const [rows, cols] = boardSize.split("x").map(Number);
    const numPairs = (rows * cols) / 2;
    const selectedImages = IMAGES.slice(0, numPairs);
    let deck: CardType[] = [];

    selectedImages.forEach((img, index) => {
      deck.push(
        { id: index * 2, image: img, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, image: img, isFlipped: false, isMatched: false }
      );
    });

    deck = shuffleArray(deck);
    setCards(deck);
    setFlippedCards([]);
    setMoves(0); // ✅ Reset moves using the context function
  }, [boardSize, setMoves]);

  const handleCardClick = (id: number) => {
    const clicked = cards.find((c) => c.id === id);
    if (!clicked || clicked.isFlipped || clicked.isMatched || flippedCards.length === 2) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    setFlippedCards((prev) => [...prev, { ...clicked, isFlipped: true }]);
    
    // ✅ Use the context's setMoves function to update the global state
    if (flippedCards.length === 1) {
      setMoves(moves + 1);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      const timeout = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => {
            if (c.id === first.id || c.id === second.id) {
              if (first.image === second.image) {
                return { ...c, isMatched: true, isFlipped: true };
              } else {
                return { ...c, isFlipped: false };
              }
            }
            return c;
          })
        );
        setFlippedCards([]);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setGameOver(true);
    }
  }, [cards, setGameOver]);

  return { cards, handleCardClick, moves };
};