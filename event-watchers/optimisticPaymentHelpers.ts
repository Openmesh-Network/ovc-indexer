import { Address, zeroAddress } from "viem";
import { OptimisticPaymentsStorage } from "..";

export function createDAOIfNotExists(optimisticPayments: OptimisticPaymentsStorage, dao: Address): void {
  if (!optimisticPayments[dao]) {
    optimisticPayments[dao] = {};
  }
}

export function createOptimisticPaymentIfNotExists(optimisticPayments: OptimisticPaymentsStorage, dao: Address, requestId: number): void {
  createDAOIfNotExists(optimisticPayments, dao);
  if (!optimisticPayments[dao][requestId]) {
    optimisticPayments[dao][requestId] = {
      metadata: "",
      executableFrom: BigInt(0),
      actions: [],
      rejected: false,
      rejectionMetadata: "",
      executed: false,
      executor: zeroAddress,

      cachedMetadata: "",
      cachedRejectionMetadata: "",
    };
  }
}
