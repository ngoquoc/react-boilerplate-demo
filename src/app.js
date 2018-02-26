import React, { Component } from 'react';
import { Header, Footer } from 'shared/components';
import { Route, Switch } from 'react-router-dom';
import { MainPage } from './vehicle';
import { Layout } from 'antd';
class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/" component={MainPage} />
            <Route path="/vehicle">
              <Route path="/" component={MainPage} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Layout>
    );
  }
}

export default App;
