export interface ScoreItem {
  amount: number;
  reason: string;
}

export interface EpochScore {
  total: number; // O(1) access of items sum
  items: ScoreItem[];
}

export interface Epoch {
  [tokenId: string]: EpochScore;
}
