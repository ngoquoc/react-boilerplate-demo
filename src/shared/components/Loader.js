import React from 'react';
import { Spin } from 'antd';
const Loader = ({ size = 'default' }) => {
  return (
    <div className="loader">
      <Spin tip="Loading..." size={size} />
    </div>
  );
};

export default Loader;
