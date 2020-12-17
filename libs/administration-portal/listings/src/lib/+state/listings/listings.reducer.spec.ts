import { ListingsEntity } from './listings.models';
import * as ListingsActions from './listings.actions';
import { State, initialState, reducer } from './listings.reducer';

describe('Listings Reducer', () => {
  const createListingsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ListingsEntity);

  beforeEach(() => {});

  describe('valid Listings actions', () => {
    it('loadListingsSuccess should return set the list of known Listings', () => {
      const listings = [
        createListingsEntity('PRODUCT-AAA'),
        createListingsEntity('PRODUCT-zzz'),
      ];
      const action = ListingsActions.loadListingsSuccess({ listings });

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
