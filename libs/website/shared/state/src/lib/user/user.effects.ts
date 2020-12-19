import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { fetch } from '@nrwl/angular';
import { UserService } from '@bushtrade/website/shared/services';
import * as UserActions from './user.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      fetch({
        run: (action) => {
          return this.userService
            .loadUser()
            .pipe(
              map((response) =>
                UserActions.loadUserSuccess({ payload: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UserActions.loadUserFailure({ error });
        },
      })
    )
  );

  registerSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerSeller),
      fetch({
        run: (action) => {
          return this.userService
            .startSelling(action.sellerProfile)
            .pipe(
              map((response) =>
                UserActions.registerSellerSuccess({ seller: response })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UserActions.registerSellerFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}

  // ngrxOnInitEffects(): Action {
  //   return UserActions.loadUser();
  // }
}
