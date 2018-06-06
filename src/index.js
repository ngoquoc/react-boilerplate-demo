import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ThemeProvider } from 'react-jss';
import { IntlProvider } from 'react-intl';
import 'antd/dist/antd.css';
import App from './app';
import store, { history } from './store';
import { THEME_CONFIG, INTL_LOCALE } from './config';

render(
  <Provider store={store}>
    <IntlProvider locale={INTL_LOCALE}>
      <ThemeProvider theme={THEME_CONFIG}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ThemeProvider>
    </IntlProvider>
  </Provider>,

  document.querySelector('#root')
);
