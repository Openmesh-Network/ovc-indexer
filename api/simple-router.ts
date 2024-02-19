import { Express, Response } from "express";

import { Storage } from "..";
import { replacer } from "../openrd-indexer/utils/json";
import { parseBigInt } from "../openrd-indexer/utils/parseBigInt";
import { calculateScore } from "../utils/score-calculator";
import { isHex, maxUint256, zeroAddress } from "viem";
import { normalizeAddress } from "../openrd-indexer/event-watchers/userHelpers";

function malformedRequest(res: Response, error: string): void {
  res.statusCode = 400;
  res.end(error);
}

export function registerRoutes(app: Express, storage: Storage) {
  const basePath = "/indexer/";

  // Gets details of a single verified contributor
  app.get(basePath + "verifiedContributor/:tokenId", async function (req, res) {
    const tokenId = parseBigInt(req.params.tokenId);
    if (tokenId === undefined) {
      return malformedRequest(res, "tokenId is not a valid bigint");
    }

    const verifiedContributors = await storage.verifiedContributors.get();
    const verifiedContributor = verifiedContributors[tokenId.toString()];
    if (!verifiedContributor) {
      res.statusCode = 404;
      return res.end("Verified Contributor not found");
    }

    res.end(JSON.stringify(verifiedContributor, replacer));
  });

  // Gets details of a single department
  app.get(basePath + "department/:hash", async function (req, res) {
    const hash = req.params.hash;
    if (!isHex(hash)) {
      return malformedRequest(res, "hash is not valid hex");
    }

    const departments = await storage.departments.get();
    const department = departments[hash];
    if (!department) {
      res.statusCode = 404;
      return res.end("Department not found");
    }

    res.end(JSON.stringify(department, replacer));
  });

  // Gets the score of a single verified contributor
  app.get(basePath + "score/:tokenId", async function (req, res) {
    const tokenId = parseBigInt(req.params.tokenId);
    if (tokenId === undefined) {
      return malformedRequest(res, "tokenId is not a valid bigint");
    }

    const scores = await storage.scores.get();
    const score = calculateScore(scores, tokenId);

    res.end(JSON.stringify({ score: score }, replacer));
  });

  // Gets the all scores of verified contributors, sorted from high to low
  app.get(basePath + "leaderboard", async function (req, res) {
    const verifiedContributors = await storage.verifiedContributors.get();
    const tokenIds = Object.keys(verifiedContributors).map((tokenId) => parseBigInt(tokenId));
    const scores = await storage.scores.get();
    const leaderboard = tokenIds
      .map((tokenId) => {
        if (tokenId === undefined) {
          console.warn(`Got non bigint verified contributor token id in leaderboard calculation`);
          return { tokenId: maxUint256, score: 0 };
        }
        if (verifiedContributors[tokenId.toString()].owner === normalizeAddress(zeroAddress)) {
          // Token was burned
          return { tokenId: maxUint256, score: 0 };
        }
        const score = calculateScore(scores, tokenId);
        return { tokenId: tokenId, score: score };
      })
      .filter((vc) => vc.tokenId !== maxUint256)
      .sort((vc1, vc2) => vc2.score - vc1.score);

    res.end(JSON.stringify(leaderboard, replacer));
  });

  // Gets all department hashes
  app.get(basePath + "departments", async function (req, res) {
    const departments = await storage.departments.get();
    const hashes = Object.keys(departments).map((hash) => {
      return { hash: hash };
    });

    res.end(JSON.stringify(hashes, replacer));
  });

  // Gets the total number of verified contributors
  app.get(basePath + "totalVerifiedContributors", async function (req, res) {
    const verifiedContributors = await storage.verifiedContributors.get();
    const totalVerifiedContributors = Object.values(verifiedContributors).filter((vc) => vc.owner !== normalizeAddress(zeroAddress)).length;

    res.end(JSON.stringify({ totalVerifiedContributors: totalVerifiedContributors }, replacer));
  });
}
