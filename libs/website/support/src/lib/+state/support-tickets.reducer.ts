import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SupportTicketsActions from './support-tickets.actions';
import { ISupportTicket, SupportTicketCategory } from '@bushtrade/website/shared/entites';

export const SUPPORTTICKETS_FEATURE_KEY = 'supportTickets';

export interface State extends EntityState<ISupportTicket> {
  selectedId?: string | number; // which SupportTickets record has been selected
  loaded: boolean; // has the SupportTickets list been loaded
  error?: any | null; // last known error (if any)
  supportTicketAdded: boolean; // has the support ticket been added successfully
  page: number;
  perPage: number;
  query?: string | null;
  category?: SupportTicketCategory | null;
  includeClosed?: boolean | null;
  previousSupportTicketsPage: number | null;
  nextSupportTicketsPage: number | null;
  selectedTicketDetails: ISupportTicket | null;
}

export interface SupportTicketsPartialState {
  readonly [SUPPORTTICKETS_FEATURE_KEY]: State;
}

export const supportTicketsAdapter: EntityAdapter<ISupportTicket> = createEntityAdapter<
  ISupportTicket
>();

export const initialState: State = supportTicketsAdapter.getInitialState({
  page: 1,
  perPage: 10,
  previousSupportTicketsPage: null,
  nextSupportTicketsPage: null,
  loaded: false,
  supportTicketAdded: false,
  selectedTicketDetails: null,
});

const supportTicketsReducer = createReducer(
  initialState,
  on(SupportTicketsActions.loadSupportTickets, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    SupportTicketsActions.loadSupportTicketsSuccess,
    (state, { supportTickets }) =>
      supportTicketsAdapter.setAll(supportTickets.items, {
        ...state,
        loaded: true,
        previousSupportTicketsPage: supportTickets.previousPage,
        nextSupportTicketsPage: supportTickets.nextPage,
      })
  ),
  on(SupportTicketsActions.loadSupportTicketsFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
  })),
  on(SupportTicketsActions.setSelectedTicket, (state, action) => {
    return {
      ...state,
      selectedId: action.id
    }
  }),
  on(SupportTicketsActions.loadSupportTicketDetails, (state) => ({
    ...state,
    detailsLoaded: false,
    error: null,
  })),
  on(SupportTicketsActions.loadSupportTicketDetailsSuccess, (state, action) => {
    const entity = {
      ...state.entities[state.selectedId] ?? action.supportTicketDetails,
      messages: action.supportTicketDetails.messages,
    };
    return supportTicketsAdapter.upsertOne(entity, {
      ...state,
      detailsLoaded: true,
    });
  }),
  on(
    SupportTicketsActions.loadSupportTicketDetailsFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(SupportTicketsActions.createSupportTicket, (state) => ({
    ...state,
    loaded: false,
    supportTicketAdded: false,
    error: null,
  })),
  on(
    SupportTicketsActions.createSupportTicketSuccess,
    (state, { supportTicketDetails }) => ({
      ...state,
      supportTicketAdded: true
    })
  ),
  on(SupportTicketsActions.createSupportTicketFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
  })),
  on(SupportTicketsActions.createSupportTicketMessage, (state) => ({
    ...state,
    error: null,
  })),
  on(
    SupportTicketsActions.createSupportTicketMessageSuccess,
    (state, action) =>{
      const currentMessages = [...state.entities[state.selectedId].messages];
      const entity =  {
        ...state.entities[state.selectedId],
        messages: currentMessages.concat([action.supportTicketMessage])
      };
      return supportTicketsAdapter.upsertOne(entity, { ...state })
    }
  ),
  on(SupportTicketsActions.createSupportTicketMessageFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return supportTicketsReducer(state, action);
}
