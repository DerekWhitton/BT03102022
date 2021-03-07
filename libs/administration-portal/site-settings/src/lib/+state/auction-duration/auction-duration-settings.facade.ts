import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromAuctionDurationSettings from './auction-duration-settings.reducer';
import * as AuctionDurationSettingsSelectors from './auction-duration-settings.selectors';

@Injectable()
export class AuctionDurationSettingsFacade {
  loaded$ = this.store.pipe(
    select(AuctionDurationSettingsSelectors.getAuctionDurationSettingsLoaded)
  );
  allAuctionDurationSettings$ = this.store.pipe(
    select(AuctionDurationSettingsSelectors.getAllAuctionDurationSettings)
  );
  selectedAuctionDurationSettings$ = this.store.pipe(
    select(AuctionDurationSettingsSelectors.getSelectedAuctionDurationSetting)
  );
  lastKnownError$ = this.store.pipe(select(AuctionDurationSettingsSelectors.getAuctionDurationSettingsError));

  constructor(
    private store: Store<
      fromAuctionDurationSettings.AuctionDurationSettingsPartialState
    >
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
