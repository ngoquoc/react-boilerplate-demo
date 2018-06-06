import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import vehicle from './containers/Vehicle/vehicle.ducks';
import user from './containers/User/user.ducks';

export default combineReducers({
  form,
  router: routerReducer,
  vehicle,
  user
});
