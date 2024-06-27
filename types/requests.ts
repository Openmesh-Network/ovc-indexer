export type Address = string;
export type Uint = string;
export type Hex = string;

export interface ClaimRequestBase {
  receiver: Address;
  amount: Uint;
  nonce: Uint;
}

export interface PendingClaimRequest extends ClaimRequestBase {
  type: "pending";
}

export interface ApprovedClaimRequest extends ClaimRequestBase {
  type: "approved";
  approvedSig: Hex;
}

export interface RejectedClaimRequest extends ClaimRequestBase {
  type: "rejected";
  rejectedReason: string;
}

export type ClaimRequest = PendingClaimRequest | ApprovedClaimRequest | RejectedClaimRequest;
