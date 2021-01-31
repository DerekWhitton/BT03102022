import { SupportTicketCategory } from "./i-support-ticket";

export interface ICreateSupportTicket {
  listingId: string;
  title: string;
  message: string;
  category: SupportTicketCategory
}
