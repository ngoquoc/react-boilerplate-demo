import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Divider } from 'antd';
import injectSheet from 'react-jss';
import { Loader } from '../../../../components';
import VehicleItemDetail from '../VehicleItemDetail';
import styles from './vehicleList.style';
const propsTypes = {
  mostView: PropTypes.array,
  latest: PropTypes.array,
  onFavoriteClick: PropTypes.func.isRequired
};
const renderVehicleList = data => {
  return data.map((item, index) => {
    return (
      <div key={index}>
        <VehicleItemDetail
          item={item}
          onFavoriteClick={this.props.onFavoriteClick}
        />
        <Divider />
      </div>
    );
  });
};
const VehicleList = ({ mostView, latest, classes }) => {
  return (
    <div className={classes.carListContainer}>
      <Tabs type="card">
        <Tabs.TabPane tab="Most viewed" key="1">
          {mostView ? renderVehicleList(mostView) : <Loader />}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Latest" key="2">
          {latest ? renderVehicleList(latest) : <Loader />}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

VehicleList.propsTypes = propsTypes;

export default injectSheet(styles)(VehicleList);
