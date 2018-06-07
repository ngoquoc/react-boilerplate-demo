import React from 'react';
import { Spin } from 'antd';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './loader.styles';

const Loader = ({ classes, size }) => (
  <div className={classes.loader}>
    <Spin tip="Loading..." size={size} />
  </div>
);
Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.string,
};
Loader.defaultProps = {
  size: 'default',
};
export default injectSheet(styles)(Loader);
