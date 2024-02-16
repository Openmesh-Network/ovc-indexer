import { zeroAddress } from "viem";

import { VerifiedContributorsStorage } from "..";

export function createVerifiedContributorIfNotExists(verifiedContributors: VerifiedContributorsStorage, tokenId: bigint): void {
  if (!verifiedContributors[tokenId.toString()]) {
    verifiedContributors[tokenId.toString()] = {
      owner: zeroAddress,
      tags: [],
    };
  }
}
