import { createAction, handleActions } from 'redux-actions';

export const FETCH_MOSTVIEW_DATA = 'FETCH_MOSTVIEW_DATA';
export const FETCH_MOSTVIEW_DATA_DONE = `${FETCH_MOSTVIEW_DATA}_DONE`;
export const FETCH_LATEST_DATA = 'FETCH_LATEST_DATA';
export const FETCH_LATEST_DATA_DONE = `${FETCH_LATEST_DATA}_DONE`;

export const fetchMostviewData = createAction(FETCH_MOSTVIEW_DATA);
export const fetchMostviewDataDone = createAction(FETCH_MOSTVIEW_DATA_DONE);
export const fetchLatestData = createAction(FETCH_LATEST_DATA);
export const fetchLatestDataDone = createAction(FETCH_LATEST_DATA_DONE);

const initialState = {
  vehicles: [],
  mostView: [],
  latest: [],
};

export default handleActions(
  {
    [fetchMostviewDataDone](
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
        vehicles: [
          ...state.vehicles,
          ...items.filter(({ id }) => !state.vehicles.find(item => item.id === id)),
        ],
      };
    },
    [fetchLatestDataDone](
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
        vehicles: [
          ...state.vehicles,
          ...items.filter(({ id }) => !state.vehicles.find(item => item.id === id)),
        ],
      };
    },
  },
  initialState
);
