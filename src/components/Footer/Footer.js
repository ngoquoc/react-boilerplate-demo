import React from 'react';
import { Layout } from 'antd';
import injectSheet from 'react-jss';
import styles from './footer.styles';

const Footer = () => (
  <Layout.Footer style={{ textAlign: 'center' }}>
      Index Oglasi ©2018 Created by 2Click Solutions
  </Layout.Footer>
);

export default injectSheet(styles)(Footer);
