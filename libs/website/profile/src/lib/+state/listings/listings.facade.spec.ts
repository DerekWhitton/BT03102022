import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ListingsEntity } from './listings.models';
import { ListingsEffects } from './listings.effects';
import { ListingsFacade } from './listings.facade';

import * as ListingsSelectors from './listings.selectors';
import * as ListingsActions from './listings.actions';
import {
  LISTINGS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './listings.reducer';

interface TestSchema {
  listings: State;
}

describe('ListingsFacade', () => {
  let facade: ListingsFacade;
  let store: Store<TestSchema>;
  const createListingsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ListingsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(LISTINGS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ListingsEffects]),
        ],
        providers: [ListingsFacade],
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
      facade = TestBed.get(ListingsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allListings$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ListingsActions.loadListings());

        list = await readFirst(facade.allListings$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadListingsSuccess` to manually update list
     */
    it('allListings$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allListings$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ListingsActions.loadListingsSuccess({
            listings: [
              createListingsEntity('AAA'),
              createListingsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allListings$);
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
