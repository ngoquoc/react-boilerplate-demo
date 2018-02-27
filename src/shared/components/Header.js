import React from 'react';
// import { Nav, NavDropdown, MenuItem, Navbar, NavItem } from 'react-bootstrap';
import { Layout, Menu } from 'antd';
class Header extends React.Component {
  render() {
    return (
      <Layout.Header>
        <div
          className="logo"
          style={{
            background:
              'url(assets/index_oglasi_logo.svg) no-repeat top center',
            backgroundSize: 'auto 20px',
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ lineHeight: '64px' }}
          className="pull-right"
        >
          <Menu.SubMenu key="1" title="Search">
            <Menu.Item key="1.1">Used & New Cars</Menu.Item>
            <Menu.Item key="1.2">Motorcycles</Menu.Item>
            <Menu.Item key="1.3">Motorhomes & Caravans</Menu.Item>
            <Menu.Item key="1.4">
              Trucks, Commercial & Utility Vehicle
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="2" title="Sell">
            <Menu.Item key="2.1">Cars</Menu.Item>
            <Menu.Item key="2.2">Motorcycles</Menu.Item>
            <Menu.Item key="2.3">Motorhomes & Caravans</Menu.Item>
            <Menu.Item key="2.4">
              Trucks, Commercial & Utility Vehicle
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="3">Favorite</Menu.Item>
          <Menu.Item key="4">Login</Menu.Item>
        </Menu>
      </Layout.Header>
      // <Navbar fixedTop>
      //   <Navbar.Header>
      //     <Navbar.Brand>
      //       <a href="#home">INDEX</a>
      //     </Navbar.Brand>
      //   </Navbar.Header>
      //   <Nav pullRight>
      //     <NavDropdown eventKey={1} title="Search">
      //       <MenuItem eventKey={1.1}>Used & New Cars</MenuItem>
      //       <MenuItem eventKey={1.2}>Motorcycles</MenuItem>
      //       <MenuItem eventKey={1.3}>Motorhomes & Caravans</MenuItem>
      //       <MenuItem eventKey={1.4}>
      //         Trucks, Commercial & Utility Vehicle
      //       </MenuItem>
      //     </NavDropdown>
      //     <NavDropdown eventKey={2} title="Sell">
      //       <MenuItem eventKey={2.1}>Cars</MenuItem>
      //       <MenuItem eventKey={2.2}>Motorcycles</MenuItem>
      //       <MenuItem eventKey={2.3}>Motorhomes & Caravans</MenuItem>
      //       <MenuItem eventKey={2.4}>
      //         Trucks, Commercial & Utility Vehicle
      //       </MenuItem>
      //     </NavDropdown>
      //     <NavItem eventKey={3} href="#">
      //       Favorite
      //     </NavItem>
      //     <NavItem eventKey={4} href="#">
      //       Login
      //     </NavItem>
      //   </Nav>
      // </Navbar>
    );
  }
}

export default Header;
