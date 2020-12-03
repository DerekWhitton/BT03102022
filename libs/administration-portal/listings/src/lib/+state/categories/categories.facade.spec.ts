import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CategoriesEntity } from './categories.models';
import { CategoriesEffects } from './categories.effects';
import { CategoriesFacade } from './categories.facade';

import * as CategoriesSelectors from './categories.selectors';
import * as CategoriesActions from './categories.actions';
import {
  CATEGORIES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './categories.reducer';

interface TestSchema {
  categories: State;
}

describe('CategoriesFacade', () => {
  let facade: CategoriesFacade;
  let store: Store<TestSchema>;
  const createCategoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CategoriesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CATEGORIES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CategoriesEffects]),
        ],
        providers: [CategoriesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CategoriesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCategories$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(CategoriesActions.loadCategories());

        list = await readFirst(facade.allCategories$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCategoriesSuccess` to manually update list
     */
    it('allCategories$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCategories$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          CategoriesActions.loadCategoriesSuccess({
            categories: [
              createCategoriesEntity('AAA'),
              createCategoriesEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allCategories$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
