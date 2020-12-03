import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromRoles from './roles.reducer';
import * as RolesActions from './roles.actions';
import { RolesService } from '@bushtrade/administration-portal/shared/services';
import { map } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class RolesEffects implements OnInitEffects {
  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.loadRoles),
      fetch({
        run: (action) => {
          return this.roleService
            .listRoles()
            .pipe(
              map((response) =>
                RolesActions.loadRolesSuccess({ payload: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RolesActions.loadRolesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions, private roleService: RolesService) {}
  ngrxOnInitEffects(): Action {
    return RolesActions.loadRoles();
  }
}
