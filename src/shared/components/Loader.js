import React from 'react';
import { Spin } from 'antd';
const Loader = size => {
  return (
    <div className="loader">
      <Spin tip="Loading..." size={size} />
    </div>
  );
};

export default Loader;
