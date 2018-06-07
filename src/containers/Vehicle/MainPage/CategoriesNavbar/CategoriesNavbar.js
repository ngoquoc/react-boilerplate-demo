/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import {
  MOCK_CAR_MENU_DATA,
  MOTOR_BIKES_MENU_DATA,
  MOCK_MOTOR_HOMES_MENU_DATA,
  MOCK_TRUCKS_MENU_DATA,
} from '../../../../mockData';

const CarMenuItems = () =>
  MOCK_CAR_MENU_DATA.map(item => (
    <Menu.Item className="ant-col-6" key={`1.${item.id}`}>
      {item}
    </Menu.Item>
  ));
const MotorbikesMenuItems = () =>
  MOTOR_BIKES_MENU_DATA.map(item => (
    <Menu.Item className="ant-col-6" key={`2.${item.id}`}>
      {item}
    </Menu.Item>
  ));
const MotorhomesMenuItems = () =>
  MOCK_MOTOR_HOMES_MENU_DATA.map(item => (
    <Menu.Item className="ant-col-6" key={`3.${item.id}`}>
      {item}
    </Menu.Item>
  ));
const TrucksMenuItems = () =>
  MOCK_TRUCKS_MENU_DATA.map(item => (
    <Menu.Item className="ant-col-6" key={`4.${item.id}`}>
      {item}
    </Menu.Item>
  ));
const OthersMenuItems = () =>
  MOCK_CAR_MENU_DATA.map(item => (
    <Menu.Item className="ant-col-6" key={`5.${item.id}`}>
      {item}
    </Menu.Item>
  ));

const CategoriesNavbar = () => (
  <div className="categories-navbar">
    <Menu
      mode="horizontal"
      selectable={false}
      style={{ lineHeight: '64px' }}
      className="pull-right"
    >
      <Menu.SubMenu title="Car">
        <Menu.ItemGroup className="ant-row" title={<a>View all cars</a>}>
          {CarMenuItems()}
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title="Motorbikes">
        <Menu.ItemGroup className="ant-row" title={<a>View all motorbikes</a>}>
          {MotorbikesMenuItems()}
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title="Motorhomes">
        <Menu.ItemGroup
          className="ant-row"
          title={<a>View all motorhomes & vans</a>}
        >
          {MotorhomesMenuItems()}
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title="Trucks">
        <Menu.ItemGroup className="ant-row" title={<a>View all Trucks</a>}>
          {TrucksMenuItems()}
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title="Others">
        <Menu.ItemGroup className="ant-row" title={<a>View all Others</a>}>
          {OthersMenuItems()}
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  </div>
);
export default CategoriesNavbar;
