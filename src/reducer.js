import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
// <!-- eject:remove if='!args.multilingual' -->
import { intlReducer as intl } from 'react-intl-redux';
// <!-- /eject:remove -->
// <!-- eject:remove -->
import vehicle from './containers/Vehicle/vehicle.ducks';
import user from './containers/User/user.ducks';
// <!-- /eject:remove -->

export default combineReducers({
  form,
  router: routerReducer,
  // <!-- eject:remove -->
  vehicle,
  user,
  // <!-- /eject:remove -->
  // <!-- eject:remove if='!args.multilingual' -->
  intl,
  // <!-- /eject:remove -->
});
