import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { Loader } from 'shared/components';
import CarItemDetail from './CarItemDetail';

const propsTypes = { mostview: PropTypes.object, latest: PropTypes.object };
class CarListContainer extends Component {
  renderMostview() {
    return this.props.mostview.Data.map(item => {
      return <CarItemDetail item={item} />;
    });
  }
  renderLatest() {
    return this.props.latest.Data.map(item => {
      return <CarItemDetail item={item} />;
    });
  }
  render() {
    const { mostview, latest } = this.props;
    return (
      <div className="car-list-container">
        <Tabs type="card">
          <Tabs.TabPane tab="Most viewed" key="1">
            {mostview && mostview.Data ? this.renderMostview() : <Loader />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Latest" key="2">
            {latest && latest.Data ? this.renderLatest() : <Loader />}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

CarListContainer.propsTypes = propsTypes;

export default CarListContainer;
