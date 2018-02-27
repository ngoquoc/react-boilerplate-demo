import React from 'react';
import { Row, Col, Button } from 'antd';
const CarItemDetail = () => {
  return (
    <Row gutter={12} className="car-item-detail">
      <Col span={6}>
        <img src="/assets/no-image.jpg" />
      </Col>
      <Col span={8} className="car-info">
        <span className="h4 title">
          Audi S5 Sportback 3.0 TFSI qu. tiptr. MATRIX S-SITZE
        </span>
        <div className="info">
          FR 06/2017, 6,825 km, 260 kW (354 PS) Saloon, Petrol, Automatic
          transmission, HU 06/2020, 4/5 Doors ≈ 7.4 l/100km (comb.), ≈ 170 g
          CO₂/km (comb.)
        </div>
      </Col>
      <Col span={4} className="price">
        <span class="h4">€59,950</span>
      </Col>
      <Col span={6} className="vendor-info">
        <span className="h4 vendor-name">Audi</span>
        <div>Adress: ...</div>
      </Col>
      <div className="action-box">
        <Button type="primary">Contact</Button>
        <Button icon="star">Mark as favorite</Button>
      </div>
    </Row>
  );
};

export default CarItemDetail;
