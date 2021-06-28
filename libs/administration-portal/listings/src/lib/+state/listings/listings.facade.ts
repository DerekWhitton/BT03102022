import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import * as fromListings from './listings.reducer';
import * as ListingsSelectors from './listings.selectors';

@Injectable()
export class ListingsFacade {
  loaded$ = this.store.pipe(select(ListingsSelectors.getListingsLoaded));
  allListings$ = this.store.pipe(select(ListingsSelectors.getAllListings));
  error$ = this.store.pipe(select(ListingsSelectors.getListingsError));
  selectedListings$ = this.store.pipe(select(ListingsSelectors.getSelected));
  nextPage$ = this.store.pipe(select(ListingsSelectors.getNextPage));
  previousPage$ = this.store.pipe(select(ListingsSelectors.getPreviousPage));
  deletionSuccessful$ = this.store.pipe(select(ListingsSelectors.getDeleteStatus));

  constructor(private store: Store<fromListings.ListingsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
