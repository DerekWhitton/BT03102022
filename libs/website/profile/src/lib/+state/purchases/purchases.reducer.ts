import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PurchasesActions from './purchases.actions';
import { IPaymentDetails, IPurchase } from '@bushtrade/website/shared/entites';

export const PURCHASES_FEATURE_KEY = 'purchases';

export interface State extends EntityState<IPurchase> {
  selectedId?: string | number; // which Purchases record has been selected
  loaded: boolean; // has the Purchases list been loaded
  error?: any | null; // last known error (if any)
  loadedPaymentDetails: boolean;
  paymentDetails?: IPaymentDetails | null;
}

export interface PurchasesPartialState {
  readonly [PURCHASES_FEATURE_KEY]: State;
}

export const purchasesAdapter: EntityAdapter<IPurchase> = createEntityAdapter<
  IPurchase
>();

export const initialState: State = purchasesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  loadedPaymentDetails: false,
});

const purchasesReducer = createReducer(
  initialState,
  on(PurchasesActions.loadPurchases, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PurchasesActions.loadPurchasesSuccess, (state, { payload }) =>
    purchasesAdapter.setAll(payload.items, { ...state, loaded: true })
  ),
  on(PurchasesActions.loadPurchasesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PurchasesActions.loadPaymentDetails, (state) => ({
    ...state,
    loadedPaymentDetails: false,
  })),
  on(PurchasesActions.loadPaymentDetailsSuccess, (state, { details }) => ({
    ...state,
    loadedPaymentDetails: true,
    paymentDetails: details,
  })),
  on(PurchasesActions.markReceivedGoodsSuccess, (state, { purchase }) =>
    purchasesAdapter.upsertOne(purchase, {
      ...state,
      loaded: true,
    })
  ),
  on(PurchasesActions.markReceivedGoodsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PurchasesActions.cancelPurchaseSuccess, (state, { purchase }) =>
    purchasesAdapter.upsertOne(purchase, {
      ...state,
      loaded: true,
    })
  ),
  on(PurchasesActions.cancelPurchaseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    PurchasesActions.setPurchaseDisputeIdSuccess, (state, { purchaseId, disputeId }) => {
      var selectedPurchase = { ...state.entities[purchaseId] };
      selectedPurchase.disputeId = disputeId;
      return purchasesAdapter.upsertOne(selectedPurchase, {
        ...state,
      });
    }
  ),
  on(
    PurchasesActions.setPurchaseReviewedSuccess, (state, { purchaseId }) => {
      var selectedPurchase = { ...state.entities[purchaseId] };
      selectedPurchase.reviewed = true;
      return purchasesAdapter.upsertOne(selectedPurchase, {
        ...state,
      });
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return purchasesReducer(state, action);
}
