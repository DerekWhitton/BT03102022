import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { IUser } from '@bushtrade/website/shared/entites';

export const USER_FEATURE_KEY = 'user';

export interface UserState extends IUser {
  error?: string | null;
  loaded: boolean;
}

export const userIntialState: UserState = {
  id: '',
  firstName: '',
  surname: '',
  roles: [],
  sellers: [],
  createdAt: '',
  updatedAt: '',
  error: '',
  loaded: false,
};

const usersReducer = createReducer(
  userIntialState,
  on(UserActions.loadUserSuccess, (state, { payload }) => ({
    ...payload,
    loaded: true,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.setSelectedSupplier, (state, { id }) => ({
    ...state,
    selectedSupplierId: id,
    loaded: true,
  })),
  on(UserActions.registerSellerSuccess, (state, { seller }) => ({
    ...state,
    sellers: [...state.sellers, seller],
    loaded: true,
  })),
  on(UserActions.registerSellerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return usersReducer(state, action);
}
