export enum ListingType {
  Auction,
  Sale,
}

export interface Image {
  url: string;
}

export interface IListing {
  id: string;
  name: string;
  description: string;
  active: boolean;
  startingPrice: number;
  type: ListingType;
  startDate: Date;
  endDate: Date;
  images: Image[];
}
