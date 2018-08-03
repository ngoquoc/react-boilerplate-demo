import React from 'react';
// <!-- eject:remove -->
import { Layout, Menu } from 'antd';
// <!-- /eject:remove -->
import injectSheet from 'react-jss';
// <!-- eject:remove -->
import { Route, Switch } from 'react-router-dom';
// <!-- /eject:remove -->
import PropTypes from 'prop-types';
import {
  Header,
  Footer,
  // <!-- eject:remove if='!args.multilingual' -->
  Translation,
  // <!-- /eject:remove -->
} from './components';
// <!-- eject:remove -->
import UnauthenticatedLoginMenuItem from './containers/User/LoginMenuItem';
// <!-- /eject:remove -->
// <!-- eject:remove if='!args.multilingual' -->
import enableTranslation from './HOCs/intl/enableTranslation';
// <!-- /eject:remove -->
// <!-- eject:remove -->
import Vehicle from './containers/Vehicle';
// <!-- /eject:remove -->
import styles from './app.styles';

const App = ({
  classes,
  // <!-- eject:remove if='!args.multilingual' -->
  translation: { searchTitle, sellTitle },
  // <!-- /eject:remove -->
}) => (
  // <!-- eject:replace with='  <div className={classes.layout}>' -->
  <Layout className={classes.layout}>
    {/* <!-- /eject:replace --> */}
    {/* <!-- eject:replace with='    <Header />' --> */}
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
    {/* <!-- /eject:replace --> */}
    {/* <!-- eject:replace if='!args.multilingual' with='    <div>App content</div>' else='    <div><newline />      <Translation>App content: <newline />      </Translation>searchTitle: {searchTitle}, sellTitle: {sellTitle}<newline />    </div>' --> */}
    <Layout.Content className={classes.content}>
      <Switch>
        <Route path="/" component={Vehicle} />
        <Route path="/vehicle" component={Vehicle} />
      </Switch>
    </Layout.Content>
    {/* <!-- /eject:replace --> */}
    <Footer />
    {/* <!-- eject:replace with='  </div>' --> */}
  </Layout>
  // <!-- /eject:replace -->
);
App.propTypes = {
  // <!-- eject:remove if='!args.multilingual' -->
  translation: PropTypes.object.isRequired,
  // <!-- /eject:remove -->
  classes: PropTypes.object.isRequired,
};

// <!-- eject:replace with='export default injectSheet(styles)(App);' if='!args.multilingual' -->
export default enableTranslation({
  searchTitle: 'SEARCH',
  sellTitle: 'SELL',
})(injectSheet(styles)(App));
// <!-- /eject:replace -->
