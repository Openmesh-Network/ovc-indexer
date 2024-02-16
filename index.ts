import { config as loadEnv } from "dotenv";
import express from "express";
import storageManager from "node-persist";
import { Hex } from "viem";
import { mainnet, polygon, polygonMumbai, sepolia } from "viem/chains";

import { registerRoutes } from "./api/simple-router";
import { watchTaskCompleted } from "./event-watchers/TaskCompleted";
import { VerfiedContributor } from "./types/verified-contributor";
import { MultischainWatcher } from "./openrd-indexer/utils/multichain-watcher";
import { PersistentJson } from "./openrd-indexer//utils/persistent-json";
import { Department } from "./types/department";
import { Epoch } from "./types/score";
import { watchVerifiedContributorTransfer } from "./event-watchers/VerifiedContributorTransfer";
import { watchVerifiedContributorTagAdded } from "./event-watchers/VerifiedContributorTagAdded";
import { watchVerifiedContributorTagRemoved } from "./event-watchers/VerifiedContributorTagRemoved";

export interface VerifiedContributorsStorage {
  [tokenId: string]: VerfiedContributor;
}
export interface DepartmentsStorage {
  [hash: Hex]: Department;
}
export type ScoresStorage = Epoch[];
export interface Storage {
  verifiedContributors: PersistentJson<VerifiedContributorsStorage>;
  departments: PersistentJson<DepartmentsStorage>;
  scores: PersistentJson<ScoresStorage>;
}

async function start() {
  const loadEnvResult = loadEnv();
  if (loadEnvResult.error) {
    console.warn(`Error while loading .env: ${JSON.stringify(loadEnvResult.error)}`);
  }

  // Make contract watcher for each chain (using Infura provider)
  const multichainWatcher = new MultischainWatcher([
    {
      chain: mainnet,
      infuraPrefix: "mainnet",
    },
    {
      chain: sepolia,
      infuraPrefix: "sepolia",
    },
    {
      chain: polygon,
      infuraPrefix: "polygon-mainnet",
    },
    {
      chain: polygonMumbai,
      infuraPrefix: "polygon-mumbai",
    },
  ]);

  // Data (memory + json files (synced) currently, could be migrated to a database solution if needed in the future)
  await storageManager.init({ dir: "storage" });
  const storage = {
    verifiedContributors: new PersistentJson<VerifiedContributorsStorage>("verifiedContributors", {}),
    departments: new PersistentJson<DepartmentsStorage>("departments", {
      ["0x0"]: { name: "Smart Contracts", dao: "0x0" },
    }),
    scores: new PersistentJson<ScoresStorage>("scores", []),
  };

  multichainWatcher.forEach((contractWatcher) => {
    watchTaskCompleted(contractWatcher, storage);
    if (contractWatcher.chain.id === 80001) {
      // Verified Contributors is only deployed on this chain
      watchVerifiedContributorTransfer(contractWatcher, storage);
      watchVerifiedContributorTagAdded(contractWatcher, storage);
      watchVerifiedContributorTagRemoved(contractWatcher, storage);
    }
  });

  process.on("SIGINT", function () {
    console.log("Stopping...");

    multichainWatcher.forEach((contractWatcher) => {
      contractWatcher.stopAll();
    });
    process.exit();
  });

  // Webserver
  const app = express();
  registerRoutes(app, storage);

  var server = app.listen(3001, () => {
    const addressInfo = server.address() as any;
    var host = addressInfo.address;
    var port = addressInfo.port;
    console.log(`Webserver started on ${host}:${port}`);
  });
}

start().catch(console.error);
