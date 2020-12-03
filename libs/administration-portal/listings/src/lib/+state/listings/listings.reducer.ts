import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ListingsActions from './listings.actions';
import { ListingsEntity } from './listings.models';

export const LISTINGS_FEATURE_KEY = 'listings';

export interface State extends EntityState<ListingsEntity> {
  selectedId?: string | number; // which Listings record has been selected
  loaded: boolean; // has the Listings list been loaded
  error?: string | null; // last known error (if any)
}

export interface ListingsPartialState {
  readonly [LISTINGS_FEATURE_KEY]: State;
}

export const listingsAdapter: EntityAdapter<ListingsEntity> = createEntityAdapter<
  ListingsEntity
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
  on(ListingsActions.loadListingsSuccess, (state, { listings }) =>
    listingsAdapter.setAll(listings, { ...state, loaded: true })
  ),
  on(ListingsActions.loadListingsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return listingsReducer(state, action);
}
