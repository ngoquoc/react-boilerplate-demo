import { createAction, handleActions } from 'redux-actions';
import { apiGet } from '../../utils';

export const fetchMostviewData = createAction(
  'FETCH_MOSTVIEW_DATA',
  async (vehicles, page: number) => {
    const result = await apiGet(`vehicle-ads/mostView/?page=${page}`);
    let ids = [];
    const items = [];
    if (result && result.data) {
      const vehicleIds = vehicles.map(({ id }) => id);
      ids = result.data.map((item) => {
        if (vehicleIds.indexOf(item.id) === -1) {
          items.push(item);
        }
        return item.id;
      });
    }
    return { ids, items };
  }
);

export const fetchLatestData = createAction(
  'FETCH_LATEST_DATA',
  async (vehicles, page: number) => {
    const result = await apiGet(`vehicle-ads/latest/?page=${page}`);
    let ids = [];
    const items = [];
    if (result && result.data) {
      const vehicleIds = vehicles.map(({ id }) => id);
      ids = result.data.map((item) => {
        if (vehicleIds.indexOf(item.id) === -1) {
          items.push(item);
        }
        return item.id;
      });
    }
    return { ids, items };
  }
);

const initialState = {
  vehicles: [],
  mostView: [],
  latest: [],
};

export default handleActions(
  {
    [fetchMostviewData](
      state,
      {
        payload: { ids, items },
      }
    ) {
      if (!ids || !items) {
        return state;
      }
      return {
        ...state,
        mostView: ids,
        vehicles: [...state.vehicles, ...items],
      };
    },
    [fetchLatestData](
      state,
      {
        payload: { ids, items },
      }
    ) {
      if (!ids || !items) {
        return state;
      }
      return {
        ...state,
        latest: ids,
        vehicles: [...state.vehicles, ...items],
      };
    },
  },
  initialState
);
