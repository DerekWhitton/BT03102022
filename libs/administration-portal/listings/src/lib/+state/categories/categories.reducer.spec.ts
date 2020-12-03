import { CategoriesEntity } from './categories.models';
import * as CategoriesActions from './categories.actions';
import { State, initialState, reducer } from './categories.reducer';

describe('Categories Reducer', () => {
  const createCategoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CategoriesEntity);

  beforeEach(() => {});

  describe('valid Categories actions', () => {
    it('loadCategoriesSuccess should return set the list of known Categories', () => {
      const categories = [
        createCategoriesEntity('PRODUCT-AAA'),
        createCategoriesEntity('PRODUCT-zzz'),
      ];
      const action = CategoriesActions.loadCategoriesSuccess({ categories });

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
