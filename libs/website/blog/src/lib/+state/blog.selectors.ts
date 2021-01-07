import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BLOG_FEATURE_KEY,
  State,
  BlogPartialState,
  blogAdapter,
} from './blog.reducer';

// Lookup the 'Blog' feature state managed by NgRx
export const getBlogState = createFeatureSelector<BlogPartialState, State>(
  BLOG_FEATURE_KEY
);

const { selectAll, selectEntities } = blogAdapter.getSelectors();

export const getBlogLoaded = createSelector(
  getBlogState,
  (state: State) => state.loaded
);

export const getBlogError = createSelector(
  getBlogState,
  (state: State) => state.error
);

export const getAllBlogs = createSelector(getBlogState, (state: State) =>
  selectAll(state)
);

export const getBlogEntities = createSelector(getBlogState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getBlogState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getBlogEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
