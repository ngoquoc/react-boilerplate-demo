import React from 'react';
// <!-- eject:replace with='import PropTypes from "prop-types";' -->
import { Layout } from 'antd';
// <!-- /eject:replace -->
import injectSheet from 'react-jss';
import styles from './footer.styles';

// <!-- eject:replace with='const Footer = ({ classes }) => (' -->
const Footer = () => (
  // <!-- /eject:replace -->
  // <!-- eject:replace with='  <div className={classes.footer}><newline />    This is the footer<newline />  </div>' -->
  <Layout.Footer style={{ textAlign: 'center' }}>
    Index Oglasi ©2018 Created by 2Click Solutions
  </Layout.Footer>
  // <!-- /eject:replace -->
  // <!-- eject:replace with=');<newline />Footer.propTypes = {<newline />  classes: PropTypes.object.isRequired,<newline />};' -->
);
// <!-- /eject:replace -->

export default injectSheet(styles)(Footer);
