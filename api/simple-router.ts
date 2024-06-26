import { Express, Response, json } from "express";
import { Address, isAddress, maxUint256, zeroAddress } from "viem";

import { Storage } from "..";
import { replacer, reviver } from "../openrd-indexer/utils/json.js";
import { parseBigInt } from "../openrd-indexer/utils/parseBigInt.js";
import { calculateScore } from "../utils/score-calculator.js";
import { normalizeAddress } from "../openrd-indexer/utils/normalize-address.js";
import { ClaimRequest } from "../types/requests";

function malformedRequest(res: Response, error: string): void {
  res.statusCode = 400;
  res.end(error);
}

export function registerRoutes(app: Express, storage: Storage) {
  const basePath = "/indexer/";
  app.use(json());

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

  // Gets information about a certain account
  app.get(basePath + "user/:address", async function (req, res) {
    const address = req.params.address;
    if (!address || !isAddress(address)) {
      return malformedRequest(res, "address is not a valid address");
    }

    const verifiedContributors = await storage.verifiedContributors.get();
    const user = {
      verifiedContributors: Object.keys(verifiedContributors).filter(
        (tokenId) => normalizeAddress(verifiedContributors[tokenId].owner) === normalizeAddress(address)
      ),
    };

    res.end(JSON.stringify(user, replacer));
  });

  // Gets the total number of verified contributors
  app.get(basePath + "totalVerifiedContributors", async function (req, res) {
    const verifiedContributors = await storage.verifiedContributors.get();
    const totalVerifiedContributors = Object.values(verifiedContributors).filter((vc) => vc.owner !== normalizeAddress(zeroAddress)).length;

    res.end(JSON.stringify({ totalVerifiedContributors: totalVerifiedContributors }, replacer));
  });

  // Gets all claim requests of a single user
  app.get(basePath + "claimRequest/:address", async function (req, res) {
    const address = req.params.address;
    if (!address || !isAddress(address)) {
      return malformedRequest(res, "address is not a valid address");
    }

    const claimRequests = await storage.claimRequests.get();
    const userRequests = claimRequests.filter((req) => normalizeAddress(req.receiver as Address) === normalizeAddress(address));

    res.end(JSON.stringify(userRequests, replacer));
  });

  // Gets all pending claim requests
  app.get(basePath + "claimRequests", async function (req, res) {
    const claimRequests = await storage.claimRequests.get();
    const pendingRequests = claimRequests.filter((req) => req.type === "pending");

    res.end(JSON.stringify(pendingRequests, replacer));
  });

  // Upload reviewed claim requests
  app.post(basePath + "reviewClaimRequests", async function (req, res) {
    try {
      if (req.header("Authorization") !== process.env.CLAIM_REVIEW_SECRET) {
        return malformedRequest(res, "invalid review request secret");
      }
      const requests: ClaimRequest[] = JSON.parse(JSON.stringify(req.body), reviver);

      await storage.claimRequests.update((claimRequests) => {
        for (let i = 0; i < claimRequests.length; i++) {
          const newRequest = requests.find((req) => req.claimId === claimRequests[i].claimId);
          if (newRequest) {
            // Request should be updated
            claimRequests[i] = {
              ...claimRequests[i],
              ...newRequest,
            };
          }
        }
      });

      res.end(JSON.stringify({ success: true }, replacer));
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(JSON.stringify({ success: false }, replacer));
    }
  });
}
