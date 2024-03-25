import { Hash } from "viem";
import { Storage } from "..";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher.js";
import { createVerifiedContributorIfNotExists } from "./verifiedContributorHelpers.js";
import { VerifiedContributorTagManagerContract } from "../contracts/VerifiedContributorTagManager.js";

export interface TagAdded {
  tokenId: bigint;
  tag: Hash;
}

export function watchVerifiedContributorTagAdded(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("VerifiedContributorTagAdded", {
    abi: VerifiedContributorTagManagerContract.abi,
    address: VerifiedContributorTagManagerContract.address,
    eventName: "TagAdded",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args } = log;

          await processVerifiedContributorTagAdded(args, storage);
        })
      );
    },
  });
}

export async function processVerifiedContributorTagAdded(event: TagAdded, storage: Storage): Promise<void> {
  await storage.verifiedContributors.update((verifiedContributors) => {
    createVerifiedContributorIfNotExists(verifiedContributors, event.tokenId);
    verifiedContributors[event.tokenId.toString()].tags.push(event.tag);
  });
}
