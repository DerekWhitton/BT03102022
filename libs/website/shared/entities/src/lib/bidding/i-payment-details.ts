export interface IPaymentDetails {
  url: string;
  paid: boolean;
  total: number;
  fields: { [key: string]: string };
}
