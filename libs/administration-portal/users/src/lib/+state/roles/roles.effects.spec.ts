import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { RolesEffects } from './roles.effects';
import * as RolesActions from './roles.actions';

describe('RolesEffects', () => {
  let actions: Observable<any>;
  let effects: RolesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        RolesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(RolesEffects);
  });

  describe('loadRoles$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RolesActions.loadRoles() });

      const expected = hot('-a-|', {
        a: RolesActions.loadRolesSuccess({ roles: [] }),
      });

      expect(effects.loadRoles$).toBeObservable(expected);
    });
  });
});
