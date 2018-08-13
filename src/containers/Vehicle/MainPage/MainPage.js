import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import CategoriesNavbar from './CategoriesNavbar';
import Header from './Header';
import SearchVehicle from './SearchVehicle';
import VehicleList from './VehicleList';
import { fetchMostviewData, fetchLatestData } from '../vehicle.ducks';
import {
  getVehicles,
  getVehicleMostViewWithFavorite,
  getVehicleLatestWithFavorite,
} from '../selectors';
import styles from './mainPage.styles';

class MainPage extends React.Component {
  static propTypes = {
    mostView: PropTypes.array,
    latest: PropTypes.array,
    fetchMostviewData: PropTypes.func,
    fetchLatestData: PropTypes.func,
    vehicles: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    mostView: [],
    latest: [],
    vehicles: [],
    fetchMostviewData: null,
    fetchLatestData: null,
  };

  componentWillMount() {
    const { vehicles, fetchMostviewData, fetchLatestData } = this.props;
    fetchMostviewData({ vehicles, page: 1 });
    fetchLatestData({ vehicles, page: 1 });
  }
  handleFavoriteClick = () => {};

  handleSearchSubmit = (values) => {
    console.log(values);
  };

  render() {
    const { mostView, latest, classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.container}>
          <CategoriesNavbar />
          <SearchVehicle onSubmit={this.handleSearchSubmit} />
          <VehicleList
            mostView={mostView}
            latest={latest}
            onFavoriteClick={this.handleFavoriteClick}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    mostView: getVehicleMostViewWithFavorite(state),
    latest: getVehicleLatestWithFavorite(state),
    vehicles: getVehicles(state),
  }),
  {
    fetchMostviewData,
    fetchLatestData,
  }
)(injectSheet(styles)(MainPage));
