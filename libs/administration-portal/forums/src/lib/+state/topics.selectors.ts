import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  topicsAdapter,
  TopicsPartialState,
  TOPICS_FEATURE_KEY,
} from './topics.reducer';

// Lookup the 'Topics' feature state managed by NgRx
export const getTopicsState = createFeatureSelector<TopicsPartialState, State>(
  TOPICS_FEATURE_KEY
);

const { selectAll, selectEntities } = topicsAdapter.getSelectors();

export const getTopicsLoaded = createSelector(
  getTopicsState,
  (state: State) => state.loaded
);

export const getTopicsError = createSelector(
  getTopicsState,
  (state: State) => state.error
);

export const getAllTopics = createSelector(getTopicsState, (state: State) =>
  selectAll(state)
);

export const getTopicsEntities = createSelector(
  getTopicsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getTopicsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getTopicsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
