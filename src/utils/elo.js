// Elo rating calculation
// K-factor determines how much ratings change per puzzle
const K_FACTOR = 32;

export function calculateNewRating(playerRating, puzzleRating, solved) {
  const expected = 1 / (1 + Math.pow(10, (puzzleRating - playerRating) / 400));
  const score = solved ? 1 : 0;
  return Math.round(playerRating + K_FACTOR * (score - expected));
}

export function getRatingChange(playerRating, puzzleRating, solved) {
  const newRating = calculateNewRating(playerRating, puzzleRating, solved);
  return newRating - playerRating;
}

export function getDifficultyLabel(rating) {
  if (rating < 800) return "Beginner";
  if (rating < 1300) return "Intermediate";
  if (rating < 1800) return "Advanced";
  return "Expert";
}

export function getDifficultyColor(rating) {
  if (rating < 800) return "#4ade80";
  if (rating < 1300) return "#fbbf24";
  if (rating < 1800) return "#f97316";
  return "#ef4444";
}
