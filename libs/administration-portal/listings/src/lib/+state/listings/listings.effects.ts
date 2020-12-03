import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromListings from './listings.reducer';
import * as ListingsActions from './listings.actions';

@Injectable()
export class ListingsEffects {
  loadListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingsActions.loadListings),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ListingsActions.loadListingsSuccess({ listings: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListingsActions.loadListingsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
