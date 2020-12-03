import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CategoriesEffects } from './categories.effects';
import * as CategoriesActions from './categories.actions';

describe('CategoriesEffects', () => {
  let actions: Observable<any>;
  let effects: CategoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CategoriesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CategoriesEffects);
  });

  describe('loadCategories$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CategoriesActions.loadCategories() });

      const expected = hot('-a-|', {
        a: CategoriesActions.loadCategoriesSuccess({ categories: [] }),
      });

      expect(effects.loadCategories$).toBeObservable(expected);
    });
  });
});
