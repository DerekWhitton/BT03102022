export interface ICreateOrUpdatePremiumPackageSetting {
  id: string,
  isActive: boolean,
  numberOfDays: number,
  priority: number,
  price: number
}