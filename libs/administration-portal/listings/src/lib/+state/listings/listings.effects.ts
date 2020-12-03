import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as fromListings from './listings.reducer';
import * as ListingsActions from './listings.actions';
import { ListingsService } from '@bushtrade/administration-portal/shared/services';
import { Action } from '@ngrx/store';
@Injectable()
export class ListingsEffects implements OnInitEffects {
  loadListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadListings),
      fetch({
        run: (action) => {
          return this.listingService
            .loadListings()
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

  constructor(
    private actions$: Actions,
    private listingService: ListingsService
  ) {}
  ngrxOnInitEffects(): Action {
    return ListingsActions.loadListings();
  }
}
