import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PURCHASES_FEATURE_KEY,
  State,
  PurchasesPartialState,
  purchasesAdapter,
} from './purchases.reducer';

// Lookup the 'Purchases' feature state managed by NgRx
export const getPurchasesState = createFeatureSelector<
  PurchasesPartialState,
  State
>(PURCHASES_FEATURE_KEY);

const { selectAll, selectEntities } = purchasesAdapter.getSelectors();

export const getPurchasesLoaded = createSelector(
  getPurchasesState,
  (state: State) => state.loaded
);

export const getPurchasesError = createSelector(
  getPurchasesState,
  (state: State) => state.error
);

export const getAllPurchases = createSelector(
  getPurchasesState,
  (state: State) => selectAll(state)
);

export const getPurchasesEntities = createSelector(
  getPurchasesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPurchasesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getPurchasesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getPaymentDetailsLoaded = createSelector(
  getPurchasesState,
  (state: State) => state.loadedPaymentDetails
);

export const getPaymentDetails = createSelector(
  getPurchasesState,
  (state: State) => state.paymentDetails
);
