import { Address } from "viem";

export type PaymentAction =
  | {
      type: "partialPayment";
      taskId: bigint;
      partialNativePayment: bigint[];
      partialPayment: bigint[];
    }
  | {
      type: "budgetIncrease";
      taskId: bigint;
      nativeBudgetIncrease: bigint;
      budgetIncrease: bigint[];
    }
  | {
      type: "deadlineExtension";
      taskId: bigint;
      deadlineExtension: bigint;
    };

export interface OptimisticPayment {
  metadata: string;
  executableFrom: bigint;
  actions: PaymentAction[];

  rejected: boolean;
  rejectionMetadata: string;
  executed: boolean;
  executor: Address;
}
