import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromPremiumPackagesSettings from './premium-packages-settings.reducer';
import * as PremiumPackagesSettingsSelectors from './premium-packages-settings.selectors';

@Injectable()
export class PremiumPackagesSettingsFacade {
  loaded$ = this.store.pipe(
    select(PremiumPackagesSettingsSelectors.getPremiumPackagesSettingsLoaded)
  );
  allPremiumPackagesSettings$ = this.store.pipe(
    select(PremiumPackagesSettingsSelectors.getAllPremiumPackagesSettings)
  );
  selectedPremiumPackagesSettings$ = this.store.pipe(
    select(PremiumPackagesSettingsSelectors.getSelectedPremiumPackagesSetting)
  );
  lastKnownError$ = this.store.pipe(select(PremiumPackagesSettingsSelectors.getPremiumPackagesSettingsError));

  constructor(
    private store: Store<
      fromPremiumPackagesSettings.PremiumPackagesSettingsPartialState
    >
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
