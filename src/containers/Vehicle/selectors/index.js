import { createSelector } from 'reselect';

export const getVehicles = state => state.vehicle.vehicles;
export const getVehicleMostView = state => state.vehicle.mostView;
export const getVehicleLatest = state => state.vehicle.latest;
export const getVehicleMostViewData = createSelector(
  [getVehicles, getVehicleMostView],
  (vehicles, mostView) =>
    vehicles.filter(({ id }) => mostView.indexOf(id) !== -1)
);
export const getVehicleLatestData = createSelector(
  [getVehicles, getVehicleLatest],
  (vehicles, latest) => vehicles.filter(({ id }) => latest.indexOf(id) !== -1)
);
export const getVehicleMostViewWithFavorite = createSelector(
  getVehicleMostViewData,
  mostViewData =>
    // mostViewData.forEach(
    //   product =>
    //     (product.IsFavorite = getProductFavorite(
    //       state.vehicle.localStorage,
    //       product.ID,
    //     )),
    // );
    mostViewData || undefined
);
export const getVehicleLatestWithFavorite = createSelector(
  getVehicleLatestData,
  latestData =>
    // latestData.forEach(
    //   product =>
    //     (product.IsFavorite = getProductFavorite(
    //       state.vehicle.localStorage,
    //       product.ID
    //     ))
    // );
    latestData || undefined
);
