import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Divider } from 'antd';
import { Loader } from 'shared/components';
import VehicleItemDetail from './VehicleItemDetail';

const propsTypes = {
  mostView: PropTypes.array,
  latest: PropTypes.array,
  onFavoriteClick: PropTypes.func.isRequired,
};
class VehicleListContainer extends Component {
  renderVehicleList(data) {
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
  }
  render() {
    const { mostView, latest } = this.props;
    return (
      <div className="car-list-container">
        <Tabs type="card">
          <Tabs.TabPane tab="Most viewed" key="1">
            {mostView ? this.renderVehicleList(mostView) : <Loader />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Latest" key="2">
            {latest ? this.renderVehicleList(latest) : <Loader />}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

VehicleListContainer.propsTypes = propsTypes;

export default VehicleListContainer;
