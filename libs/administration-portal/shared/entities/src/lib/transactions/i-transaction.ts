export enum TransactionType {
  ListingPayment,
  PremiumPackagePayment
}

export enum PaymentStatus {
  Unknown,
  Complete,
  Cancelled
}

export interface ITransaction {
  id: string,
  type: TransactionType,
  reference: string,
  grossAmount: number,
  feeAmount: number,
  netAmount: number,
  status: PaymentStatus,
  createdAt: Date,
  updatedAt: Date,
  userName: string,
  sellerName: string,
  listingName: string,
  listingStartingPrice: number,
  bidAmount: number,
  premiumPackageNumberOfDays: number
}