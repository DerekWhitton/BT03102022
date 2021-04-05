import { IBid, IListing } from '../..';

export interface IPurchase {
  id: string;
  listingId: string;
  conversationId: string;
  disputeId: string;
  disputeResolved: boolean;
  amount: number;
  listing: IListing;
  bid: IBid;
  dateReceivedGoods: Date;
  purchasedAt: Date;
  reviewed: boolean;
  dateCompleted: Date;
  dateCancelled: Date;
}
