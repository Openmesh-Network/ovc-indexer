import { Storage } from "..";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher";
import { OptimisticActionsContract } from "../contracts/OptimisticActions";
import { createOptimsticPaymentIfNotExists } from "./optimsticPaymentHelpers";

export interface OptimisticRejection {
  id: number;
  dao: `0x${string}`;
  metadata: string;
}

export function watchOptimisticPaymentRejected(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("OptimisticPaymentRejected", {
    abi: OptimisticActionsContract.abi,
    address: OptimisticActionsContract.address,
    eventName: "ActionRejected",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args } = log;

          await processOptimisticPaymentRejected(args, storage);
        })
      );
    },
  });
}

export async function processOptimisticPaymentRejected(event: OptimisticRejection, storage: Storage): Promise<void> {
  await storage.optimisticPayments.update((optimisticPayments) => {
    createOptimsticPaymentIfNotExists(optimisticPayments, event.dao, event.id);
    optimisticPayments[event.dao][event.id].rejected = true;
    optimisticPayments[event.dao][event.id].rejectionMetadata = event.metadata;
  });
}
