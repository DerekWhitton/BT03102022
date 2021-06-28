import { Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType,
  OnInitEffects,
  act,
} from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromListings from './listings.reducer';
import * as ListingsActions from './listings.actions';
import { ListingsService } from '@bushtrade/website/shared/services';
import { map, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class ListingsEffects {
  loadListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadListings),
      fetch({
        run: (action) => {
          return this.listingsService
            .loadSellerListings(action.sellerId)
            .pipe(
              map((response) =>
                ListingsActions.loadListingsSuccess({ payload: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.loadListingsFailure({ error });
        },
      })
    )
  );

  addListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.addListing),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.listingsService
            .addSellerListing(action.sellerId, action.listing)
            .pipe(
              map((response) =>
                ListingsActions.addListingSuccess({ listing: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.addListingFailure({ error });
        },
      })
    )
  );

  loadListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadListing),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.listingsService
            .loadSellerListing(action.sellerId, action.listingId)
            .pipe(
              map((response) =>
                ListingsActions.loadListingSuccess({ listing: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.loadListingFailure({ error });
        },
      })
    )
  );

  updateListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.updateListing),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { listings } = state;
          return this.listingsService
            .updateSellerListing(
              action.sellerId,
              action.listingId,
              action.listing
            )
            .pipe(
              map((response) =>
                ListingsActions.updateListingSuccess({ listing: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.updateListingFailure({ error });
        },
      })
    )
  );

  deleteListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.deleteListing),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { listings } = state;
          return this.listingsService
            .deleteSellerListing(action.sellerId, action.listingId)
            .pipe(
              map((response) =>
                ListingsActions.deleteListingSuccess({
                  listingId: action.listingId,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.deleteListingFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private listingsService: ListingsService
  ) {}
}
