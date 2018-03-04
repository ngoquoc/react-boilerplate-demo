import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = { mostView: { Data: [] }, latest: { Data: [] } };

export default handleActions(
  {
    [actions.fetchMostviewData](state, { payload }) {
      return { ...state, mostView: { ...payload } };
    },
    [actions.fetchLatestData](state, { payload }) {
      return { ...state, latest: { ...payload } };
    },
  },
  initialState,
);
