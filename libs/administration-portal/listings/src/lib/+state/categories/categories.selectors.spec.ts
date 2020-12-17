import { CategoriesEntity } from './categories.models';
import { State, categoriesAdapter, initialState } from './categories.reducer';
import * as CategoriesSelectors from './categories.selectors';

describe('Categories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCategoriesId = (it) => it['id'];
  const createCategoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CategoriesEntity);

  let state;

  beforeEach(() => {
    state = {
      categories: categoriesAdapter.setAll(
        [
          createCategoriesEntity('PRODUCT-AAA'),
          createCategoriesEntity('PRODUCT-BBB'),
          createCategoriesEntity('PRODUCT-CCC'),
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

  describe('Categories Selectors', () => {
    it('getAllCategories() should return the list of Categories', () => {
      const results = CategoriesSelectors.getAllCategories(state);
      const selId = getCategoriesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CategoriesSelectors.getSelected(state);
      const selId = getCategoriesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCategoriesLoaded() should return the current 'loaded' status", () => {
      const result = CategoriesSelectors.getCategoriesLoaded(state);

      expect(result).toBe(true);
    });

    it("getCategoriesError() should return the current 'error' state", () => {
      const result = CategoriesSelectors.getCategoriesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
