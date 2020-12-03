import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromRoles from './roles.reducer';
import * as RolesActions from './roles.actions';

@Injectable()
export class RolesEffects {
  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.loadRoles),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return RolesActions.loadRolesSuccess({ roles: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RolesActions.loadRolesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
