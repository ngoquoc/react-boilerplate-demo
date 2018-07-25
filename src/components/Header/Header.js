import React from 'react';
import { Layout, Menu } from 'antd';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './header.styles';

const Header = ({ classes, children }) => (
  <Layout.Header>
    <div
      className={classes.logo}
      style={{
        background: 'url(assets/index_oglasi_logo.svg) no-repeat top center',
        backgroundSize: 'auto 20px',
      }}
    />
    <Menu
      theme="dark"
      mode="horizontal"
      selectable={false}
      style={{ lineHeight: '64px' }}
      className="pull-right"
    >
      {children}
    </Menu>
  </Layout.Header>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array,
};
Header.defaultProps = {
  children: null,
};

export default injectSheet(styles)(Header);
