import { ScoresStorage } from "..";

export function calculateScore(scores: ScoresStorage, tokenId: bigint): number {
  const recentScores = scores.slice(-6).reverse(); // Reverse to still apply to correct multiplier in case we have less than 6 elements
  const multiplier = [5, 3, 2, 1, 1, 1];
  return recentScores.reduce((acc, value, i) => {
    const epochScore = value[tokenId.toString()]?.total;
    if (epochScore) {
      acc += epochScore * multiplier[i];
    }
    return acc;
  }, 0);
}
