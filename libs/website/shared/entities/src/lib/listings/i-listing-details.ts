import { ListingType, Image } from "../..";
import { IPremiumListingBase } from "./i-listing";

export interface IListingPropertyValue {
  categoryPropertyName: string;
  value: string;
}

export class IListingDetails extends IPremiumListingBase {
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
  hyperlink: string;
  startDate: Date;
  endDate: Date;
  images: Image[];
  listingPropertyValues: IListingPropertyValue[];
  locationName: string;

  constructor(listing: any) {
    super(listing);
    for (let key in listing) {
      this[key] = listing[key];
    }
  }
}
