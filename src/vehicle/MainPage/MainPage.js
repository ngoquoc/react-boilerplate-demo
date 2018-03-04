import React from 'react';
import {
  Header,
  CategoriesNavbar,
  SearchVehicle,
  VehicleListContainer,
} from './components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as mainPageActions from './actions';
import { toggleFavorite } from '../localStorage/actions';
import {
  getVehicleMostViewWithFavorite,
  getVehicleLatestWithFavorite,
} from 'selectors';
import './MainPage.scss';

const propTypes = {
  mostView: PropTypes.array,
  latest: PropTypes.array,
  fetchMostviewData: PropTypes.func,
  fetchLatestData: PropTypes.func,
  toggleFavorite: PropTypes.func,
};

class MainPage extends React.Component {
  componentWillMount() {
    this.props.fetchMostviewData(1);
    this.props.fetchLatestData(1);
  }

  handleFavoriteClick = product => {
    this.props.toggleFavorite(product.ID);
  };

  handleSearchSubmit = values => {
    console.log(values);
  };

  render() {
    const { mostView, latest } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <CategoriesNavbar />
          <SearchVehicle onSubmit={this.handleSearchSubmit} />
          <VehicleListContainer
            mostView={mostView}
            latest={latest}
            onFavoriteClick={this.handleFavoriteClick}
          />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = propTypes;

export default connect(
  state => ({
    mostView: getVehicleMostViewWithFavorite(state),
    latest: getVehicleLatestWithFavorite(state),
  }),
  {
    ...mainPageActions,
    toggleFavorite,
  },
)(MainPage);
