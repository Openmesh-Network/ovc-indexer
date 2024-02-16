import { Hash } from "viem";
import { Storage } from "..";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher";
import { createVerifiedContributorIfNotExists } from "./verifiedContributorHelpers";
import { VerifiedContributorTagManagerContract } from "../contracts/VerifiedContributorTagManager";

export interface TagRemoved {
  tokenId: bigint;
  tag: Hash;
}

export function watchVerifiedContributorTagRemoved(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("VerifiedContributorTagRemoved", {
    abi: VerifiedContributorTagManagerContract.abi,
    address: VerifiedContributorTagManagerContract.address,
    eventName: "TagRemoved",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args } = log;

          await processVerifiedContributorTagRemoved(args, storage);
        })
      );
    },
  });
}

export async function processVerifiedContributorTagRemoved(event: TagRemoved, storage: Storage): Promise<void> {
  await storage.verifiedContributors.update((verifiedContributors) => {
    createVerifiedContributorIfNotExists(verifiedContributors, event.tokenId);
    const index = verifiedContributors[event.tokenId.toString()].tags.findIndex((tag) => tag === event.tag);
    if (index === -1) {
      console.warn(`Trying to remove tag ${event.tag} from ${event.tokenId}, but it is not currently added.`);
    }
  });
}
