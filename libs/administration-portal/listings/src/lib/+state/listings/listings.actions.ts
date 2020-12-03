import { createAction, props } from '@ngrx/store';
import {
  IListing,
  IPaginatedResponse,
} from '@bushtrade/administration-portal/shared/entites';

export const loadListings = createAction('[Listings] Load Listings');

export const loadListingsSuccess = createAction(
  '[Listings] Load Listings Success',
  props<{ payload: IPaginatedResponse<IListing> }>()
);

export const loadListingsFailure = createAction(
  '[Listings] Load Listings Failure',
  props<{ error: any }>()
);
