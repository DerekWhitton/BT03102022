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
