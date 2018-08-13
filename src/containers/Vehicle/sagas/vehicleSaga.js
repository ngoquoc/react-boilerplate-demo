import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import {
  FETCH_MOSTVIEW_DATA,
  FETCH_LATEST_DATA,
  fetchMostviewDataDone,
  fetchLatestDataDone,
} from '../vehicle.ducks';
import { apiGet } from '../../../utils';

export function* fetchMostviewData(action = { payload: { page: 0 } }) {
  try {
    const { page } = action.payload;
    const result = yield call(
      (...args) => apiGet(...args).then(result => result.json()),
      `vehicle-ads/?page=${page}`
    );
    let ids = [];
    const items = [];
    if (result && result.data) {
      ids = result.data.map((item) => {
        items.push(item);
        return item.id;
      });
    }
    yield put(fetchMostviewDataDone({ ids, items }));
  } catch (e) {
    yield put(fetchMostviewDataDone({ items: [], ids: [], error: e.message }));
  }
}

export function* fetchLatestData(action = { payload: { page: 0 } }) {
  try {
    const { page } = action.payload;
    const result = yield call(
      (...args) => apiGet(...args).then(result => result.json()),
      `vehicle-ads/?page=${page}`
    );
    let ids = [];
    const items = [];
    if (result && result.data) {
      ids = result.data.map((item) => {
        items.push(item);
        return item.id;
      });
    }
    yield put(fetchLatestDataDone({ ids, items }));
  } catch (e) {
    yield put(fetchLatestDataDone({ items: [], ids: [], error: e.message }));
  }
}

export function* watchMostviewData() {
  yield takeEvery(FETCH_MOSTVIEW_DATA, fetchMostviewData);
}

export function* watchLatestData() {
  yield takeEvery(FETCH_LATEST_DATA, fetchLatestData);
}

export default function* vehicleSaga() {
  yield all([fork(watchMostviewData), fork(watchLatestData)]);
}
