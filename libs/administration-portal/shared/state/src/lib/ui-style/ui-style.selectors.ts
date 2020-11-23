import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import {
  UISTYLE_FEATURE_KEY,
  State,
  UiStylePartialState,
  uiStyleAdapter,
} from './ui-style.reducer';

// Lookup the 'uiStyle' feature state managed by NgRx
export const getUiStyleState = createFeatureSelector<
  UiStylePartialState,
  State
>(UISTYLE_FEATURE_KEY);

const { selectAll, selectEntities } = uiStyleAdapter.getSelectors();

export const getUiStyle = createSelector(
  getUiStyleState,
  (state: State) => state.entities[1]
);
