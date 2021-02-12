import { ListingType } from '../listings/i-listing';

export interface ICreateOrUpdateListing {
  id: string;
  name: string;
  description: string;
  active: boolean;
  startingPrice: number;
  priceIncrement: number;
  quantity: number;
  type: ListingType;
  categoryId: string;
  listingImageIds: string[];
  listingPropertyValues: ListingPropertyValue[];
}

export interface ListingPropertyValue {
  categoryPropertyId: string;
  value: string;
}
