import { Address } from "viem";
import { Storage } from "..";
import { VerifiedContributorContract } from "../contracts/VerifiedContributor";
import { ContractWatcher } from "../openrd-indexer/utils/contract-watcher";
import { createVerifiedContributorIfNotExists } from "./verifiedContributorHelpers";
import { normalizeAddress } from "../openrd-indexer/event-watchers/userHelpers";

export interface Transfer {
  from: Address;
  to: Address;
  tokenId: bigint;
}

export function watchVerifiedContributorTransfer(contractWatcher: ContractWatcher, storage: Storage) {
  contractWatcher.startWatching("VerifiedContributorTransfer", {
    abi: VerifiedContributorContract.abi,
    address: VerifiedContributorContract.address,
    eventName: "Transfer",
    strict: true,
    onLogs: async (logs) => {
      await Promise.all(
        logs.map(async (log) => {
          const { args } = log;

          await processVerifiedContributorTransfer(args, storage);
        })
      );
    },
  });
}

export async function processVerifiedContributorTransfer(event: Transfer, storage: Storage): Promise<void> {
  await storage.verifiedContributors.update((verifiedContributors) => {
    createVerifiedContributorIfNotExists(verifiedContributors, event.tokenId);
    verifiedContributors[event.tokenId.toString()].owner = normalizeAddress(event.to);
  });
}
