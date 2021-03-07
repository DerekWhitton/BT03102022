import { Store } from '@ngrx/store';
import { AuctionDurationSettingsService } from './../../../../../shared/services/src/lib/site-settings/auction-duration-settings.service';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as AuctionDurationSettingsActions from './auction-duration-settings.actions';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AuctionDurationSettingsEffects {
  loadAuctionDurationSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionDurationSettingsActions.loadAuctionDurationSettings),
      fetch({
        run: (action) => {
          return this.auctionDurationSettingsService
            .loadAuctionDurationSettings()
            .pipe(
              map((response) =>
                AuctionDurationSettingsActions.loadAuctionDurationSettingsSuccess(
                  { auctionDurationSettings: response }
                )
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AuctionDurationSettingsActions.loadAuctionDurationSettingsFailure(
            { error }
          );
        },
      })
    )
  );

  createAuctionDurationSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionDurationSettingsActions.createAuctionDurationSetting),
      fetch({
        run: (action) => {
          return this.auctionDurationSettingsService
            .createAuctionDurationSetting(action.auctionDurationSetting)
            .pipe(
              map((response) =>
                AuctionDurationSettingsActions.createAuctionDurationSettingSuccess(
                  { auctionDurationSetting: response }
                )
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return AuctionDurationSettingsActions.createAuctionDurationSettingFailure(
            { error }
          );
        },
      })
    )
  );

  updateAuctionDurationSettingDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionDurationSettingsActions.updateAuctionDurationSetting),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          const { auctionDurationSettings } = state;
          return this.auctionDurationSettingsService
            .updateAuctionDurationSetting({
              ...action.auctionDurationSetting,
              id: auctionDurationSettings.selectedId,
            })
            .pipe(
              map((response) =>
                AuctionDurationSettingsActions.updateAuctionDurationSettingSuccess(
                  { auctionDurationSetting: response }
                )
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AuctionDurationSettingsActions.updateAuctionDurationSettingFailure(
            { error }
          );
        },
      })
    )
  );

  deleteAuctionDurationSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuctionDurationSettingsActions.deleteAuctionDurationSetting),
      withLatestFrom(this.store),
      fetch({
        run: (action, state: any) => {
          return this.auctionDurationSettingsService
            .deleteAuctionDurationSetting(action.settingId)
            .pipe(
              map(() =>
                AuctionDurationSettingsActions.deleteAuctionDurationSettingSuccess(
                  { settingId: action.settingId }
                )
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AuctionDurationSettingsActions.deleteAuctionDurationSettingFailure(
            { error }
          );
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private auctionDurationSettingsService: AuctionDurationSettingsService
  ) {}
}
