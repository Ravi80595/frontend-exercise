
export interface Score {
  name: string;
  moves: number;
  time: number;
}

const STORAGE_KEY = "memory_game_scores";

export const getScores = (): Score[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveScore = (score: Score) => {
  const scores = getScores();
  scores.push(score);

  scores.sort((a, b) => {
    if (a.moves === b.moves) return a.time - b.time;
    return a.moves - b.moves;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores.slice(0, 5)));
};
