import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducer';

const BASE_NAME = window.indexad.PUBLIC_URL;

export const history = createHistory({ basename: BASE_NAME });
const middlewares = [routerMiddleware(history), promiseMiddleware];
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
