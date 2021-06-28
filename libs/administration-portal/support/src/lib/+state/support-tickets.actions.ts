
import { IPaginatedResponse, ISupportTicket, ISupportTicketMessage, SupportTicketCategory } from '@bushtrade/administration-portal/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadSupportTickets = createAction(
  '[SupportTickets] Load SupportTickets',
  props<{ page: number,
    perPage: number,
    query?: string,
    category?: SupportTicketCategory,
    includeClosed?: boolean
  }>()
);

export const loadSupportTicketsSuccess = createAction(
  '[SupportTickets] Load SupportTickets Success',
  props<{ supportTickets: IPaginatedResponse<ISupportTicket> }>()
);

export const loadSupportTicketsFailure = createAction(
  '[SupportTickets] Load SupportTickets Failure',
  props<{ error: any }>()
);

export const setSelectedTicket = createAction(
  '[Forums] Set Selected Ticket',
  props<{ id: string }>()
);

export const loadSupportTicketDetails = createAction(
  '[SupportTicketDetails] Load SupportTicketDetails',
  props<{ ticketId: string }>()
);

export const loadSupportTicketDetailsSuccess = createAction(
  '[SupportTicketDetails] Load SupportTicketDetails Success',
  props<{ supportTicketDetails: ISupportTicket }>()
);

export const loadSupportTicketDetailsFailure = createAction(
  '[SupportTicketDetails] Load SupportTicketDetails Failure',
  props<{ error: any }>()
);

export const createSupportTicketMessage = createAction(
  '[SupportTicketMessage] Create Support Ticket Message',
  props<{ supportTicketMessage: string }>()
);

export const createSupportTicketMessageSuccess = createAction(
  '[SupportTicketMessage] Create Support Ticket Message Success',
  props<{ supportTicketMessage: ISupportTicketMessage }>()
);

export const createSupportTicketMessageFailure = createAction(
  '[SupportTicketMessage] Create Support Ticket Message Failure',
  props<{ error: any }>()
);

export const closeSupportTicket = createAction(
  '[SupportTicket] Close Support Ticket',
  props<{ ticketId: string }>()
);

export const closeSupportTicketSuccess = createAction(
  '[SupportTicket] Close Support Ticket Success',
  props<{ supportTicket: ISupportTicket }>()
);

export const closeSupportTicketFailure = createAction(
  '[SupportTicket] Close Support Ticket Failure',
  props<{ error: any }>()
);
