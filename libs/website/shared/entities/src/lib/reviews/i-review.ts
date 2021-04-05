export interface IReview {
  id: string;
  listingId: string;
  sellerName: string;
  buyerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
