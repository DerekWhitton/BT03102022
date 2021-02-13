import { IBid, IListing } from '../..';

export interface IPurchase {
  id: string;
  listingId: string;
  amount: number;
  listing: IListing;
  bid: IBid;
  purchasedAt: Date;
  paidAt: null;
  expiresAt?: Date;
}
