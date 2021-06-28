import { ICategory } from '@bushtrade/administration-portal/shared/entites';
import { createAction, props } from '@ngrx/store';

export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: ICategory[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: any }>()
);

export const setSelectedCategory = createAction(
  '[Categories] Set Selected Category',
  props<{ id: string }>()
);

export const switchCategoriesOrder = createAction(
  '[Categories] Switch Categories Order',
  props<{ firstCategoryId: string, secondCategoryId: string }>()
);

export const switchCategoriesOrderSuccess = createAction(
  '[Categories] Switch Categories Order Success',
  props<{ firstCategoryId: string, secondCategoryId: string }>()
);

export const loadCategoryDetails = createAction(
  '[Categories] Load Category Details',
  props<{ categoryId: string; parent: boolean }>()
);

export const loadCategoryDetailsSuccess = createAction(
  '[Categories] Load Category Details Success',
  props<{ category: ICategory; parent: boolean }>()
);

export const loadCategoryDetailsFailure = createAction(
  '[Categories] Load Category Details Failure',
  props<{ error: any }>()
);

export const createCategory = createAction(
  '[Categories] Create Category',
  props<{ category: ICategory; parent: boolean }>()
);

export const createCategorySuccess = createAction(
  '[Categories] Create Category Success',
  props<{ category: ICategory; parent: boolean }>()
);

export const createCategoryFailure = createAction(
  '[Categories] Create Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Categories] Update Category',
  props<{ category: any; categoryId: string; parent: boolean }>()
);

export const updateCategorySuccess = createAction(
  '[Categories] Update Category Success',
  props<{ category: ICategory; categoryId: string; parent: boolean }>()
);

export const updateCategoryFailure = createAction(
  '[Categories] Update Category Failure',
  props<{ error: any }>()
);

export const deleteCategory = createAction(
  '[Categories] Delete Category',
  props<{ categoryId: string }>()
);

export const deleteCategorySuccess = createAction(
  '[Categories] Delete Category Success',
  props<{ categoryId: string }>()
);

export const deleteCategoryFailure = createAction(
  '[Categories] Delete Category Failure',
  props<{ error: any }>()
);
