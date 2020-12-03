import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromRoles from './roles.reducer';
import * as RolesActions from './roles.actions';
import { RolesService } from '@bushtrade/administration-portal/shared/services';
import { map, withLatestFrom } from 'rxjs/operators';
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

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.createRole),
      fetch({
        run: (action) => {
          return this.roleService
            .createRole(action.role)
            .pipe(
              map((response) =>
                RolesActions.createRoleSuccess({ role: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RolesActions.createRoleFailure({ error });
        },
      })
    )
  );

  loadRoleDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.loadRoleDetails),
      fetch({
        run: (action, state: any) => {
          return this.roleService
            .loadRoleDetails(action.roleId)
            .pipe(
              map((response) =>
                RolesActions.loadRoleDetailsSuccess({ role: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RolesActions.loadRoleDetailsFailure({ error });
        },
      })
    )
  );

  updateRoleDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.updateRole),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { roles } = state;
          return this.roleService
            .updateRole(action.role, roles.selectedId)
            .pipe(
              map((response) =>
                RolesActions.updateRoleSuccess({ role: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RolesActions.updateRoleFailure({ error });
        },
      })
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.deleteRole),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.roleService
            .deleteRole(action.roleId)
            .pipe(
              map(() =>
                RolesActions.deleteRoleSuccess({ roleId: action.roleId })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RolesActions.deleteRoleFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private roleService: RolesService
  ) {}
  ngrxOnInitEffects(): Action {
    return RolesActions.loadRoles();
  }
}
