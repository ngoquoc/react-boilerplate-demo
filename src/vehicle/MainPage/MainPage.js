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
import { getVehicleMainpage } from 'selectors';
import './MainPage.scss';

const propTypes = {
  mostview: PropTypes.object,
  fetchMostviewData: PropTypes.func,
};

class MainPage extends React.Component {
  componentWillMount() {
    this.props.fetchMostviewData(1);
    this.props.fetchLatestData(1);
  }

  render() {
    const { mostview, latest } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <CategoriesNavbar />
          <SearchVehicle />
          <VehicleListContainer mostview={mostview} latest={latest} />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = propTypes;

export default connect(state => getVehicleMainpage(state), {
  ...mainPageActions,
})(MainPage);
