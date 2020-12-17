import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LISTINGS_FEATURE_KEY,
  State,
  ListingsPartialState,
  listingsAdapter,
} from './listings.reducer';

// Lookup the 'Listings' feature state managed by NgRx
export const getListingsState = createFeatureSelector<
  ListingsPartialState,
  State
>(LISTINGS_FEATURE_KEY);

const { selectAll, selectEntities } = listingsAdapter.getSelectors();

export const getListingsLoaded = createSelector(
  getListingsState,
  (state: State) => state.loaded
);

export const getListingsError = createSelector(
  getListingsState,
  (state: State) => state.error
);

export const getAllListings = createSelector(getListingsState, (state: State) =>
  selectAll(state)
);

export const getListingsEntities = createSelector(
  getListingsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getListingsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getListingsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
