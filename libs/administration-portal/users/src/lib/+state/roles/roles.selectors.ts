import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ROLES_FEATURE_KEY,
  State,
  RolesPartialState,
  rolesAdapter,
} from './roles.reducer';

// Lookup the 'Roles' feature state managed by NgRx
export const getRolesState = createFeatureSelector<RolesPartialState, State>(
  ROLES_FEATURE_KEY
);

const { selectAll, selectEntities } = rolesAdapter.getSelectors();

export const getRolesLoaded = createSelector(
  getRolesState,
  (state: State) => state.loaded
);

export const getRolesError = createSelector(
  getRolesState,
  (state: State) => state.error
);

export const getAllRoles = createSelector(getRolesState, (state: State) =>
  selectAll(state)
);

export const getRolesEntities = createSelector(getRolesState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getRolesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getRolesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
