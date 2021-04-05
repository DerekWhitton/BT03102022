import {
  IPaginatedResponse,
  IPaymentDetails,
  IPurchase,
} from '@bushtrade/website/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadPurchases = createAction('[Purchases] Load Purchases');

export const loadPurchasesSuccess = createAction(
  '[Purchases] Load Purchases Success',
  props<{ payload: IPaginatedResponse<IPurchase> }>()
);

export const loadPurchasesFailure = createAction(
  '[Purchases] Load Purchases Failure',
  props<{ error: any }>()
);

export const loadPaymentDetails = createAction(
  '[Purchases] Load Payment Details',
  props<{ id: string }>()
);

export const loadPaymentDetailsSuccess = createAction(
  '[Purchases] Load Payment Details Success',
  props<{ details: IPaymentDetails }>()
);

export const markReceivedGoods = createAction(
  '[Purchases] Mark Received Goods',
  props<{ id: string }>()
);

export const markReceivedGoodsSuccess = createAction(
  '[Purchases] Mark Received Goods Success',
  props<{ purchase: IPurchase }>()
);

export const markReceivedGoodsFailure = createAction(
  '[Purchases] Mark Received Goods Failure',
  props<{ error: any }>()
);

export const cancelPurchase = createAction(
  '[Purchases] Cancel Payment',
  props<{ id: string }>()
);

export const cancelPurchaseSuccess = createAction(
  '[Purchases] Cancel Payment Success',
  props<{ purchase: IPurchase }>()
);

export const cancelPurchaseFailure = createAction(
  '[Purchases] Cancel Purchases Failure',
  props<{ error: any }>()
);

export const setPurchaseDisputeId = createAction(
  '[Purchases] Set Purchase Dispute Id',
  props<{ purchaseId: any, disputeId: any }>()
);

export const setPurchaseDisputeIdSuccess = createAction(
  '[Purchases] Set Purchase Dispute Id Success',
  props<{ purchaseId: any, disputeId: any }>()
);

export const setPurchaseReviewed = createAction(
  '[Purchases] Set Purchase as Reviewed',
  props<{ purchaseId: any }>()
);

export const setPurchaseReviewedSuccess = createAction(
  '[Purchases] Set Purchase as Reviewed Success',
  props<{ purchaseId: any }>()
);
