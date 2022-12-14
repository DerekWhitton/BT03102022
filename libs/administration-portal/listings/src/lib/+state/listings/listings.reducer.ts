import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ListingsActions from './listings.actions';
import { IListing } from '@bushtrade/administration-portal/shared/entites';

export const LISTINGS_FEATURE_KEY = 'listings';

export interface State extends EntityState<IListing> {
  selectedId?: string | number; // which Listings record has been selected
  loaded: boolean; // has the Listings list been loaded
  error?: any | null; // last known error (if any)
  nextPage?: number | null;
  previousPage?: number | null;
  deletionSuccessful?: boolean | null;
}

export interface ListingsPartialState {
  readonly [LISTINGS_FEATURE_KEY]: State;
}

export const listingsAdapter: EntityAdapter<IListing> = createEntityAdapter<
  IListing
>();

export const initialState: State = listingsAdapter.getInitialState({
  // set initial required properties
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
    listingsAdapter.setAll(payload.items, {
      ...state,
      loaded: true,
      nextPage: payload.nextPage,
      previousPage: payload.previousPage,
    })
  ),
  on(ListingsActions.loadListingsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ListingsActions.markListingDeleted, (state) => ({
    ...state,
    error: null,
    deletionSuccessful: null
  })),
  on(ListingsActions.markListingDeletedSuccess, (state, { payload }) => {
    return listingsAdapter.upsertOne(payload, {
      ...state,
      deletionSuccessful: true
    });
  }),
  on(ListingsActions.markListingDeletedFailure, (state, { error }) => ({
    ...state,
    error,
    deletionSuccessful: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return listingsReducer(state, action);
}
