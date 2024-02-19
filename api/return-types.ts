import { Hex } from "viem";
import { Department } from "../types/department";
import { VerfiedContributor } from "../types/verified-contributor";

export type VerifiedContributorReturn = VerfiedContributor;

export type DepartmentReturn = Department;

export type ScoreReturn = { score: number };

export type LeaderboardReturn = { tokenId: bigint; score: number }[];

export type DepartmentsReturn = { hash: Hex }[];

export interface TotalVerifiedContributorsReturn {
  totalVerifiedContributors: number;
}
