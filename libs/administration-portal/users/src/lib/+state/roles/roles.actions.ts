import { createAction, props } from '@ngrx/store';
import {
  IPaginatedResponse,
  IRole,
} from '@bushtrade/administration-portal/shared/entites';

export const loadRoles = createAction('[Roles] Load Roles');

export const loadRolesSuccess = createAction(
  '[Roles] Load Roles Success',
  props<{ payload: IPaginatedResponse<IRole> }>()
);

export const loadRolesFailure = createAction(
  '[Roles] Load Roles Failure',
  props<{ error: any }>()
);

export const createRole = createAction(
  '[Roles] Create Role',
  props<{ role: IRole }>()
);

export const createRoleSuccess = createAction(
  '[Roles] Create Roles Success',
  props<{ role: IRole }>()
);

export const createRoleFailure = createAction(
  '[Roles] Create Roles Failure',
  props<{ error: any }>()
);

export const setSelectedRole = createAction(
  '[Roles] Set Selected Role',
  props<{ roleId: string }>()
);

export const loadRoleDetails = createAction(
  '[Roles] Load Role Details',
  props<{ roleId: string }>()
);

export const loadRoleDetailsSuccess = createAction(
  '[Roles] Load Role Details Success',
  props<{ role: IRole }>()
);

export const loadRoleDetailsFailure = createAction(
  '[Roles] Load Role Details Failure',
  props<{ error: any }>()
);

export const updateRole = createAction(
  '[Roles] Update Role',
  props<{ role: IRole }>()
);

export const updateRoleSuccess = createAction(
  '[Roles] Update Role Success',
  props<{ role: IRole }>()
);

export const updateRoleFailure = createAction(
  '[Roles] Update Role Failure',
  props<{ error: any }>()
);

export const deleteRole = createAction(
  '[Roles] Delete Role',
  props<{ roleId: string }>()
);

export const deleteRoleSuccess = createAction(
  '[Roles] Delete Role Success',
  props<{ roleId: string }>()
);

export const deleteRoleFailure = createAction(
  '[Roles] Delete Role Failure',
  props<{ error: any }>()
);
