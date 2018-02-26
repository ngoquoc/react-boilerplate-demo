import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import vehicleReducer from './vehicle/reducer';

const rootReducer = combineReducers({
  form,
  router: routerReducer,
  vehicle: vehicleReducer,
});

export default rootReducer;
