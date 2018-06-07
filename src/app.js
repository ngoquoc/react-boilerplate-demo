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

class App extends React.Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };
  state = {
    searchTitle: 'SEARCH',
    sellTitle: 'SELL',
  };
  componentWillMount() {
    const { translate } = this.props;
    Promise.all([
      translate(this.state.searchTitle),
      translate(this.state.sellTitle),
    ]).then(([searchTitle, sellTitle]) => {
      this.setState({
        searchTitle,
        sellTitle,
      });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Layout className={classes.layout}>
        <Header>
          <Menu.SubMenu key="1" title={this.state.searchTitle}>
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
              <Translation>Trucks, Commercial & Utility Vehicle</Translation>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="2" title={this.state.sellTitle}>
            <Menu.Item key="2.1">
              <Translation>Cars</Translation>
            </Menu.Item>
            <Menu.Item key="2.2">
              <Translation>Motorcycles</Translation>
            </Menu.Item>
            <Menu.Item key="2.3">
              <Translation>Motorhomes & Caravans</Translation>
            </Menu.Item>
            <Menu.Item key="2.4">
              <Translation>Trucks, Commercial & Utility Vehicle</Translation>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="3">
            <Translation>Favorite</Translation>
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
  }
}

export default enableTranslation(injectSheet(styles)(App));
