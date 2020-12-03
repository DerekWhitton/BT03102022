import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromCategories from './categories.reducer';
import * as CategoriesActions from './categories.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoriesService } from '@bushtrade/administration-portal/shared/services';
import { Action } from '@ngrx/store';

@Injectable()
export class CategoriesEffects implements OnInitEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      exhaustMap((action) =>
        this.categoryService.listCategories().pipe(
          map((data) =>
            CategoriesActions.loadCategoriesSuccess({
              categories: data,
            })
          ),
          catchError((error) =>
            of(CategoriesActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  loadCategoryDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.loadCategoryDetails),
      exhaustMap((action) =>
        this.categoryService.getCategoryDetails(action.categoryId).pipe(
          map((data) =>
            CategoriesActions.loadCategoryDetailsSuccess({
              category: data,
              parent: action.parent,
            })
          ),
          catchError((error) =>
            of(CategoriesActions.loadCategoryDetailsFailure({ error }))
          )
        )
      )
    );
  });

  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.createCategory),
      exhaustMap((action) =>
        this.categoryService.createCategory(action.category).pipe(
          map((data) =>
            CategoriesActions.createCategorySuccess({
              category: data,
              parent: action.parent,
            })
          ),
          catchError((error) =>
            of(CategoriesActions.createCategoryFailure({ error }))
          )
        )
      )
    );
  });

  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.updateCategory),
      exhaustMap((action) =>
        this.categoryService
          .updateCategory(action.category, action.categoryId)
          .pipe(
            map((data) =>
              CategoriesActions.updateCategorySuccess({
                category: data,
                categoryId: action.categoryId,
                parent: action.parent,
              })
            ),
            catchError((error) =>
              of(CategoriesActions.updateCategoryFailure({ error }))
            )
          )
      )
    );
  });

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      exhaustMap((action) =>
        this.categoryService.deleteCategory(action.categoryId).pipe(
          map((data) =>
            CategoriesActions.deleteCategorySuccess({
              categoryId: action.categoryId,
            })
          ),
          catchError((error) =>
            of(CategoriesActions.deleteCategoryFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService
  ) {}

  ngrxOnInitEffects(): Action {
    return CategoriesActions.loadCategories();
  }
}
