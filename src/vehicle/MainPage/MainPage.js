import React from 'react';
import {
  Header,
  CategoriesNavbar,
  SearchCar,
  CarListContainer,
} from './components';
import './MainPage.scss';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <CategoriesNavbar />
          <SearchCar />
          <CarListContainer />
        </div>
      </div>
    );
  }
}

export default MainPage;
