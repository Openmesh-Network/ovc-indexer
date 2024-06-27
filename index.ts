import { config as loadEnv } from "dotenv";
import express from "express";
import storageManager from "node-persist";
import { mainnet, polygon } from "viem/chains";

import { registerRoutes } from "./api/simple-router.js";
import { watchTaskCompleted } from "./event-watchers/TaskCompleted.js";
import { VerifiedContributor } from "./types/verified-contributor.js";
import { MultichainWatcher } from "./openrd-indexer/utils/multichain-watcher.js";
import { PersistentJson } from "./openrd-indexer/utils/persistent-json.js";
import { Epoch } from "./types/score.js";
import { watchVerifiedContributorTransfer } from "./event-watchers/VerifiedContributorTransfer.js";
import { watchVerifiedContributorTagAdded } from "./event-watchers/VerifiedContributorTagAdded.js";
import { watchVerifiedContributorTagRemoved } from "./event-watchers/VerifiedContributorTagRemoved.js";
import { VerifiedContributorContract } from "./contracts/VerifiedContributor.js";
import { VerifiedContributorTagManagerContract } from "./contracts/VerifiedContributorTagManager.js";
import { historySync } from "./openrd-indexer/utils/history-sync.js";
import { ClaimRequest } from "./types/requests.js";

export interface VerifiedContributorsStorage {
  [tokenId: string]: VerifiedContributor;
}
export type ScoresStorage = Epoch[];
export type ClaimRequestsStorage = ClaimRequest[];
export interface Storage {
  verifiedContributors: PersistentJson<VerifiedContributorsStorage>;
  scores: PersistentJson<ScoresStorage>;
  claimRequests: PersistentJson<ClaimRequestsStorage>;
}

async function start() {
  const loadEnvResult = loadEnv();
  if (loadEnvResult.error) {
    console.warn(`Error while loading .env: ${JSON.stringify(loadEnvResult.error)}`);
  }

  // Make contract watcher for each chain (using Infura provider)
  const multichainWatcher = new MultichainWatcher([
    {
      chain: mainnet,
      rpc: `mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
    },
    {
      chain: polygon,
      rpc: `polygon-mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
    },
  ]);

  // Data (memory + json files (synced) currently, could be migrated to a database solution if needed in the future)
  await storageManager.init({ dir: "storage" });
  const storage: Storage = {
    verifiedContributors: new PersistentJson<VerifiedContributorsStorage>("verifiedContributors", {}),
    scores: new PersistentJson<ScoresStorage>("scores", []),
    claimRequests: new PersistentJson<ClaimRequestsStorage>("claimRequest", []),
  };

  multichainWatcher.forEach((contractWatcher) => {
    watchTaskCompleted(contractWatcher, storage);
    if (contractWatcher.chain.id === polygon.id) {
      // Verified Contributors is only deployed on this chain
      watchVerifiedContributorTransfer(contractWatcher, storage);
      watchVerifiedContributorTagAdded(contractWatcher, storage);
      watchVerifiedContributorTagRemoved(contractWatcher, storage);
    }
  });

  process.on("SIGINT", async () => {
    console.log("Stopping...");

    multichainWatcher.forEach((contractWatcher) => {
      contractWatcher.stopAll();
    });
    await Promise.all(
      Object.values(storage).map((storageItem) => {
        return storageItem.update(() => {}); // Save all memory values to disk
      })
    );
    process.exit();
  });

  // Webserver
  const app = express();
  registerRoutes(app, storage);

  var server = app.listen(process.env.PORT ?? 3001, () => {
    const addressInfo = server.address() as any;
    var host = addressInfo.address;
    var port = addressInfo.port;
    console.log(`Webserver started on ${host}:${port}`);
  });

  process.stdin.resume();

  process.stdin.on("data", (input) => {
    try {
      const command = input.toString();
      if (command.startsWith("sync ")) {
        // In case some event logs were missed
        const args = command.split(" ").slice(1);
        const chainId = Number(args[0]);
        const fromBlock = BigInt(args[1]);
        const toBlock = BigInt(args[2]);
        historySync(multichainWatcher, chainId, fromBlock, toBlock, [VerifiedContributorContract.address, VerifiedContributorTagManagerContract.address]).catch(
          (err) => console.error(`Error while executing history sync: ${err}`)
        );
      }
    } catch (err) {
      console.error(`Error interpreting command: ${err}`);
    }
  });
}

start().catch(console.error);
