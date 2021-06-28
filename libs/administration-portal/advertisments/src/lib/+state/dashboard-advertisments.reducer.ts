import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DashboardAdvertismentsActions from './dashboard-advertisments.actions';
import { IDashboardAdvertisment } from '@bushtrade/administration-portal/shared/entites';

export const DASHBOARDADVERTISMENTS_FEATURE_KEY = 'dashboardAdvertisments';

export interface State extends EntityState<IDashboardAdvertisment> {
  selectedId?: string | number; // which DashboardAdvertisments record has been selected
  loaded: boolean; // has the DashboardAdvertisments list been loaded
  error?: string | null; // last known error (if any)
}

export interface DashboardAdvertismentsPartialState {
  readonly [DASHBOARDADVERTISMENTS_FEATURE_KEY]: State;
}

export const dashboardAdvertismentsAdapter: EntityAdapter<IDashboardAdvertisment> = createEntityAdapter<
  IDashboardAdvertisment
>();

export const initialState: State = dashboardAdvertismentsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const dashboardAdvertismentsReducer = createReducer(
  initialState,
  on(DashboardAdvertismentsActions.loadDashboardAdvertisments, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    DashboardAdvertismentsActions.loadDashboardAdvertismentsSuccess,
    (state, { payload }) =>
      dashboardAdvertismentsAdapter.setAll(payload.items, {
        ...state,
        loaded: true,
      })
  ),
  on(
    DashboardAdvertismentsActions.loadDashboardAdvertismentsFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(DashboardAdvertismentsActions.setSelectedDashboardAdvertisment, (state, action) => {
    return {
      ...state,
      selectedId: action.dashboardAdvertismentId,
    };
  }),
  on(DashboardAdvertismentsActions.loadDashboardAdvertismentDetailsSuccess, (state, { dashboardAdvertisment }) =>
    dashboardAdvertismentsAdapter.upsertOne(dashboardAdvertisment, {
      ...state,
      loaded: true,
      error: '',
      selectedId: dashboardAdvertisment.id,
    })
  ),
  on(DashboardAdvertismentsActions.loadDashboardAdvertismentDetailsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(DashboardAdvertismentsActions.createDashboardAdvertismentSuccess, (state, { dashboardAdvertisment }) =>
    dashboardAdvertismentsAdapter.upsertOne(dashboardAdvertisment, {
      ...state,
      loaded: true,
      error: ''
    })
  ),
  on(DashboardAdvertismentsActions.createDashboardAdvertismentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(DashboardAdvertismentsActions.updateDashboardAdvertismentSuccess, (state, { dashboardAdvertisment }) =>
    dashboardAdvertismentsAdapter.upsertOne(dashboardAdvertisment, {
      ...state,
      loaded: true,
      error: '',
      selectedId: dashboardAdvertisment.id,
    })
  ),
  on(DashboardAdvertismentsActions.updateDashboardAdvertismentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(DashboardAdvertismentsActions.deleteDashboardAdvertismentSuccess, (state, { dashboardAdvertismentId }) =>
    dashboardAdvertismentsAdapter.removeOne(dashboardAdvertismentId, state)
  ),
  on(DashboardAdvertismentsActions.deleteDashboardAdvertismentFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardAdvertismentsReducer(state, action);
}
