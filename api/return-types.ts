import { VerfiedContributor } from "../types/verified-contributor";

export type VerifiedContributorReturn = VerfiedContributor;

export type ScoreReturn = { score: number };

export type LeaderboardReturn = { tokenId: bigint; score: number }[];

export interface TotalVerifiedContributorsReturn {
  totalVerifiedContributors: number;
}
