import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { UsersService } from '@bushtrade/administration-portal/shared/services';
import * as fromUsers from './users.reducer';
import * as UsersActions from './users.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      fetch({
        run: (action) => {
          return this.userService
            .listUsers()
            .pipe(
              map((response) =>
                UsersActions.loadUsersSuccess({ payload: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return UsersActions.loadUsersFailure({ error });
        },
      })
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUserDetails),
      fetch({
        run: (action, state: any) => {
          return this.userService
            .loadUserDetails(action.userId)
            .pipe(
              map((response) =>
                UsersActions.loadUserDetailsSuccess({ user: response })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return UsersActions.loadUserDetailsFailure({ error });
        },
      })
    )
  );

  addRoleToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addRoleUser),
      fetch({
        run: (action, state: any) => {
          return this.userService
            .addRoleUser(action.role, action.userId)
            .pipe(
              map((response) =>
                UsersActions.addRoleUserSuccess({ user: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UsersActions.addRoleUserFailure({ error });
        },
      })
    )
  );

  removeRoleFromUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.removeRoleUser),
      fetch({
        run: (action, state: any) => {
          return this.userService
            .removeRoleUser(action.roleId, action.userId)
            .pipe(
              map((response) =>
                UsersActions.removeRoleUserSuccess({ user: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UsersActions.removeRoleUserFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions, private userService: UsersService) {}
}
