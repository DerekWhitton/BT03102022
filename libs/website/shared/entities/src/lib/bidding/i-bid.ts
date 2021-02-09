export interface IBidRequest {
  listingId: string;
  amount: number;
}

export interface IBid {
  firstName: string;
  amount: number;
  placedAt: Date;
}

export interface IPurchase extends IBid {
  expiresAt: Date;
}
