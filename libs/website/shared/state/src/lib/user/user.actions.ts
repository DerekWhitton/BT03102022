import { IUser } from '@bushtrade/website/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ payload: IUser }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const setSelectedSupplier = createAction(
  '[User] Set Selected Supplier',
  props<{ id: string }>()
);
