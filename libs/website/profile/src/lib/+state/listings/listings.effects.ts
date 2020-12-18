import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
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
            .loadListings(action.sellerId)
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

  addListingImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.addListingImage),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.listingsService
            .uploadListingImage(action.sellerId, action.file)
            .pipe(
              map((response) =>
                ListingsActions.addListingImageSuccess({
                  imageId: response,
                  file: action.file,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.addListingImageFailure({ error });
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
            .addListing(action.sellerId, action.listing)
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

  constructor(
    private actions$: Actions,
    private store: Store,
    private listingsService: ListingsService
  ) {}
}
