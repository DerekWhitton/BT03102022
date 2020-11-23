import { IUiStyle } from '@boma/administration-portal/shared/entities';
import { createAction, props } from '@ngrx/store';

export const loadUiStyle = createAction('[UiStyle] Load UiStyle Success');

export const setUiStyle = createAction(
  '[UiStyle] Set UiStyle',
  props<{ uiStyle: IUiStyle }>()
);
