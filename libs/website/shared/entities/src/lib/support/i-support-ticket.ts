import { ISupportTicketMessage } from './i-support-ticket-message';

export enum SupportTicketCategory {
  Listing,
  Purchase,
  Bidding,
  Account,
  Other,
  Dispute,
  ListingReport
}

export interface ISupportTicket {
  id: string;
  userName: string;
  listingId: string;
  title: string;
  category: SupportTicketCategory;
  isClosed: boolean;
  inProgress: boolean;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
  messages: ISupportTicketMessage[];
}
