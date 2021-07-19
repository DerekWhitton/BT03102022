import { ListingType } from '../listings/i-listing';
import { ILocation } from '../shared-models/i-location';

export interface ICreateOrUpdateListing {
  id: string;
  name: string;
  description: string;
  listingLocation: ILocation;
  active: boolean;
  startingPrice: number;
  durationInDays: number;
  priceIncrement: number;
  quantity: number;
  type: ListingType;
  hyperlink: string;
  categoryId: string;
  listingImageIds: string[];
  listingPropertyValues: ListingPropertyValue[];
}

export interface ListingPropertyValue {
  categoryPropertyId: string;
  value: string;
}
