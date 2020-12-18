import { ListingsEntity } from './listings.models';
import { State, listingsAdapter, initialState } from './listings.reducer';
import * as ListingsSelectors from './listings.selectors';

describe('Listings Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getListingsId = (it) => it['id'];
  const createListingsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ListingsEntity);

  let state;

  beforeEach(() => {
    state = {
      listings: listingsAdapter.setAll(
        [
          createListingsEntity('PRODUCT-AAA'),
          createListingsEntity('PRODUCT-BBB'),
          createListingsEntity('PRODUCT-CCC'),
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

  describe('Listings Selectors', () => {
    it('getAllListings() should return the list of Listings', () => {
      const results = ListingsSelectors.getAllListings(state);
      const selId = getListingsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ListingsSelectors.getSelected(state);
      const selId = getListingsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getListingsLoaded() should return the current 'loaded' status", () => {
      const result = ListingsSelectors.getListingsLoaded(state);

      expect(result).toBe(true);
    });

    it("getListingsError() should return the current 'error' state", () => {
      const result = ListingsSelectors.getListingsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
