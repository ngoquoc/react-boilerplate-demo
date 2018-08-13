import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
import rootReducer from './reducer';
import { INTL_LOCALE } from './config';

// <!-- eject:replace with='const BASE_NAME = ${&#39;}/${&#39;};' -->
const BASE_NAME = window.indexad.PUBLIC_URL;
// <!-- /eject:replace -->

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
export const history = createHistory({ basename: BASE_NAME });
const middlewares = [routerMiddleware(history), sagaMiddleware];
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  {
    intl: {
      locale: INTL_LOCALE,
      messages: {},
    },
  },
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(saga);
