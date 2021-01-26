import { ListingType, Image } from "../..";

export interface IListingPropertyValue {
  categoryPropertyName: string;
  value: string;
}

export interface IListingDetails {
  id: string;
  name: string;
  description: string;
  active: boolean;
  category: string;
  isSold: boolean;
  startingPrice: number;
  reservePrice: number;
  priceIncrement: number;
  type: ListingType;
  startDate: Date;
  endDate: Date;
  images: Image[];
  listingPropertyValues: IListingPropertyValue[];
}