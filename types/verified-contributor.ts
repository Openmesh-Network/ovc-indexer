import { Address, Hex } from "viem";

export interface VerifiedContributor {
  owner: Address;
  tags: Hex[]; // e.g. Departments
}
