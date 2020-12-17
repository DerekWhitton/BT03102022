import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

// Lookup the 'uiStyle' feature state managed by NgRx
export const getUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.USER_FEATURE_KEY
);

export const getUser = createSelector(
  getUserState,
  (state: fromUser.UserState) => state
);

export const getUserLoaded = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.loaded
);
