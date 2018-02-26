import { combineReducers } from 'redux';
import { mainPageReducer } from './MainPage/reducers/mainPageReducer';
const vehicleReducer = combineReducers({ mainPage: mainPageReducer });

export default vehicleReducer;
