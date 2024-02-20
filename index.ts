import { config as loadEnv } from "dotenv";
import express from "express";
import storageManager from "node-persist";
import { Address, Hex } from "viem";
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
import { OptimisticPayment } from "./types/optimistic-payment";
import { watchOptimisticPaymentCreated } from "./event-watchers/OptimisticPaymentCreated";
import { watchOptimisticPaymentRejected } from "./event-watchers/OptimisticPaymentRejected";
import { watchOptimisticPaymentExecuted } from "./event-watchers/OptimisticPaymentExecuted";

export interface VerifiedContributorsStorage {
  [tokenId: string]: VerfiedContributor;
}
export interface DepartmentsStorage {
  [hash: Hex]: Department;
}
export type ScoresStorage = Epoch[];
export interface OptimisticPaymentsStorage {
  [dao: Address]: {
    [requestId: number]: OptimisticPayment;
  };
}
export interface Storage {
  verifiedContributors: PersistentJson<VerifiedContributorsStorage>;
  departments: PersistentJson<DepartmentsStorage>;
  scores: PersistentJson<ScoresStorage>;
  optimisticPayments: PersistentJson<OptimisticPaymentsStorage>;
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
  const storage: Storage = {
    verifiedContributors: new PersistentJson<VerifiedContributorsStorage>("verifiedContributors", {}),
    departments: new PersistentJson<DepartmentsStorage>("departments", {
      ["0xD2F13CD29396B9C8521BEBE1F04844500C1EA11F55F41FFE5C9F9835370C870C"]: { name: "Smart Contracts", dao: "0x7530bbf2c0684656f171aff4fdf93dacfc1189fd" },
    }),
    scores: new PersistentJson<ScoresStorage>("scores", []),
    optimisticPayments: new PersistentJson<OptimisticPaymentsStorage>("optimisticPayments", {}),
  };

  multichainWatcher.forEach((contractWatcher) => {
    watchTaskCompleted(contractWatcher, storage);
    if (contractWatcher.chain.id === 80001) {
      // Verified Contributors is only deployed on this chain
      watchVerifiedContributorTransfer(contractWatcher, storage);
      watchVerifiedContributorTagAdded(contractWatcher, storage);
      watchVerifiedContributorTagRemoved(contractWatcher, storage);

      // Departments are only on this chain
      watchOptimisticPaymentCreated(contractWatcher, storage);
      watchOptimisticPaymentRejected(contractWatcher, storage);
      watchOptimisticPaymentExecuted(contractWatcher, storage);
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

  var server = app.listen(process.env.PORT ?? 3001, () => {
    const addressInfo = server.address() as any;
    var host = addressInfo.address;
    var port = addressInfo.port;
    console.log(`Webserver started on ${host}:${port}`);
  });
}

start().catch(console.error);
