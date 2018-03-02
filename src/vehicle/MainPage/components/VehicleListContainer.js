import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Divider } from 'antd';
import { Loader } from 'shared/components';
import VehicleItemDetail from './VehicleItemDetail';

const propsTypes = { mostview: PropTypes.object, latest: PropTypes.object };
class VehicleListContainer extends Component {
  renderVehicleList(data) {
    return data.map((item, index) => {
      return (
        <div>
          <VehicleItemDetail item={item} key={index} />
          <Divider />
        </div>
      );
    });
  }
  render() {
    const { mostview, latest } = this.props;
    return (
      <div className="car-list-container">
        <Tabs type="card">
          <Tabs.TabPane tab="Most viewed" key="1">
            {mostview && mostview.Data ? (
              this.renderVehicleList(mostview.Data)
            ) : (
              <Loader />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Latest" key="2">
            {latest && latest.Data ? (
              this.renderVehicleList(latest.Data)
            ) : (
              <Loader />
            )}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

VehicleListContainer.propsTypes = propsTypes;

export default VehicleListContainer;
