import store from '../store';
import { getProductFavorite } from '../vehicle/localStorage/reducer/localStorageReducer';
export const getVehicleMainpage = state => state.vehicle.mainPage;
export const getVehicleLocalStorage = state => state.vehicle.localStorage;

export const getVehicleLocalFavorites = () =>
  store.getState().vehicle.localStorage.favorites;

const getVehicleMostViewData = state => getVehicleMainpage(state).mostView.Data;
const getVehicleLatestData = state => getVehicleMainpage(state).latest.Data;

export const getVehicleMostViewWithFavorite = state => {
  let mostViewData = getVehicleMostViewData(state);
  mostViewData.forEach(
    product =>
      (product.IsFavorite = getProductFavorite(
        state.vehicle.localStorage,
        product.ID,
      )),
  );
  // Use slice here to clone new array, help trigger rerender in components
  return mostViewData.slice();
};
export const getVehicleLatestWithFavorite = state => {
  let latestData = getVehicleLatestData(state);
  latestData.forEach(
    product =>
      (product.IsFavorite = getProductFavorite(
        state.vehicle.localStorage,
        product.ID,
      )),
  );
  // Use slice here to clone new array, help trigger rerender in components
  return latestData.slice();
};
