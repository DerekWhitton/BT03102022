import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUPPORTTICKETS_FEATURE_KEY,
  State,
  SupportTicketsPartialState,
  supportTicketsAdapter,
} from './support-tickets.reducer';

// Lookup the 'SupportTickets' feature state managed by NgRx
export const getSupportTicketsState = createFeatureSelector<
  SupportTicketsPartialState,
  State
>(SUPPORTTICKETS_FEATURE_KEY);

const { selectAll, selectEntities } = supportTicketsAdapter.getSelectors();

export const getSupportTicketsLoaded = createSelector(
  getSupportTicketsState,
  (state: State) => state.loaded
);

export const getSupportTicketAdded = createSelector(
  getSupportTicketsState,
  (state: State) => state.supportTicketAdded
);

export const getSupportTicketsError = createSelector(
  getSupportTicketsState,
  (state: State) => state.error
);

export const getAllSupportTickets = createSelector(
  getSupportTicketsState,
  (state: State) => selectAll(state)
);

export const getSupportTicketsEntities = createSelector(
  getSupportTicketsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSupportTicketsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSupportTicketsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getNextSupportTicketsPageNumber = createSelector(
  getSupportTicketsState,
  (state) => state.nextSupportTicketsPage
);

export const getPreviousSupportTicketsPageNumber = createSelector(
  getSupportTicketsState,
  (state) => state.previousSupportTicketsPage
);
