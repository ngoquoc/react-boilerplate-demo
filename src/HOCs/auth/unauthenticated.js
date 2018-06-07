import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticated } from '../../utils';

export default function (Comp) {
  class UnauthenticatedComponent extends React.Component {
    static propTypes = {
      users: PropTypes.arrayOf(PropTypes.object).isRequired,
      me: PropTypes.string.isRequired,
    };
    state = { authenticated: false };
    componentWillMount() {
      authenticated().then((isAuthenticated) => {
        this.setState({
          authenticated: isAuthenticated,
        });
      });
    }
    componentWillReceiveProps({ users: nextUsers, me: nextMe }) {
      const { users, me } = this.props;
      if (nextUsers !== users || nextMe !== me) {
        authenticated().then((isAuthenticated) => {
          this.setState({
            authenticated: isAuthenticated,
          });
        });
      }
    }
    render() {
      return !this.state.authenticated ? <Comp {...this.props} /> : null;
    }
  }
  return connect(({ user: { users, me } }) => ({ users, me }))(UnauthenticatedComponent);
}
