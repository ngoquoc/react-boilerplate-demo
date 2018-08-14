import React from 'react';
// <!-- eject:replace with='import PropTypes from ${&#39;}prop-types${&#39;};' -->
import { Layout } from 'antd';
// <!-- /eject:replace -->
import injectSheet from 'react-jss';
import styles from './footer.styles';

// <!-- eject:replace with='const Footer = ({ classes }) => (' -->
const Footer = () => (
  // <!-- /eject:replace -->
  // <!-- eject:replace with='  <div className={classes.footer}>${&#10;}    This is the footer${&#10;}  </div>' -->
  <Layout.Footer style={{ textAlign: 'center' }}>
    Index Oglasi ©2018 Created by 2Click Solutions
  </Layout.Footer>
  // <!-- /eject:replace -->
  // <!-- eject:replace with=');${&#10;}Footer.propTypes = {${&#10;}  classes: PropTypes.object.isRequired,${&#10;}};' -->
);
// <!-- /eject:replace -->

export default injectSheet(styles)(Footer);
