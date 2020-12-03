import { createAction, props } from '@ngrx/store';
import { ListingsEntity } from './listings.models';

export const loadListings = createAction('[Listings] Load Listings');

export const loadListingsSuccess = createAction(
  '[Listings] Load Listings Success',
  props<{ listings: ListingsEntity[] }>()
);

export const loadListingsFailure = createAction(
  '[Listings] Load Listings Failure',
  props<{ error: any }>()
);
