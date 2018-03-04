import { createAction } from 'redux-actions';
import store from 'store';

export const loadFavorites = createAction('LOAD_FAVORITES');

export const toggleFavorite = createAction(
  'TOGGLE_FAVORITE',
  (productId: object) => {
    return { productId };
  },
);