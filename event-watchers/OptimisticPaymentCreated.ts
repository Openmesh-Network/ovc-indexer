import { Address, Hex, decodeFunctionData } from "viem";
import { Storage } from "..";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher";
import { OptimisticActionsContract } from "../contracts/OptimisticActions";
import { TasksContract } from "../openrd-indexer/contracts/Tasks";
import { PaymentAction } from "../types/optimistic-payment";
import { createOptimsticPaymentIfNotExists } from "./optimsticPaymentHelpers";
import { normalizeAddress } from "../openrd-indexer/event-watchers/userHelpers";
import { fetchMetadata } from "../openrd-indexer/utils/metadata-fetch";

export interface OptimisticAction {
  id: number;
  dao: Address;
  manager: Address;
  role: bigint;
  actions: readonly {
    to: Address;
    value: bigint;
    data: Hex;
  }[];
  failureMap: bigint;
  metadata: string;
  executableFrom: bigint;
}

export function watchOptimisticPaymentCreated(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("OptimisticPaymentCreated", {
    abi: OptimisticActionsContract.abi,
    address: OptimisticActionsContract.address,
    eventName: "ActionCreated",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args } = log;

          await processOptimisticPaymentCreated(args, storage);
        })
      );
    },
  });
}

export async function processOptimisticPaymentCreated(event: OptimisticAction, storage: Storage): Promise<void> {
  const dao = normalizeAddress(event.dao);
  const actions = event.actions.map(toPaymentAction).filter((action) => action !== undefined) as PaymentAction[];
  await storage.optimisticPayments.update((optimisticPayments) => {
    createOptimsticPaymentIfNotExists(optimisticPayments, dao, event.id);
    optimisticPayments[dao][event.id].metadata = event.metadata;
    optimisticPayments[dao][event.id].executableFrom = event.executableFrom;
    optimisticPayments[dao][event.id].actions = actions;
  });

  await fetchMetadata(event.metadata)
    .then((metadata) =>
      storage.optimisticPayments.update((optimisticPayments) => {
        optimisticPayments[dao][event.id].cachedMetadata = metadata;
      })
    )
    .catch((err) => console.error(`Error while fetching optimstic payment metadata ${event.metadata} (${event.dao}-${event.id}): ${JSON.stringify(err)}`));
}

function toPaymentAction({ to, value, data }: { to: Address; value: bigint; data: Hex }): PaymentAction | undefined {
  // Ignores most actions (as those should not have permission to execute anyhow and we do not know how to decode them)
  if (normalizeAddress(to) !== normalizeAddress(TasksContract.address)) {
    return undefined;
  }

  const action = decodeFunctionData({
    abi: TasksContract.abi,
    data: data,
  });

  if (action.functionName === "partialPayment") {
    return {
      type: "partialPayment",
      taskId: action.args[0],
      partialNativePayment: [...action.args[1]],
      partialPayment: [...action.args[2]],
    };
  }
  if (action.functionName === "increaseBudget") {
    return {
      type: "budgetIncrease",
      taskId: action.args[0],
      nativeBudgetIncrease: value,
      budgetIncrease: [...action.args[1]],
    };
  }
  if (action.functionName === "extendDeadline") {
    return {
      type: "deadlineExtension",
      taskId: action.args[0],
      deadlineExtension: action.args[1],
    };
  }

  return undefined;
}
