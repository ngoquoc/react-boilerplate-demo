import React, { Component } from 'react';
import { Tabs } from 'antd';
import CarItemDetail from './CarItemDetail';
class CarListContainer extends Component {
  render() {
    return (
      <div className="car-list-container">
        <Tabs type="card">
          <Tabs.TabPane tab="Most viewed" key="1">
            <CarItemDetail />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Latest" key="2">
            <CarItemDetail />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default CarListContainer;
