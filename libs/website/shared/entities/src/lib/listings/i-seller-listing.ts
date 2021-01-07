import { ListingType } from '../definitions/i-listing';

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
  type: ListingType;
  priceIncrement: number;
  reservePrice: number;
  active: boolean;
  isPremium: boolean;
  quantity: number;
  startDate: Date;
  endDate: Date;
  categoryId: string;
  listingPropertyValues: ISellerListingPropertyValue[];
  createdAt: Date;
  updatedAt: Date;
  images: ISellerListingImage[];
}
