import React from 'react';
import { Menu } from 'antd';
import {
  CarMenuData,
  MotorbikesMenuData,
  MotorhomesMenuData,
  TrucksMenuData,
} from 'shared/constants/api-data';

const CarMenuItems = () => {
  return CarMenuData.map((item, index) => {
    return (
      <Menu.Item className="ant-col-6" key={`1.${index}`}>
        {item}
      </Menu.Item>
    );
  });
};
const MotorbikesMenuItems = () => {
  return MotorbikesMenuData.map((item, index) => {
    return (
      <Menu.Item className="ant-col-6" key={`2.${index}`}>
        {item}
      </Menu.Item>
    );
  });
};
const MotorhomesMenuItems = () => {
  return MotorhomesMenuData.map((item, index) => {
    return (
      <Menu.Item className="ant-col-6" key={`3.${index}`}>
        {item}
      </Menu.Item>
    );
  });
};
const TrucksMenuItems = () => {
  return TrucksMenuData.map((item, index) => {
    return (
      <Menu.Item className="ant-col-6" key={`4.${index}`}>
        {item}
      </Menu.Item>
    );
  });
};
const OthersMenuItems = () => {
  return CarMenuData.map((item, index) => {
    return (
      <Menu.Item className="ant-col-6" key={`5.${index}`}>
        {item}
      </Menu.Item>
    );
  });
};

const CategoriesNavbar = () => {
  return (
    <div className="categories-navbar">
      <Menu
        mode="horizontal"
        selectable={false}
        style={{ lineHeight: '64px' }}
        className="pull-right"
      >
        <Menu.SubMenu title="Car">
          <Menu.ItemGroup
            className="ant-row"
            title={<a href="#">View all cars</a>}
          >
            {CarMenuItems()}
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu title="Motorbikes">
          <Menu.ItemGroup
            className="ant-row"
            title={<a href="#">View all motorbikes</a>}
          >
            {MotorbikesMenuItems()}
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu title="Motorhomes">
          <Menu.ItemGroup
            className="ant-row"
            title={<a href="#">View all motorhomes & vans</a>}
          >
            {MotorhomesMenuItems()}
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu title="Trucks">
          <Menu.ItemGroup
            className="ant-row"
            title={<a href="#">View all Trucks</a>}
          >
            {TrucksMenuItems()}
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.SubMenu title="Others">
          <Menu.ItemGroup
            className="ant-row"
            title={<a href="#">View all Others</a>}
          >
            {OthersMenuItems()}
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
export default CategoriesNavbar;
