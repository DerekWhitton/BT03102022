import { IBid, IListing } from '../..';

export interface IPurchase {
  id: string;
  listingId: string;
  conversationId: string;
  amount: number;
  listing: IListing;
  bid: IBid;
  purchasedAt: Date;
  dateCompleted: Date;
  dateCancelled: Date;
}
