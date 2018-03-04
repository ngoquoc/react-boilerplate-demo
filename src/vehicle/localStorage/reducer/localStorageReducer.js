import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
const FAVORITES_KEY = 'favorite_list';
const storage = window.localStorage;
const initialState = { favorites: [] };

/**
 * Get product's favorite state by Id
 *
 * @param {any} state
 * @param {any} productId Id of product
 */
export const getProductFavorite = (state, productId) => {
  return !!state.favorites[productId];
};

const favorites = handleActions(
  {
    LOAD_FAVORITES(state, { payload }) {
      let newState = JSON.parse(storage.getItem(FAVORITES_KEY));
      return { ...newState };
    },
    TOGGLE_FAVORITE(state, { payload }) {
      const { productId } = payload;
      let newState = { ...state, [productId]: !state[productId] };
      storage.setItem(FAVORITES_KEY, JSON.stringify(newState));
      return { ...newState };
    },
  },
  initialState.favorites,
);
const localStorageReducer = combineReducers({
  favorites: favorites,
});

export default localStorageReducer;
