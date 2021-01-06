import { createAction, props } from '@ngrx/store';
import {
  IPaginatedResponse,
  IListing,
  ICategory,
  ICreateListing,
} from '@bushtrade/website/shared/entites';

export const loadListings = createAction(
  '[Listings] Load Listings',
  props<{ sellerId: string }>()
);

export const loadListingsSuccess = createAction(
  '[Listings] Load Listings Success',
  props<{ payload: IPaginatedResponse<IListing> }>()
);

export const loadListingsFailure = createAction(
  '[Listings] Load Listings Failure',
  props<{ error: any }>()
);

export const addListing = createAction(
  '[Listings] Add Listing',
  props<{ sellerId: string; listing: ICreateListing }>()
);

export const addListingSuccess = createAction(
  '[Listings] Add Listings Success',
  props<{ listing: IListing }>()
);

export const addListingFailure = createAction(
  '[Listings] Add Listings Failure',
  props<{ error: any }>()
);

export const addListingImage = createAction(
  '[Listings] Add Listing Image',
  props<{ sellerId: string; file: File }>()
);

export const addListingImageSuccess = createAction(
  '[Listings] Add Listings Image Success',
  props<{ imageId: string; file: File }>()
);

export const addListingImageFailure = createAction(
  '[Listings] Add Listings Image Failure',
  props<{ error: any }>()
);

export const loadListing = createAction(
  '[Listings] Load Listing',
  props<{ sellerId: string; listingId: string }>()
);

export const loadListingSuccess = createAction(
  '[Listings] Load Listing Success',
  props<{ listing: IListing }>()
);

export const loadListingFailure = createAction(
  '[Listings] Load Listing Failure',
  props<{ error: any }>()
);

export const updateListing = createAction(
  '[Listings] Update Listing',
  props<{ sellerId: string; listing: IListing }>()
);

export const updateListingSuccess = createAction(
  '[Listings] Update Listing Success',
  props<{ listing: IListing }>()
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
