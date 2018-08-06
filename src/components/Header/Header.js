import React from 'react';
// <!-- eject:remove -->
import { Layout, Menu } from 'antd';
// <!-- /eject:remove -->
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './header.styles';

// <!-- eject:replace with='const Header = ({ classes }) => (' -->
const Header = ({ classes, children }) => (
  // <!-- /eject:replace -->
  // <!-- eject:replace with='  <div className={classes.header}><newline />    This is the header<newline />  </div>' -->
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
  // <!-- /eject:replace -->
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  // <!-- eject:remove -->
  children: PropTypes.array,
  // <!-- /eject:remove -->
};
// <!-- eject:remove -->
Header.defaultProps = {
  children: null,
};
// <!-- /eject:remove -->

export default injectSheet(styles)(Header);
