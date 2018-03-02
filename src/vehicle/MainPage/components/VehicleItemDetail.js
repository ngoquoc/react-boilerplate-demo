import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import { toMoneyFormat } from 'utils';
const propTypes = { item: PropTypes.object };
const VehicleItemDetail = ({ item }) => {
  return (
    <Row gutter={12} className="car-item-detail">
      <Col span={6}>
        <img src={item.ImageLink ? item.ImageLink : 'assets/no-image.jpg'} />
      </Col>
      <Col span={8} className="car-info">
        <span className="h4 title">{item.Title}</span>
        <div className="info">Make: {item.Make}</div>
        <div className="info">Model: {item.Model}</div>
        <div className="info">{item.OtherDescription}</div>
      </Col>
      <Col span={4} className="price">
        <span className="h4">{toMoneyFormat(item.MainPrice)} €</span>
      </Col>
      <Col span={6} className="vendor-info">
        <span className="h4 vendor-name">{item.SeoName}</span>
        <div>Adress: {item.Address}</div>
      </Col>
      <div className="action-box">
        <Button type="primary">Contact</Button>
        <Button icon="star">Mark as favorite</Button>
      </div>
    </Row>
  );
};

VehicleItemDetail.propTypes = propTypes;

export default VehicleItemDetail;
