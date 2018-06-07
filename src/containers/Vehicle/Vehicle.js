import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';

export default () => (
  <Switch>
    <Route path="/" component={MainPage} />
  </Switch>
);
