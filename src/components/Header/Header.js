import React from 'react';
// import { Nav, NavDropdown, MenuItem, Navbar, NavItem } from 'react-bootstrap';
import { Layout, Menu } from 'antd';
import injectSheet from 'react-jss';
import styles from './header.styles';
const Header = ({ classes, children }) => {
  return (
    <Layout.Header>
      <div
        className={classes.logo}
        style={{
          background: 'url(assets/index_oglasi_logo.svg) no-repeat top center',
          backgroundSize: 'auto 20px'
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
};

export default injectSheet(styles)(Header);
