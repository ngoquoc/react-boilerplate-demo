import React from 'react';
import { Header } from './Header';
import { CategoriesNavbar } from './CategoriesNavbar';
import { SearchCar } from './SearchCar';
import './MainPage.scss';

export class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <CategoriesNavbar />
          <SearchCar />
        </div>
      </div>
    );
  }
}
