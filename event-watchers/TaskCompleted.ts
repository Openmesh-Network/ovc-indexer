import axios from "axios";
import { Storage } from "..";
import { TasksContract } from "../openrd-indexer/contracts/Tasks";
import { TaskCompleted } from "../openrd-indexer/types/task-events";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher";
import { parseBigInt } from "../openrd-indexer/utils/parseBigInt";
import { createTokenScoreIfNotExists, getCurrentEpoch } from "./scoresHelpers";
import { reviver } from "../openrd-indexer/utils/json";
import { TaskReturn } from "../openrd-indexer/api/return-types";
import { normalizeAddress } from "../openrd-indexer/event-watchers/userHelpers";

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
  const response = await axios.get(`https://openrd.plopmenz.com/indexer/task/${event.chainId}/${event.taskId}`);
  if (response.status !== 200) {
    throw new Error(`Fetching task details failed for ${event.chainId}:${event.taskId}: ${JSON.stringify(response.data)}`);
  }
  const taskInfo = JSON.parse(JSON.stringify(response.data), reviver) as TaskReturn;
  const executor = taskInfo.applications[taskInfo.executorApplication]?.applicant;
  if (!executor) {
    console.warn(`Completed task does not have executor application ${event.chainId}:${event.taskId}`);
    return;
  }

  const verifiedContributors = await storage.verifiedContributors.get();
  const verifiedContributor = Object.keys(verifiedContributors).find((tokenId) => verifiedContributors[tokenId].owner === normalizeAddress(executor));
  if (!verifiedContributor) {
    // Executor is not a verified contributor
    return;
  }
  const tokenId = parseBigInt(verifiedContributor);
  if (tokenId === undefined) {
    console.error(`Verified Contributor  ${verifiedContributor} owner found for executor ${executor}, but not parsable as bigint`);
    return;
  }

  // Change to keep track of paid out amount instead? (for partial payments / disputes)
  // That would cause a race condition, as this will likely trigger before the openrd indexer has queried the price information
  const reward = taskInfo.usdValue;
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
