import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CATEGORIES_FEATURE_KEY,
  State,
  CategoriesPartialState,
  categoriesAdapter,
} from './categories.reducer';

// Lookup the 'Categories' feature state managed by NgRx
export const getCategoriesState = createFeatureSelector<
  CategoriesPartialState,
  State
>(CATEGORIES_FEATURE_KEY);

const { selectAll, selectEntities } = categoriesAdapter.getSelectors();

export const getCategoriesLoaded = createSelector(
  getCategoriesState,
  (state: State) => state.loaded
);

export const getQuery = createSelector(
  getCategoriesState,
  (state: State) => state.query
);

export const getNextPage = createSelector(
  getCategoriesState,
  (state: State) => state.nextPage
);

export const getCategoriesError = createSelector(
  getCategoriesState,
  (state: State) => state.error
);

export const getAllCategories = createSelector(
  getCategoriesState,
  (state: State) => selectAll(state)
);

export const getCategoriesEntities = createSelector(
  getCategoriesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCategoriesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCategoriesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
