import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUCTIONDURATIONSETTINGS_FEATURE_KEY,
  AuctionDurationSettingsState,
  AuctionDurationSettingsPartialState,
  auctionDurationSettingsAdapter,
} from './auction-duration-settings.reducer';

// Lookup the 'AuctionDurationSettings' feature state managed by NgRx
export const getAuctionDurationSettingsState = createFeatureSelector<
  AuctionDurationSettingsPartialState,
  AuctionDurationSettingsState
>(AUCTIONDURATIONSETTINGS_FEATURE_KEY);

const {
  selectAll,
  selectEntities,
} = auctionDurationSettingsAdapter.getSelectors();

export const getAuctionDurationSettingsLoaded = createSelector(
  getAuctionDurationSettingsState,
  (state: AuctionDurationSettingsState) => state.loaded
);

export const getAuctionDurationSettingsError = createSelector(
  getAuctionDurationSettingsState,
  (state: AuctionDurationSettingsState) => state.error
);

export const getAllAuctionDurationSettings = createSelector(
  getAuctionDurationSettingsState,
  (state: AuctionDurationSettingsState) => selectAll(state)
);

export const getAuctionDurationSettingsEntities = createSelector(
  getAuctionDurationSettingsState,
  (state: AuctionDurationSettingsState) => selectEntities(state)
);

export const getSelectedAuctionDurationSettingId = createSelector(
  getAuctionDurationSettingsState,
  (state: AuctionDurationSettingsState) => state.selectedId
);

export const getSelectedAuctionDurationSetting = createSelector(
  getAuctionDurationSettingsEntities,
  getSelectedAuctionDurationSettingId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
