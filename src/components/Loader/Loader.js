import React from 'react';
// <!-- eject:remove -->
import { Spin } from 'antd';
// <!-- /eject:remove -->
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './loader.styles';

// <!-- eject:replace with='const Loader = ({ classes }) => (' -->
const Loader = ({ classes, size }) => (
  // <!-- /eject:replace -->
  <div className={classes.loader}>
    {/* <!-- eject:replace with='    Loading...' --> */}
    <Spin tip="Loading..." size={size} />
    {/* <!-- /eject:replace --> */}
  </div>
);
Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  // <!-- eject:remove -->
  size: PropTypes.string,
  // <!-- /eject:remove -->
};
// <!-- eject:remove -->
Loader.defaultProps = {
  size: 'default',
};
// <!-- /eject:remove -->
export default injectSheet(styles)(Loader);
