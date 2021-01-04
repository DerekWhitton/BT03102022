import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FORUMS_FEATURE_KEY,
  State,
  ForumsPartialState,
  forumsAdapter,
} from './forums.reducer';

// Lookup the 'Forums' feature state managed by NgRx
export const getForumsState = createFeatureSelector<ForumsPartialState, State>(
  FORUMS_FEATURE_KEY
);

const { selectAll, selectEntities } = forumsAdapter.getSelectors();

export const getForumsLoaded = createSelector(
  getForumsState,
  (state: State) => state.loaded
);

export const getForumsError = createSelector(
  getForumsState,
  (state: State) => state.error
);

export const getAllForums = createSelector(getForumsState, (state: State) =>
  selectAll(state)
);

export const getForumsEntities = createSelector(
  getForumsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getForumsState,
  (state: State) => state.selectedId
);

export const getSelectedThreadId = createSelector(
  getForumsState,
  (state: State) => state.selectedThreadId
);

export const getSelected = createSelector(
  getForumsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSelectedThread = createSelector(
  getForumsEntities,
  getSelectedId,
  getSelectedThreadId,
  (entities, selectedId, selectedThreadId) =>
    selectedId &&
    selectedThreadId &&
    entities[selectedId] &&
    entities[selectedId].threads?.filter((t) => t.id == selectedThreadId).length
      ? entities[selectedId].threads.filter((t) => t.id == selectedThreadId)[0]
      : null
);
