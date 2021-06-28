import { createAction, props } from '@ngrx/store';
import {
  IListing,
  IPaginatedResponse,
} from '@bushtrade/administration-portal/shared/entites';

export const loadListings = createAction(
  '[Listings] Load Listings',
  props<{ page?: number, perPage?: number, query?: string, onlyReported?: boolean, includeDeleted?: boolean }>()
);

export const loadListingsSuccess = createAction(
  '[Listings] Load Listings Success',
  props<{ payload: IPaginatedResponse<IListing> }>()
);

export const loadListingsFailure = createAction(
  '[Listings] Load Listings Failure',
  props<{ error: any }>()
);

export const markListingDeleted = createAction(
  '[Listings] Mark Listing Deleted',
  props<{ listingId: string, deleteReason: string }>()
);

export const markListingDeletedSuccess = createAction(
  '[Listings] Mark Listing Deleted Success',
  props<{ payload: IListing }>()
);

export const markListingDeletedFailure = createAction(
  '[Listings] Mark Listing Deleted Failure',
  props<{ error: any }>()
);
