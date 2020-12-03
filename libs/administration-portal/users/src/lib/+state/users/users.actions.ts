import { createAction, props } from '@ngrx/store';
import { IUser, IUsers } from '@bushtrade/administration-portal/shared/entites';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ payload: IUsers }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);
