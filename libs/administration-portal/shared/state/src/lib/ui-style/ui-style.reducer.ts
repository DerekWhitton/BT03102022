import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UiStyleActions from './ui-style.actions';
import { IUiStyle } from '@boma/administration-portal/shared/entities';

export const UISTYLE_FEATURE_KEY = 'uiStyle';

export interface State extends EntityState<IUiStyle> {
  error?: string | null;
}

export interface UiStylePartialState {
  readonly [UISTYLE_FEATURE_KEY]: State;
}

export const uiStyleAdapter: EntityAdapter<IUiStyle> = createEntityAdapter<
  IUiStyle
>();

export const initialState: State = uiStyleAdapter.getInitialState({});

const uiStyleReducer = createReducer(
  initialState,
  on(UiStyleActions.loadUiStyle, (state) => ({
    ...state,
  })),
  on(UiStyleActions.setUiStyle, (state, { uiStyle }) =>
    uiStyleAdapter.upsertOne(uiStyle, {
      ...state,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return uiStyleReducer(state, action);
}
