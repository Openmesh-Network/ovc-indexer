import { Hex } from "viem";
import { Department } from "../types/department.js";
import { VerfiedContributor } from "../types/verified-contributor.js";
import { OptimisticPayment } from "../types/optimistic-payment.js";

export type VerifiedContributorReturn = VerfiedContributor;

export type ScoreReturn = { score: number };

export type OptimisticPaymentsReturn = { [requestId: number]: OptimisticPayment };

export type LeaderboardReturn = { tokenId: bigint; score: number }[];

export interface TotalVerifiedContributorsReturn {
  totalVerifiedContributors: number;
}
