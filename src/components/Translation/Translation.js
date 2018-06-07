import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { gUuidV4 } from '../../utils';
import { INTL_LOCALE } from '../../config';

export default class Translation extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string,
    values: PropTypes.object,
  };
  static defaultProps = {
    id: '',
    values: {},
  };
  constructor(props) {
    super(props);
    this.state = { id: props.id || props.children || gUuidV4(), message: '' };
  }
  componentWillMount() {
    this.updateMessage(this.props.children).then(message =>
      this.setState({ message }));
  }
  componentWillReceiveProps({ id: nextId, children: nextChildren }) {
    let id;
    if (nextId && nextId !== this.state.id) {
      id = nextId;
    }
    if (nextChildren !== this.props.children) {
      this.updateMessage(nextChildren).then(message =>
        this.setState({
          id,
          message,
        }));
    } else if (id) {
      this.setState({
        id,
      });
    }
  }
  updateMessage = async (message) => {
    if (!message) {
      return '';
    }
    const locale = INTL_LOCALE;
    if (
      !window.intlCache ||
      !window.intlCache[INTL_LOCALE] ||
      !window.intlCache[INTL_LOCALE][message]
    ) {
      window.intlCache = window.intlCache || {
        [INTL_LOCALE]: {},
      };
      const { default: localeData } = await import(`../../intl/${locale}.js`);
      window.intlCache[INTL_LOCALE] = localeData;
    }
    return window.intlCache[INTL_LOCALE][message] || message;
  };
  render() {
    const { children, id, ...props } = this.props;
    return (
      <FormattedMessage
        defaultMessage={this.state.message}
        {...props}
        id={this.state.id}
      />
    );
  }
}
