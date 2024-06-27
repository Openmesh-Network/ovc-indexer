import { ClaimRequest, PendingClaimRequest } from "../types/requests.js";
import { VerifiedContributor } from "../types/verified-contributor.js";

export type VerifiedContributorReturn = VerifiedContributor;

export type ScoreReturn = { score: number };

export type LeaderboardReturn = { tokenId: bigint; score: number }[];

export interface UserReturn {
  verifiedContributors: bigint[];
}

export interface TotalVerifiedContributorsReturn {
  totalVerifiedContributors: number;
}

export type ClaimRequestReturn = ClaimRequest[];

export type ClaimRequestsReturn = PendingClaimRequest[];
