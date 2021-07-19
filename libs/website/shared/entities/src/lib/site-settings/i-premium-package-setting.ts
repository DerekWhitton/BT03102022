import { PackageType } from "./i-package-type";

export interface IPremiumPackageSetting {
  id: string,
  numberOfDays: number,
  price: number,
  packageType: PackageType
}