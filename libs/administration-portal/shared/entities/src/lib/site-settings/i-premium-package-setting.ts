import { PackageType } from "./i-package-type";

export interface IPremiumPackageSetting {
  id: string,
  isActive: string,
  numberOfDays: string,
  priority: number,
  price: number,
  createdAt: Date,
  packageType: PackageType
}
