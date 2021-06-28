export interface ISellerReview {
  id: string;
  listingId: string;
  sellerName: string;
  buyerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IListingSeller {
  id: string;
  name: string;
  createdAt: Date;
  userProfilePictureUri: string;
  latestReviews: ISellerReview[];
}