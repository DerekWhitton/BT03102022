import { PackageType } from "./i-package-type";

export interface ICreateOrUpdatePremiumPackageSetting {
  id: string,
  isActive: boolean,
  numberOfDays: number,
  priority: number,
  price: number,
  packageType: PackageType
}
