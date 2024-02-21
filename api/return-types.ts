import { Hex } from "viem";
import { Department } from "../types/department";
import { VerfiedContributor } from "../types/verified-contributor";
import { OptimisticPayment } from "../types/optimistic-payment";

export type VerifiedContributorReturn = VerfiedContributor;

export type DepartmentReturn = Department;

export type ScoreReturn = { score: number };

export type OptimisticPaymentsReturn = { [requestId: number]: OptimisticPayment };

export type DAORoleReturn = { role: bigint };

export type LeaderboardReturn = { tokenId: bigint; score: number }[];

export type DepartmentsReturn = { hash: Hex }[];

export interface TotalVerifiedContributorsReturn {
  totalVerifiedContributors: number;
}
