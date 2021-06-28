import { PremiumPackagesSettingsService } from './../../../../../shared/services/src/lib/site-settings/premium-packages-settings.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPremiumPackagesSettings from './premium-packages-settings.reducer';
import * as PremiumPackagesSettingsActions from './premium-packages-settings.actions';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class PremiumPackagesSettingsEffects {
  loadPremiumPackagesSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PremiumPackagesSettingsActions.loadPremiumPackagesSettings),
      fetch({
        run: (action) => {
          return this.premiumPackagesSettingsService
            .loadPremiumPackageSettings()
            .pipe(
              map((response) => {
                return PremiumPackagesSettingsActions.loadPremiumPackagesSettingsSuccess(
                  { premiumPackagesSettings: response }
                );
              })
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return PremiumPackagesSettingsActions.loadPremiumPackagesSettingsFailure(
            { error }
          );
        },
      })
    )
  );

  createPremiumPackageSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PremiumPackagesSettingsActions.createPremiumPackageSetting),
      fetch({
        run: (action) => {
          return this.premiumPackagesSettingsService
            .createPremiumPackageSetting(action.premiumPackageSetting)
            .pipe(
              map((response) =>
                PremiumPackagesSettingsActions.createPremiumPackageSettingSuccess(
                  { premiumPackageSetting: response }
                )
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return PremiumPackagesSettingsActions.createPremiumPackageSettingFailure(
            { error }
          );
        },
      })
    )
  );

  updatePremiumPackageSettingDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PremiumPackagesSettingsActions.updatePremiumPackageSetting),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { premiumPackagesSettings } = state;
          return this.premiumPackagesSettingsService
            .updatePremiumPackageSetting({
              ...action.premiumPackageSetting,
              id: premiumPackagesSettings.selectedId,
            })
            .pipe(
              map((response) =>
                PremiumPackagesSettingsActions.updatePremiumPackageSettingSuccess(
                  { premiumPackageSetting: response }
                )
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return PremiumPackagesSettingsActions.updatePremiumPackageSettingFailure(
            { error }
          );
        },
      })
    )
  );

  deletePremiumPackageSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PremiumPackagesSettingsActions.deletePremiumPackageSetting),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.premiumPackagesSettingsService
            .deletePremiumPackageSetting(action.settingId)
            .pipe(
              map(() =>
                PremiumPackagesSettingsActions.deletePremiumPackageSettingSuccess(
                  { settingId: action.settingId }
                )
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return PremiumPackagesSettingsActions.deletePremiumPackageSettingFailure(
            { error }
          );
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private premiumPackagesSettingsService: PremiumPackagesSettingsService
  ) {}
}
