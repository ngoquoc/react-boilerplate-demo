import React from 'react';
import { Header, CategoriesNavbar, SearchCar } from './components';
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
