export interface IListing {
  id: string;
  name: string;
  startingPrice: number;
  images : IListingImage[]
}

export interface IListingImage {
  id: string,
  storageUri: string
}

export enum ListingType {
  Auction,
  Sale,
}
