import { PackageType } from "../shared-entities";

export interface IListingPremiumPackage {
  id: string,
  numberOfDays: number,
  price: number,
  dateActivated: Date,
  expiryDate: Date,
  packageType: PackageType
}