import React from 'react';
import { Spin } from 'antd';
import injectSheet from 'react-jss';
import styles from './loader.styles';
const Loader = ({ classes, size = 'default' }) => {
  return (
    <div className={classes.loader}>
      <Spin tip="Loading..." size={size} />
    </div>
  );
};

export default injectSheet(styles)(Loader);
