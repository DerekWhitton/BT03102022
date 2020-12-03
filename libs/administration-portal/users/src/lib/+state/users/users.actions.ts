import { createAction, props } from '@ngrx/store';
import {
  IRole,
  IUser,
  IUsers,
} from '@bushtrade/administration-portal/shared/entites';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ payload: IUsers }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const setSelectedUser = createAction(
  '[Users] Set Selected User',
  props<{ userId: string }>()
);

export const loadUserDetails = createAction(
  '[Users] Load User Details',
  props<{ userId: string }>()
);

export const loadUserDetailsSuccess = createAction(
  '[Users] Load User Details Success',
  props<{ user: IUser }>()
);

export const loadUserDetailsFailure = createAction(
  '[Users] Load User Details Failure',
  props<{ error: any }>()
);

export const addRoleUser = createAction(
  '[Roles] Add Role To User',
  props<{ role: IRole; userId: string }>()
);

export const addRoleUserSuccess = createAction(
  '[Roles] Add Role To User Success',
  props<{ user: IUser }>()
);

export const addRoleUserFailure = createAction(
  '[Roles] Add Role To User Failure',
  props<{ error: any }>()
);

export const removeRoleUser = createAction(
  '[Roles] Remove Role To User',
  props<{ roleId: string; userId: string }>()
);

export const removeRoleUserSuccess = createAction(
  '[Roles] Remove Role To User Success',
  props<{ user: IUser }>()
);

export const removeRoleUserFailure = createAction(
  '[Roles] Remove Role To User Failure',
  props<{ error: any }>()
);
