import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CategoriesActions from './categories.actions';
import { ICategory } from '@bushtrade/administration-portal/shared/entites';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface State extends EntityState<ICategory> {
  selectedId?: string | number; // which Categories record has been selected
  loaded: boolean; // has the Categories list been loaded
  error?: string | null; // last known error (if any)
  nextPage?: number | null;
  query?: string | null;
}

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: State;
}

export const categoriesAdapter: EntityAdapter<ICategory> = createEntityAdapter<
  ICategory
>();

export const initialState: State = categoriesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategories, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) =>
    categoriesAdapter.setAll(categories, { ...state, loaded: true })
  ),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CategoriesActions.setSelectedCategory, (state, action) => {
    return {
      ...state,
      selectedId: action.id,
    };
  }),
  on(CategoriesActions.loadCategoryDetails, (state, action) => {
    return {
      ...state,
      loaded: false,
    };
  }),
  on(CategoriesActions.loadCategoryDetailsSuccess, (state, action) => {
    return categoriesAdapter.setAll(action.category.children, {
      ...state,
      error: '',
      selectedId: action.category.id,
      loaded: true,
    });
  }),
  on(CategoriesActions.loadCategoryDetailsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(CategoriesActions.createCategorySuccess, (state, action) => {
    return categoriesAdapter.upsertOne(action.category, {
      ...state,
      error: '',
    });
  }),
  on(CategoriesActions.createCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(CategoriesActions.updateCategorySuccess, (state, action) => {
    return categoriesAdapter.upsertOne(action.category, {
      ...state,
      error: '',
    });
  }),
  on(CategoriesActions.updateCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(CategoriesActions.deleteCategorySuccess, (state, action) => {
    return categoriesAdapter.removeOne(action.categoryId, state);
  }),
  on(CategoriesActions.deleteCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return categoriesReducer(state, action);
}
