import { Address, zeroAddress } from "viem";
import { OptimisticPaymentsStorage } from "..";

export function createDAOIfNotExists(optimsticPayments: OptimisticPaymentsStorage, dao: Address): void {
  if (!optimsticPayments[dao]) {
    optimsticPayments[dao] = {};
  }
}

export function createOptimsticPaymentIfNotExists(optimsticPayments: OptimisticPaymentsStorage, dao: Address, requestId: number): void {
  createDAOIfNotExists(optimsticPayments, dao);
  if (!optimsticPayments[dao][requestId]) {
    optimsticPayments[dao][requestId] = {
      metadata: "",
      executableFrom: BigInt(0),
      actions: [],
      rejected: false,
      rejectionMetadata: "",
      executed: false,
      executor: zeroAddress,
    };
  }
}
