import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UsersActions from './users.actions';
import { IUser } from '@bushtrade/administration-portal/shared/entites';

export const USERS_FEATURE_KEY = 'users';

export interface State extends EntityState<IUser> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: State;
}

export const usersAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialState: State = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { payload }) =>
    usersAdapter.setAll(payload.users, { ...state, loaded: true })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.setSelectedUser, (state, action) => {
    return {
      ...state,
      selectedId: action.userId,
    };
  }),
  on(UsersActions.loadUserDetailsSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, {
      ...state,
      loaded: true,
      error: '',
      selectedId: user.id,
    })
  ),
  on(UsersActions.loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.addRoleUserSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, {
      ...state,
      loaded: true,
      error: '',
      selectedId: user.id,
    })
  ),
  on(UsersActions.addRoleUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.removeRoleUserSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, {
      ...state,
      loaded: true,
      error: '',
      selectedId: user.id,
    })
  ),
  on(UsersActions.removeRoleUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
