import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVehicleLocalStorage } from 'selectors';
import { loadFavorites } from './actions';
const propTypes = { loadFavorites: PropTypes.func };

class LocalStorage extends Component {
  componentWillMount() {
    this.props.loadFavorites();
  }
  render() {
    return <div />;
  }
}

LocalStorage.propTypes = propTypes;

export default connect(state => getVehicleLocalStorage(state), {
  loadFavorites: loadFavorites,
})(LocalStorage);
