import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PremiumPackagesSettingsActions from './premium-packages-settings.actions';
import { IPremiumPackageSetting } from '@bushtrade/administration-portal/shared/entites';

export const PREMIUMPACKAGESSETTINGS_FEATURE_KEY = 'premiumPackagesSettings';

export interface PremiumPackageSettingsState extends EntityState<IPremiumPackageSetting> {
  selectedId?: string | number; // which PremiumPackagesSettings record has been selected
  loaded: boolean; // has the PremiumPackagesSettings list been loaded
  error?: any | null; // last known error (if any)
}

export interface PremiumPackagesSettingsPartialState {
  readonly [PREMIUMPACKAGESSETTINGS_FEATURE_KEY]: PremiumPackageSettingsState;
}

export const premiumPackagesSettingsAdapter: EntityAdapter<IPremiumPackageSetting> = createEntityAdapter<
  IPremiumPackageSetting
>();

export const premiumPackagesSettingsInitialState: PremiumPackageSettingsState = premiumPackagesSettingsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const premiumPackagesSettingsReducer = createReducer(
  premiumPackagesSettingsInitialState,
  on(PremiumPackagesSettingsActions.loadPremiumPackagesSettings, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    PremiumPackagesSettingsActions.loadPremiumPackagesSettingsSuccess,
    (state, { premiumPackagesSettings }) =>
      premiumPackagesSettingsAdapter.setAll(premiumPackagesSettings, {
        ...state,
        loaded: true,
      })
  ),
  on(
    PremiumPackagesSettingsActions.loadPremiumPackagesSettingsFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(PremiumPackagesSettingsActions.setSelectedPremiumPackageSetting, (state, action) => {
    return {
      ...state,
      selectedId: action.settingId,
    };
  }),
  on(PremiumPackagesSettingsActions.createPremiumPackageSettingSuccess, (state, { premiumPackageSetting }) =>
    premiumPackagesSettingsAdapter.upsertOne(premiumPackageSetting, {
      ...state,
      loaded: true,
      error: ''
    })
  ),
  on(PremiumPackagesSettingsActions.createPremiumPackageSettingFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PremiumPackagesSettingsActions.updatePremiumPackageSettingSuccess, (state, { premiumPackageSetting }) =>
    premiumPackagesSettingsAdapter.upsertOne(premiumPackageSetting, {
      ...state,
      loaded: true,
      error: '',
      selectedId: premiumPackageSetting.id,
    })
  ),
  on(PremiumPackagesSettingsActions.updatePremiumPackageSettingFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PremiumPackagesSettingsActions.deletePremiumPackageSettingSuccess, (state, { settingId }) =>
    premiumPackagesSettingsAdapter.removeOne(settingId, state)
  ),
  on(PremiumPackagesSettingsActions.deletePremiumPackageSettingFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function premiumPackagesReducer(state: PremiumPackageSettingsState | undefined, action: Action) {
  return premiumPackagesSettingsReducer(state, action);
}
