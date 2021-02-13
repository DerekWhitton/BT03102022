import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromPurchases from './purchases.reducer';
import * as PurchasesSelectors from './purchases.selectors';

@Injectable()
export class PurchasesFacade {
  loaded$ = this.store.pipe(select(PurchasesSelectors.getPurchasesLoaded));
  allPurchases$ = this.store.pipe(select(PurchasesSelectors.getAllPurchases));
  selectedPurchases$ = this.store.pipe(select(PurchasesSelectors.getSelected));
  paymentDetailsLoaded$ = this.store.pipe(
    select(PurchasesSelectors.getPaymentDetailsLoaded)
  );

  paymentDetails$ = this.store.pipe(
    select(PurchasesSelectors.getPaymentDetails)
  );

  constructor(private store: Store<fromPurchases.PurchasesPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
