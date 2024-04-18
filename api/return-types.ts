import { VerfiedContributor } from "../types/verified-contributor.js";

export type VerifiedContributorReturn = VerfiedContributor;

export type ScoreReturn = { score: number };

export type LeaderboardReturn = { tokenId: bigint; score: number }[];

export interface UserReturn {
  verifiedContributors: bigint[];
}

export interface TotalVerifiedContributorsReturn {
  totalVerifiedContributors: number;
}
