import { RolesEntity } from './roles.models';
import * as RolesActions from './roles.actions';
import { State, initialState, reducer } from './roles.reducer';

describe('Roles Reducer', () => {
  const createRolesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RolesEntity);

  beforeEach(() => {});

  describe('valid Roles actions', () => {
    it('loadRolesSuccess should return set the list of known Roles', () => {
      const roles = [
        createRolesEntity('PRODUCT-AAA'),
        createRolesEntity('PRODUCT-zzz'),
      ];
      const action = RolesActions.loadRolesSuccess({ roles });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
