import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UiStyleService } from '@boma/administration-portal/shared/services';
import * as UiStyleActions from './ui-style.actions';

@Injectable()
export class UiStyleEffects {
  // setUiStyle$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UiStyleActions.setUiStyle),
  //     fetch({
  //       run: () => {
  //         return;
  //       },
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private uiStyleService: UiStyleService
  ) {}
}
