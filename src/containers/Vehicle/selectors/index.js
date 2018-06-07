// import store from '../../../store';
// import { getProductFavorite } from '../vehicle/localStorage/reducer/localStorageReducer';
export const getVehicles = state => state.vehicle.vehicles;

// export const getVehicleLocalFavorites = () =>
//   store.getState().vehicle.localStorage.favorites;

const getVehicleMostViewData = state =>
  getVehicles(state).filter(({ id }) => state.vehicle.mostView.indexOf(id) !== -1);
const getVehicleLatestData = state =>
  getVehicles(state).filter(({ id }) => state.vehicle.latest.indexOf(id) !== -1);
export const getVehicleMostViewWithFavorite = (state) => {
  const mostViewData = getVehicleMostViewData(state);
  // mostViewData.forEach(
  //   product =>
  //     (product.IsFavorite = getProductFavorite(
  //       state.vehicle.localStorage,
  //       product.ID,
  //     )),
  // );
  return mostViewData || undefined;
};
export const getVehicleLatestWithFavorite = (state) => {
  const latestData = getVehicleLatestData(state);
  // latestData.forEach(
  //   product =>
  //     (product.IsFavorite = getProductFavorite(
  //       state.vehicle.localStorage,
  //       product.ID
  //     ))
  // );
  return latestData || undefined;
};
