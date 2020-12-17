import { RolesEntity } from './roles.models';
import { State, rolesAdapter, initialState } from './roles.reducer';
import * as RolesSelectors from './roles.selectors';

describe('Roles Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRolesId = (it) => it['id'];
  const createRolesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RolesEntity);

  let state;

  beforeEach(() => {
    state = {
      roles: rolesAdapter.setAll(
        [
          createRolesEntity('PRODUCT-AAA'),
          createRolesEntity('PRODUCT-BBB'),
          createRolesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Roles Selectors', () => {
    it('getAllRoles() should return the list of Roles', () => {
      const results = RolesSelectors.getAllRoles(state);
      const selId = getRolesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RolesSelectors.getSelected(state);
      const selId = getRolesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getRolesLoaded() should return the current 'loaded' status", () => {
      const result = RolesSelectors.getRolesLoaded(state);

      expect(result).toBe(true);
    });

    it("getRolesError() should return the current 'error' state", () => {
      const result = RolesSelectors.getRolesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
