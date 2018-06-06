import React from 'react';
import { connect } from 'react-redux';
import { authenticated } from '../../utils';
export default function(Comp) {
  class UnauthenticatedComponent extends React.Component {
    state = { authenticated: false };
    componentWillMount() {
      authenticated().then(isAuthenticated => {
        this.setState({
          authenticated: isAuthenticated
        });
      });
    }
    componentWillReceiveProps({ users: nextUsers, me: nextMe }) {
      const { users, me } = this.props;
      if (nextUsers !== users || nextMe !== me) {
        authenticated().then(isAuthenticated => {
          this.setState({
            authenticated: isAuthenticated
          });
        });
      }
    }
    render() {
      return !this.state.authenticated ? <Comp {...this.props} /> : null;
    }
  }
  return connect(({ user: { users, me } }) => ({ users, me }))(
    UnauthenticatedComponent
  );
}
