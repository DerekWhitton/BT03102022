import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPurchases from './purchases.reducer';
import * as PurchasesActions from './purchases.actions';
import {
  OnInitEffects,
  onInitEffects,
} from '@ngrx/effects/src/lifecycle_hooks';
import { Action, Store } from '@ngrx/store';
import { PurchasesService } from '@bushtrade/website/shared/services';
import { map, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class PurchasesEffects implements OnInitEffects {
  loadPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.loadPurchases),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return this.purchasesSvc
            .getPurchases()
            .pipe(
              map((response) =>
                PurchasesActions.loadPurchasesSuccess({ payload: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return PurchasesActions.loadPurchasesFailure({ error });
        },
      })
    )
  );

  loadPaymentDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.loadPaymentDetails),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return this.purchasesSvc
            .getListingPaymentDetails(action.id)
            .pipe(
              map((details) =>
                PurchasesActions.loadPaymentDetailsSuccess({ details })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EMPTY;
        },
      })
    )
  );

  markReceivedGoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.markReceivedGoods),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return this.purchasesSvc
            .markReceivedGoods(action.id)
            .pipe(
              map((response) =>
                PurchasesActions.markReceivedGoodsSuccess({ purchase: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return PurchasesActions.markReceivedGoodsFailure({ error });
        },
      })
    )
  );

  cancelPurchase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.cancelPurchase),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return this.purchasesSvc
            .cancelListingPurchase(action.id)
            .pipe(
              map((response) =>
                PurchasesActions.cancelPurchaseSuccess({ purchase: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EMPTY;
        },
      })
    )
  );

  setPurchaseDisputeId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.setPurchaseDisputeId),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return PurchasesActions.setPurchaseDisputeIdSuccess({ purchaseId: action.purchaseId, disputeId: action.disputeId });
        },
        onError: (action, error) => {
          console.error('Error', error);
        },
      })
    )
  );

  setPurchaseReviewed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.setPurchaseReviewed),
      withLatestFrom(this.store),
      fetch({
        run: (action) => {
          return PurchasesActions.setPurchaseReviewedSuccess({ purchaseId: action.purchaseId });
        },
        onError: (action, error) => {
          console.error('Error', error);
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private purchasesSvc: PurchasesService,
    private store: Store
  ) {}

  ngrxOnInitEffects(): Action {
    return PurchasesActions.loadPurchases();
  }
}
