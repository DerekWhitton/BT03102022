import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as RolesActions from './roles.actions';
import { RolesEntity } from './roles.models';

export const ROLES_FEATURE_KEY = 'roles';

export interface State extends EntityState<RolesEntity> {
  selectedId?: string | number; // which Roles record has been selected
  loaded: boolean; // has the Roles list been loaded
  error?: string | null; // last known error (if any)
}

export interface RolesPartialState {
  readonly [ROLES_FEATURE_KEY]: State;
}

export const rolesAdapter: EntityAdapter<RolesEntity> = createEntityAdapter<
  RolesEntity
>();

export const initialState: State = rolesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const rolesReducer = createReducer(
  initialState,
  on(RolesActions.loadRoles, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RolesActions.loadRolesSuccess, (state, { roles }) =>
    rolesAdapter.setAll(roles, { ...state, loaded: true })
  ),
  on(RolesActions.loadRolesFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return rolesReducer(state, action);
}
