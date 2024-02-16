import { Address, Hex } from "viem";

export interface VerfiedContributor {
  owner: Address;
  tags: Hex[]; // e.g. Departments
}
