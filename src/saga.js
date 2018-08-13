import { all } from 'redux-saga/effects';
// <!-- eject:remove -->
import { vehicleSagas } from './containers';
// <!-- /eject:remove -->

export default function* rootSaga() {
  yield all([
    // <!-- eject:remove -->
    vehicleSagas(),
    // <!-- /eject:remove -->
  ]);
}
