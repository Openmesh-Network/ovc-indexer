import { Storage } from "..";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher";
import { OptimisticActionsContract } from "../contracts/OptimisticActions";
import { createOptimsticPaymentIfNotExists } from "./optimsticPaymentHelpers";

export interface OptimisticExecution {
  id: number;
  dao: `0x${string}`;
  executor: `0x${string}`;
  returnValues: readonly `0x${string}`[];
  failureMap: bigint;
}

export function watchOptimisticPaymentExecuted(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("OptimisticPaymentExecuted", {
    abi: OptimisticActionsContract.abi,
    address: OptimisticActionsContract.address,
    eventName: "ActionExecuted",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args } = log;

          await processOptimisticPaymentExecuted(args, storage);
        })
      );
    },
  });
}

export async function processOptimisticPaymentExecuted(event: OptimisticExecution, storage: Storage): Promise<void> {
  await storage.optimisticPayments.update((optimisticPayments) => {
    createOptimsticPaymentIfNotExists(optimisticPayments, event.dao, event.id);
    optimisticPayments[event.dao][event.id].executed = true;
    optimisticPayments[event.dao][event.id].executor = event.executor;
  });
}
