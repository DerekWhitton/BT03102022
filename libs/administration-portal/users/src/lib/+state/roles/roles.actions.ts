import { createAction, props } from '@ngrx/store';
import { RolesEntity } from './roles.models';

export const loadRoles = createAction('[Roles] Load Roles');

export const loadRolesSuccess = createAction(
  '[Roles] Load Roles Success',
  props<{ roles: RolesEntity[] }>()
);

export const loadRolesFailure = createAction(
  '[Roles] Load Roles Failure',
  props<{ error: any }>()
);
