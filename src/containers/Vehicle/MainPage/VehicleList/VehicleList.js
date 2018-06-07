import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Divider } from 'antd';
import injectSheet from 'react-jss';
import { Loader } from '../../../../components';
import VehicleItemDetail from '../VehicleItemDetail';
import styles from './vehicleList.style';

const propTypes = {
  mostView: PropTypes.array,
  latest: PropTypes.array,
  onFavoriteClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const renderVehicleList = (data, props) =>
  data.map(item => (
    <div key={item.id}>
      <VehicleItemDetail item={item} onFavoriteClick={props.onFavoriteClick} />
      <Divider />
    </div>
  ));
const VehicleList = ({
  mostView, latest, classes, ...props
}) => (
  <div className={classes.carListContainer}>
    <Tabs type="card">
      <Tabs.TabPane tab="Most viewed" key="1">
        {mostView ? renderVehicleList(mostView, props) : <Loader />}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Latest" key="2">
        {latest ? renderVehicleList(latest, props) : <Loader />}
      </Tabs.TabPane>
    </Tabs>
  </div>
);

VehicleList.propTypes = propTypes;
VehicleList.defaultProps = {
  mostView: [],
  latest: [],
};

export default injectSheet(styles)(VehicleList);
