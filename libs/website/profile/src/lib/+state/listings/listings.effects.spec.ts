import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ListingsEffects } from './listings.effects';
import * as ListingsActions from './listings.actions';

describe('ListingsEffects', () => {
  let actions: Observable<any>;
  let effects: ListingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ListingsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(ListingsEffects);
  });

  describe('loadListings$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ListingsActions.loadListings() });

      const expected = hot('-a-|', {
        a: ListingsActions.loadListingsSuccess({ listings: [] }),
      });

      expect(effects.loadListings$).toBeObservable(expected);
    });
  });
});
