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
  isFavorite: boolean;
  startingPrice: number;
  type: ListingType;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  isPremium: boolean;
  images: Image[];
}

export interface IDynamicListing extends IListing {
  timeRemaining: number;
}
