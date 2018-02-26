import React from 'react';
import { Menu, Row, Col } from 'antd';
export const CategoriesNavbar = () => {
  return (
    <div className="categories-navbar">
      <Menu
        mode="horizontal"
        selectable={false}
        style={{ lineHeight: '64px' }}
        className="pull-right"
      >
        <Menu.SubMenu title="Car">
          <Menu.ItemGroup title={<a href="#">View all cars</a>}>
            <Row gutter={12}>
              <Col span={3}>
                <Menu.Item key="1.1">Small Car</Menu.Item>
              </Col>
              <Col span={3}>
                <Menu.Item key="1.2">Small Car</Menu.Item>
              </Col>
              <Col span={3}>
                <Menu.Item key="1.3">Small Car</Menu.Item>
              </Col>
            </Row>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item key="2">Motorbikes</Menu.Item>
        <Menu.Item key="3">Motorhomes</Menu.Item>
        <Menu.Item key="4">Trucks</Menu.Item>
        <Menu.Item key="5">Others</Menu.Item>
      </Menu>
    </div>
  );
};
