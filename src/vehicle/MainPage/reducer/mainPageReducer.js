import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = { mostview: {} };

export default handleActions(
  {
    [actions.fetchMostviewData](state, { payload }) {
      return { ...state, mostview: { ...payload } };
    },
    [actions.fetchLatestData](state, { payload }) {
      return { ...state, latest: { ...payload } };
    },
  },
  initialState,
);
