import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DASHBOARDADVERTISMENTS_FEATURE_KEY,
  State,
  DashboardAdvertismentsPartialState,
  dashboardAdvertismentsAdapter,
} from './dashboard-advertisments.reducer';

// Lookup the 'DashboardAdvertisments' feature state managed by NgRx
export const getDashboardAdvertismentsState = createFeatureSelector<
  DashboardAdvertismentsPartialState,
  State
>(DASHBOARDADVERTISMENTS_FEATURE_KEY);

const {
  selectAll,
  selectEntities,
} = dashboardAdvertismentsAdapter.getSelectors();

export const getDashboardAdvertismentsLoaded = createSelector(
  getDashboardAdvertismentsState,
  (state: State) => state.loaded
);

export const getDashboardAdvertismentsError = createSelector(
  getDashboardAdvertismentsState,
  (state: State) => state.error
);

export const getAllDashboardAdvertisments = createSelector(
  getDashboardAdvertismentsState,
  (state: State) => selectAll(state)
);

export const getDashboardAdvertismentsEntities = createSelector(
  getDashboardAdvertismentsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDashboardAdvertismentsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDashboardAdvertismentsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
