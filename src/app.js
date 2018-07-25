import React from 'react';
import { Layout, Menu } from 'antd';
import injectSheet from 'react-jss';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Footer, Translation } from './components';
import UnauthenticatedLoginMenuItem from './containers/User/LoginMenuItem';
import enableTranslation from './HOCs/intl/enableTranslation';
import Vehicle from './containers/Vehicle';
import styles from './app.styles';

const App = ({ classes, translation: { searchTitle, sellTitle } }) => (
  <Layout className={classes.layout}>
    <Header>
      <Menu.SubMenu key="1" title={searchTitle}>
        <Menu.Item key="1.1">
          <Translation>USED_NEW_CARS</Translation>
        </Menu.Item>
        <Menu.Item key="1.2">
          <Translation>MOTORCYCLES</Translation>
        </Menu.Item>
        <Menu.Item key="1.3">
          <Translation>MOTORHOMES_CARAVANS</Translation>
        </Menu.Item>
        <Menu.Item key="1.4">
          <Translation>TRUCKS_COMMERCIAL_UTILITY_VEHICLE</Translation>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="2" title={sellTitle}>
        <Menu.Item key="2.1">
          <Translation>CARS</Translation>
        </Menu.Item>
        <Menu.Item key="2.2">
          <Translation>MOTORCYCLES</Translation>
        </Menu.Item>
        <Menu.Item key="2.3">
          <Translation>MOTORHOMES_CARAVANS</Translation>
        </Menu.Item>
        <Menu.Item key="2.4">
          <Translation>TRUCKS_COMMERCIAL_UTILITY_VEHICLE</Translation>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="3">
        <Translation>FAVORITE</Translation>
      </Menu.Item>
      <UnauthenticatedLoginMenuItem key="4" />
    </Header>
    <Layout.Content className={classes.content}>
      <Switch>
        <Route path="/" component={Vehicle} />
        <Route path="/vehicle" component={Vehicle} />
      </Switch>
    </Layout.Content>
    <Footer />
  </Layout>
);
App.propTypes = {
  translation: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default enableTranslation({
  searchTitle: 'SEARCH',
  sellTitle: 'SELL',
})(injectSheet(styles)(App));
