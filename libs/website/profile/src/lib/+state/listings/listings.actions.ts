import { createAction, props } from '@ngrx/store';
import {
  IPaginatedResponse,
  IListing,
  ICategory,
  ICreateOrUpdateListing,
  ISellerListing,
} from '@bushtrade/website/shared/entites';

export const loadListings = createAction(
  '[Listings] Load Listings',
  props<{ sellerId: string }>()
);

export const loadListingsSuccess = createAction(
  '[Listings] Load Listings Success',
  props<{ payload: IPaginatedResponse<ISellerListing> }>()
);

export const loadListingsFailure = createAction(
  '[Listings] Load Listings Failure',
  props<{ error: any }>()
);

export const addListing = createAction(
  '[Listings] Add Listing',
  props<{ sellerId: string; listing: ICreateOrUpdateListing }>()
);

export const addListingSuccess = createAction(
  '[Listings] Add Listings Success',
  props<{ listing: ISellerListing }>()
);

export const addListingFailure = createAction(
  '[Listings] Add Listings Failure',
  props<{ error: any }>()
);

export const loadListing = createAction(
  '[Listings] Load Listing',
  props<{ sellerId: string; listingId: string }>()
);

export const loadListingSuccess = createAction(
  '[Listings] Load Listing Success',
  props<{ listing: ISellerListing }>()
);

export const loadListingFailure = createAction(
  '[Listings] Load Listing Failure',
  props<{ error: any }>()
);

export const updateListing = createAction(
  '[Listings] Update Listing',
  props<{
    sellerId: string;
    listingId: string;
    listing: ICreateOrUpdateListing;
  }>()
);

export const updateListingSuccess = createAction(
  '[Listings] Update Listing Success',
  props<{ listing: ISellerListing }>()
);

export const updateListingFailure = createAction(
  '[Listings] Update Listing Failure',
  props<{ error: any }>()
);

export const deleteListing = createAction(
  '[Listings] Delete Listing',
  props<{ sellerId: string; listingId: string }>()
);

export const deleteListingSuccess = createAction(
  '[Listings] Delete Listing Success',
  props<{ listingId: string }>()
);

export const deleteListingFailure = createAction(
  '[Listings] Delete Listing Failure',
  props<{ error: any }>()
);
