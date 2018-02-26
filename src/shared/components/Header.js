import React from 'react';
import { Nav, NavDropdown, MenuItem, Navbar, NavItem } from 'react-bootstrap';
class Header extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">INDEX</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown eventKey={1} title="Search">
            <MenuItem eventKey={1.1}>Used & New Cars</MenuItem>
            <MenuItem eventKey={1.2}>Motorcycles</MenuItem>
            <MenuItem eventKey={1.3}>Motorhomes & Caravans</MenuItem>
            <MenuItem eventKey={1.4}>
              Trucks, Commercial & Utility Vehicle
            </MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={2} title="Sell">
            <MenuItem eventKey={2.1}>Cars</MenuItem>
            <MenuItem eventKey={2.2}>Motorcycles</MenuItem>
            <MenuItem eventKey={2.3}>Motorhomes & Caravans</MenuItem>
            <MenuItem eventKey={2.4}>
              Trucks, Commercial & Utility Vehicle
            </MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            Favorite
          </NavItem>
          <NavItem eventKey={4} href="#">
            Login
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
