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

  constructor(private actions$: Actions, private userService: UsersService) {}
}
