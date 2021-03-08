import { IAuctionDurationSetting, ICreateOrUpdateAuctionDurationSetting } from '@bushtrade/administration-portal/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadAuctionDurationSettings = createAction(
  '[AuctionDurationSettings] Load AuctionDurationSettings'
);

export const loadAuctionDurationSettingsSuccess = createAction(
  '[AuctionDurationSettings] Load AuctionDurationSettings Success',
  props<{ auctionDurationSettings: IAuctionDurationSetting[] }>()
);

export const loadAuctionDurationSettingsFailure = createAction(
  '[AuctionDurationSettings] Load AuctionDurationSettings Failure',
  props<{ error: any }>()
);

export const setSelectedAuctionDurationSetting = createAction(
  '[AuctionDurationSEtting] Set Selected Auction Duration Setting',
  props<{ settingId: string }>()
);

export const createAuctionDurationSetting = createAction(
  '[AuctionDurationSetting] Create Auction Duration Setting',
  props<{ auctionDurationSetting: ICreateOrUpdateAuctionDurationSetting }>()
);

export const createAuctionDurationSettingSuccess = createAction(
  '[AuctionDurationSetting] Create Auction Duration Setting Success',
  props<{ auctionDurationSetting: IAuctionDurationSetting }>()
);

export const createAuctionDurationSettingFailure = createAction(
  '[AuctionDurationSetting] Create Auction Duration Setting Failure',
  props<{ error: any }>()
);

export const updateAuctionDurationSetting = createAction(
  '[AuctionDurationSetting] Update Auction Duration Setting',
  props<{ auctionDurationSetting: ICreateOrUpdateAuctionDurationSetting }>()
);

export const updateAuctionDurationSettingSuccess = createAction(
  '[AuctionDurationSetting] Update Auction Duration Setting Success',
  props<{ auctionDurationSetting: IAuctionDurationSetting }>()
);

export const updateAuctionDurationSettingFailure = createAction(
  '[AuctionDurationSetting] Update Auction Duration Setting Failure',
  props<{ error: any }>()
);

export const deleteAuctionDurationSetting = createAction(
  '[AuctionDurationSetting] Delete Auction Duration Setting',
  props<{ settingId: string }>()
);

export const deleteAuctionDurationSettingSuccess = createAction(
  '[AuctionDurationSetting] Delete Auction Duration Setting Success',
  props<{ settingId: string }>()
);

export const deleteAuctionDurationSettingFailure = createAction(
  '[AuctionDurationSetting] Delete Auction Duration Setting Failure',
  props<{ error: any }>()
);
