import { ScoresStorage } from "..";
import { Epoch } from "../types/score.js";

export function createTokenScoreIfNotExists(epoch: Epoch, tokenId: bigint): void {
  if (!epoch[tokenId.toString()]) {
    epoch[tokenId.toString()] = {
      total: 0,
      items: [],
    };
  }
}

export function getCurrentEpoch(scores: ScoresStorage): Epoch {
  const score = scores.at(-1);
  if (!score) {
    throw new Error("No epoch exists (empty array)");
  }
  return score;
}
