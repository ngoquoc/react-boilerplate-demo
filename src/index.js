import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-intl-redux';
// <!-- eject:remove -->
import 'antd/dist/antd.css';
// <!-- /eject:remove -->
import App from './App';
import store, { history } from './store';
import { THEME_CONFIG } from './config';

render(
  <Provider store={store}>
    <ThemeProvider theme={THEME_CONFIG}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,

  document.querySelector('#root')
);
