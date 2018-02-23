import React, { Component } from 'react';
import { Header } from 'shared/components';
import { Route, Switch } from 'react-router-dom';
import { MainPage } from './Vehicle';
import './app.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route path="/vehicle">
            <Route path="/" component={MainPage} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
