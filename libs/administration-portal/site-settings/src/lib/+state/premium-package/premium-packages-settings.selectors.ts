import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PREMIUMPACKAGESSETTINGS_FEATURE_KEY,
  PremiumPackageSettingsState,
  PremiumPackagesSettingsPartialState,
  premiumPackagesSettingsAdapter,
} from './premium-packages-settings.reducer';

// Lookup the 'PremiumPackagesSettings' feature state managed by NgRx
export const getPremiumPackagesSettingsState = createFeatureSelector<
  PremiumPackagesSettingsPartialState,
  PremiumPackageSettingsState
>(PREMIUMPACKAGESSETTINGS_FEATURE_KEY);

const {
  selectAll,
  selectEntities,
} = premiumPackagesSettingsAdapter.getSelectors();

export const getPremiumPackagesSettingsLoaded = createSelector(
  getPremiumPackagesSettingsState,
  (state: PremiumPackageSettingsState) => state.loaded
);

export const getPremiumPackagesSettingsError = createSelector(
  getPremiumPackagesSettingsState,
  (state: PremiumPackageSettingsState) => state.error
);

export const getAllPremiumPackagesSettings = createSelector(
  getPremiumPackagesSettingsState,
  (state: PremiumPackageSettingsState) => selectAll(state)
);

export const getPremiumPackagesSettingsEntities = createSelector(
  getPremiumPackagesSettingsState,
  (state: PremiumPackageSettingsState) => selectEntities(state)
);

export const getSelectedPremiumPackagesSettingId = createSelector(
  getPremiumPackagesSettingsState,
  (state: PremiumPackageSettingsState) => state.selectedId
);

export const getSelectedPremiumPackagesSetting = createSelector(
  getPremiumPackagesSettingsEntities,
  getSelectedPremiumPackagesSettingId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
