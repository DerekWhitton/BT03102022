import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ListingsActions from './listings.actions';
import { IListing } from '@bushtrade/website/shared/entites';

export const LISTINGS_FEATURE_KEY = 'listings';

export interface State extends EntityState<IListing> {
  imageIds?: any[];
  selectedId?: string | number; // which Listings record has been selected
  loaded: boolean; // has the Listings list been loaded
  error?: string | null; // last known error (if any)
}

export interface ListingsPartialState {
  readonly [LISTINGS_FEATURE_KEY]: State;
}

export const listingsAdapter: EntityAdapter<IListing> = createEntityAdapter<
  IListing
>();

export const initialState: State = listingsAdapter.getInitialState({
  // set initial required properties
  imageIds: [],
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
  on(ListingsActions.addListingSuccess, (state, { listing }) =>
    listingsAdapter.upsertOne(listing, { ...state, loaded: true })
  ),
  on(ListingsActions.addListingFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ListingsActions.addListingImageSuccess, (state, { imageId }) => ({
    ...state,
    imageIds: [...state.imageIds, imageId],
  })),
  on(ListingsActions.addListingImageFailure, (state, { error }) => ({
    ...state,
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
  on(ListingsActions.updateListingSuccess, (state, { listing }) =>
    listingsAdapter.upsertOne(listing, {
      ...state,
      loaded: true,
    })
  ),
  on(ListingsActions.updateListingFailure, (state, { error }) => ({
    ...state,
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
