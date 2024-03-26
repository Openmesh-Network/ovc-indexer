import { Address, Hex } from "viem";

export interface OptimisticPayment {
  metadata: string;
  executableFrom: bigint;
  actions: {
    to: Address;
    value: bigint;
    data: Hex;
  }[];

  rejected: boolean;
  rejectionMetadata: string;
  executed: boolean;
  executor: Address;

  cachedMetadata: string;
  cachedRejectionMetadata: string;
}
