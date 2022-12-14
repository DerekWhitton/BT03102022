import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ListingsActions from './listings.actions';
import { ISellerListing } from '@bushtrade/website/shared/entites';

export const LISTINGS_FEATURE_KEY = 'listings';

export interface State extends EntityState<ISellerListing> {
  imageIds?: any[];
  selectedId?: string | number; // which Listings record has been selected
  loaded: boolean; // has the Listings list been loaded
  saved: boolean; // listing saved
  error?: any | null; // last known error (if any)
}

export interface ListingsPartialState {
  readonly [LISTINGS_FEATURE_KEY]: State;
}

export const listingsAdapter: EntityAdapter<ISellerListing> = createEntityAdapter<
  ISellerListing
>();

export const initialState: State = listingsAdapter.getInitialState({
  // set initial required properties
  imageIds: [],
  saved: false,
  loaded: false,
});

const listingsReducer = createReducer(
  initialState,
  on(ListingsActions.loadListings, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ListingsActions.loadListingsSuccess, (state, { payload }) =>
    listingsAdapter.setAll(payload.items, { ...state, loaded: true })
  ),
  on(ListingsActions.loadListingsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ListingsActions.addListing, (state) => ({
    ...state,
    saved: false,
    error: null,
  })),
  on(ListingsActions.addListingSuccess, (state, { listing }) =>
    listingsAdapter.upsertOne(listing, {
      ...state,
      loaded: true,
      saved: true,
      error: false
    })
  ),
  on(ListingsActions.addListingFailure, (state, { error }) => ({
    ...state,
    saved: true,
    error,
  })),
  on(ListingsActions.loadListingSuccess, (state, { listing }) =>
    listingsAdapter.upsertOne(listing, {
      ...state,
      selectedId: listing.id,
      loaded: true,
    })
  ),
  on(ListingsActions.loadListingFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ListingsActions.updateListing, (state) => ({
    ...state,
    saved: false,
    error: null,
  })),
  on(ListingsActions.updateListingSuccess, (state, { listing }) =>
    listingsAdapter.upsertOne(listing, {
      ...state,
      loaded: true,
      saved: true,
      error: false
    })
  ),
  on(ListingsActions.updateListingFailure, (state, { error }) => ({
    ...state,
    saved: true,
    error,
  })),
  on(ListingsActions.deleteListingSuccess, (state, { listingId }) =>
    listingsAdapter.removeOne(listingId, {
      ...state,
      loaded: true,
    })
  ),
  on(ListingsActions.deleteListingFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return listingsReducer(state, action);
}
