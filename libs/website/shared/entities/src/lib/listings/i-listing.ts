import { PackageType } from '../site-settings/i-package-type';

export enum ListingType {
  Auction,
  Sale,
}

export interface Image {
  url: string;
}

export class IPremiumListingBase {
  activePremiumPackageTypes: PackageType[];
  isPremium: boolean;
  isHighlight: boolean;
  isUrgent: boolean;
  isHomepage: boolean;
  isHyperlink: boolean;

  constructor(listing: any) {
    this.activePremiumPackageTypes = listing.activePremiumPackageTypes;
    this.isPremium =
      this.activePremiumPackageTypes.indexOf(PackageType['Top Ad']) > -1;
    this.isHighlight =
      this.activePremiumPackageTypes.indexOf(PackageType['Highlight Ad']) > -1;
    this.isUrgent =
      this.activePremiumPackageTypes.indexOf(PackageType['Urgent Ad']) > -1;
    this.isHomepage =
      this.activePremiumPackageTypes.indexOf(PackageType['Homepage Ad']) > -1;
    this.isHyperlink =
      this.activePremiumPackageTypes.indexOf(PackageType['Hyperlink Ad']) > -1;
  }
}

export class IListing extends IPremiumListingBase {
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
  listingLocationName: string;
  hyperlink: string;
  images: Image[];

  constructor(listing: any) {
    super(listing);
    for (let key in listing) {
      this[key] = listing[key];
    }
  }
}

export interface IDynamicListing extends IListing {
  timeRemaining: number;
}
