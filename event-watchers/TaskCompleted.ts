import { Storage } from "..";
import { TasksContract } from "../openrd-indexer/contracts/Tasks";
import { TaskCompleted } from "../openrd-indexer/types/task-events";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher";
import { parseBigInt } from "../openrd-indexer/utils/parseBigInt";
import { createTokenScoreIfNotExists, getCurrentEpoch } from "./scoresHelpers";

export function watchTaskCompleted(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("TaskCompleted", {
    abi: TasksContract.abi,
    address: TasksContract.address,
    eventName: "TaskCompleted",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args, blockNumber, transactionHash, address } = log;

          const event = {
            type: "TaskCompleted",
            blockNumber,
            transactionHash,
            chainId: contractWatcher.chain.id,
            address: address,
            ...args,
          } as TaskCompleted;

          await processTaskCompleted(event, storage);
        })
      );
    },
  });
}

export async function processTaskCompleted(event: TaskCompleted, storage: Storage): Promise<void> {
  // query openrd-indexer to get executor
  const executor = "0x0";

  const verifiedContributors = await storage.verifiedContributors.get();
  const verifiedContributor = Object.keys(verifiedContributors).find((tokenId) => verifiedContributors[tokenId].owner === executor);
  if (!verifiedContributor) {
    return;
  }
  const tokenId = parseBigInt(verifiedContributor);
  if (tokenId === undefined) {
    throw new Error(`Verified Contributor  ${verifiedContributor} owner found for executor ${executor}, but not parsable as bigint`);
  }

  // Query / reuse information from openrd for budget info
  const reward = 0;

  await storage.scores.update((scores) => {
    const epoch = getCurrentEpoch(scores);
    createTokenScoreIfNotExists(epoch, tokenId);
    const score = epoch[tokenId.toString()];
    score.total += reward;
    score.items.push({
      amount: reward,
      reason: `Completion of task ${event.chainId}:${event.taskId}`,
    });
  });
}
