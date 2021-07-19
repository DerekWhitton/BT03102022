import { ListingType } from '../listings/i-listing';
import { ILocation } from '../shared-entities';

export interface ISellerListingPropertyValue {
  categoryPropertyId: string;
  value: string;
}

export interface ISellerListingImage {
  id: string;
  url: string;
}

export interface ISellerListing {
  id: string;
  name: string;
  startingPrice: number;
  description: string;
  listingLocation: ILocation;
  type: ListingType;
  priceIncrement: number;
  reservePrice: number;
  shippingDetails: string;
  active: boolean;
  isPremium: boolean;
  quantity: number;
  startDate: Date;
  durationInDays: number;
  endDate: Date;
  categoryId: string;
  hyperlink: string;
  listingPropertyValues: ISellerListingPropertyValue[];
  createdAt: Date;
  updatedAt: Date;
  images: ISellerListingImage[];
  isAuctionClosed: boolean;
  isSold: boolean;
  purchaseId: string;
  numberOfInterestedUsers: number;
}
