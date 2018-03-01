import React, { Component } from 'react';
import { Header, Footer } from './shared/components';
import { Route, Switch } from 'react-router-dom';
import { MainPage } from './vehicle';
import { Layout } from 'antd';
import { Network } from './utils';
class App extends Component {
  render() {
    Network()
      .get('vehicle-ads/mostview/?page=1')
      .then(res => res.json())
      .then(res => console.log(res));
    return (
      <Layout className="layout">
        <Header />
        <Layout.Content className="content">
          <Switch>
            <Route path="/" component={MainPage} />
            <Route path="/vehicle">
              <Route path="/" component={MainPage} />
            </Route>
          </Switch>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}

export default App;
