
import { ICreateOrUpdatePremiumPackageSetting, IPremiumPackageSetting } from '@bushtrade/administration-portal/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadPremiumPackagesSettings = createAction(
  '[PremiumPackagesSettings] Load PremiumPackagesSettings'
);

export const loadPremiumPackagesSettingsSuccess = createAction(
  '[PremiumPackageSettings] Load PremiumPackageSettings Success',
  props<{ premiumPackagesSettings: IPremiumPackageSetting[] }>()
);

export const loadPremiumPackagesSettingsFailure = createAction(
  '[PremiumPackageSettings] Load PremiumPackageSettings Failure',
  props<{ error: any }>()
);

export const setSelectedPremiumPackageSetting = createAction(
  '[PremiumPackageSetting] Set Selected Premium Package Setting',
  props<{ settingId: string }>()
);

export const createPremiumPackageSetting = createAction(
  '[PremiumPackageSetting] Create Premium Package Setting',
  props<{ premiumPackageSetting: ICreateOrUpdatePremiumPackageSetting }>()
);

export const createPremiumPackageSettingSuccess = createAction(
  '[PremiumPackageSetting] Create Premium Package Setting Success',
  props<{ premiumPackageSetting: IPremiumPackageSetting }>()
);

export const createPremiumPackageSettingFailure = createAction(
  '[PremiumPackageSetting] Create Premium Package Setting Failure',
  props<{ error: any }>()
);

export const updatePremiumPackageSetting = createAction(
  '[PremiumPackageSetting] Update Premium Package Setting',
  props<{ premiumPackageSetting: ICreateOrUpdatePremiumPackageSetting }>()
);

export const updatePremiumPackageSettingSuccess = createAction(
  '[PremiumPackageSetting] Update Premium Package Setting Success',
  props<{ premiumPackageSetting: IPremiumPackageSetting }>()
);

export const updatePremiumPackageSettingFailure = createAction(
  '[PremiumPackageSetting] Update Premium Package Setting Failure',
  props<{ error: any }>()
);

export const deletePremiumPackageSetting = createAction(
  '[PremiumPackageSetting] Delete Premium Package Setting',
  props<{ settingId: string }>()
);

export const deletePremiumPackageSettingSuccess = createAction(
  '[PremiumPackageSetting] Delete Premium Package Setting Success',
  props<{ settingId: string }>()
);

export const deletePremiumPackageSettingFailure = createAction(
  '[PremiumPackageSetting] Delete Premium Package Setting Failure',
  props<{ error: any }>()
);
