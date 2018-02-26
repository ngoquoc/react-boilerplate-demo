import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export const CategoriesNavbar = () => {
  return (
    <div className="categories-navbar">
      <Navbar collapseOnSelect>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Car
            </NavItem>
            <NavItem eventKey={2} href="#">
              Motorbikes
            </NavItem>
            <NavItem eventKey={2} href="#">
              Motorhomes
            </NavItem>
            <NavItem eventKey={2} href="#">
              Trucks
            </NavItem>
            <NavItem eventKey={2} href="#">
              Others
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
