import React from 'react';
import {
  Header,
  CategoriesNavbar,
  SearchCar,
  CarListContainer,
} from './components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as mainPageActions from './actions';
import { getVehicleMainpage } from 'selectors';
import './MainPage.scss';

const propTypes = {
  mostview: PropTypes.object,
  fetchMostviewData: PropTypes.func,
};

class MainPage extends React.Component {
  componentWillMount() {
    this.props.fetchMostviewData();
  }

  render() {
    const { mostview } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <CategoriesNavbar />
          <SearchCar />
          <CarListContainer mostview={mostview} />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = propTypes;

export default connect(state => getVehicleMainpage(state), {
  fetchMostviewData: mainPageActions.fetchMostviewData,
})(MainPage);
