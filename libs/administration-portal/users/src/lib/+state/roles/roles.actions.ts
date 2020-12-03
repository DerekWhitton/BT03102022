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
