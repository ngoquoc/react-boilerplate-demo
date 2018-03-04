import { combineReducers } from 'redux';
import mainPageReducer from './MainPage/reducer/mainPageReducer';
import localStorageReducer from './localStorage/reducer/localStorageReducer';
const vehicleReducer = combineReducers({
  mainPage: mainPageReducer,
  localStorage: localStorageReducer,
});

export default vehicleReducer;
