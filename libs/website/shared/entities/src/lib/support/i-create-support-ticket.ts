import { SupportTicketCategory } from "./i-support-ticket";

export interface ICreateSupportTicket {
  listingId: string;
  purchaseId: string;
  title: string;
  message: string;
  category: SupportTicketCategory
}
