import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as ListingsActions from './listings.actions';
import { ListingsService } from '@bushtrade/administration-portal/shared/services';

@Injectable()
export class ListingsEffects {
  loadListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadListings),
      fetch({
        run: (action) => {
          return this.listingService
            .loadListings(action.page, action.perPage, action.query, action.onlyReported, action.includeDeleted)
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

  markListingDeleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.markListingDeleted),
      fetch({
        run: (action) => {
          return this.listingService
            .marListingDeleted(action.listingId, action.deleteReason)
            .pipe(
              map((response) =>
                ListingsActions.markListingDeletedSuccess({ payload: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.markListingDeletedFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private listingService: ListingsService
  ) {}
}
