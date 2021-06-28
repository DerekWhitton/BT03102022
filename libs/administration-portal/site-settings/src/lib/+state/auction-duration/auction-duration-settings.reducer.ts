import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuctionDurationSettingsActions from './auction-duration-settings.actions';
import { IAuctionDurationSetting } from '@bushtrade/administration-portal/shared/entites';

export const AUCTIONDURATIONSETTINGS_FEATURE_KEY = 'auctionDurationSettings';

export interface AuctionDurationSettingsState extends EntityState<IAuctionDurationSetting> {
  selectedId?: string | number; // which AuctionDurationSettings record has been selected
  loaded: boolean; // has the AuctionDurationSettings list been loaded
  error?: any | null; // last known error (if any)
}

export interface AuctionDurationSettingsPartialState {
  readonly [AUCTIONDURATIONSETTINGS_FEATURE_KEY]: AuctionDurationSettingsState;
}

export const auctionDurationSettingsAdapter: EntityAdapter<IAuctionDurationSetting> = createEntityAdapter<
  IAuctionDurationSetting
>();

export const auctionDurationSettingsInitialState: AuctionDurationSettingsState = auctionDurationSettingsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const auctionDurationSettingsReducer = createReducer(
  auctionDurationSettingsInitialState,
  on(AuctionDurationSettingsActions.loadAuctionDurationSettings, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    AuctionDurationSettingsActions.loadAuctionDurationSettingsSuccess,
    (state, { auctionDurationSettings }) =>
      auctionDurationSettingsAdapter.setAll(auctionDurationSettings, {
        ...state,
        loaded: true,
      })
  ),
  on(
    AuctionDurationSettingsActions.loadAuctionDurationSettingsFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(AuctionDurationSettingsActions.setSelectedAuctionDurationSetting, (state, action) => {
    return {
      ...state,
      selectedId: action.settingId,
    };
  }),
  on(AuctionDurationSettingsActions.createAuctionDurationSettingSuccess, (state, { auctionDurationSetting }) =>
    auctionDurationSettingsAdapter.upsertOne(auctionDurationSetting, {
      ...state,
      loaded: true,
      error: ''
    })
  ),
  on(AuctionDurationSettingsActions.createAuctionDurationSettingFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuctionDurationSettingsActions.updateAuctionDurationSettingSuccess, (state, { auctionDurationSetting }) =>
    auctionDurationSettingsAdapter.upsertOne(auctionDurationSetting, {
      ...state,
      loaded: true,
      error: '',
      selectedId: auctionDurationSetting.id,
    })
  ),
  on(AuctionDurationSettingsActions.updateAuctionDurationSettingFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuctionDurationSettingsActions.deleteAuctionDurationSettingSuccess, (state, { settingId }) =>
    auctionDurationSettingsAdapter.removeOne(settingId, state)
  ),
  on(AuctionDurationSettingsActions.deleteAuctionDurationSettingFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function auctionDurationReducer(state: AuctionDurationSettingsState | undefined, action: Action) {
  return auctionDurationSettingsReducer(state, action);
}
