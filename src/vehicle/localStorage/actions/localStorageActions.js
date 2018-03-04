import { createAction } from 'redux-actions';

export const loadFavorites = createAction('LOAD_FAVORITES');

export const toggleFavorite = createAction(
  'TOGGLE_FAVORITE',
  productId => productId,
);
