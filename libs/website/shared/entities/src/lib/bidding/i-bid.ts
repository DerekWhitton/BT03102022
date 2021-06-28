export interface IBidRequest {
  listingId: string;
  amount: number;
}

export interface IBid {
  firstName: string;
  userId: string;
  amount: number;
  placedAt: Date;
  conversationId: string;
}
