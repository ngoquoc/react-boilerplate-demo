import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { updateIntl } from 'react-intl-redux';
import { connect } from 'react-redux';
import { gUuidV4 } from '../../utils';
import { INTL_LOCALE } from '../../config';

class Translation extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string,
    values: PropTypes.object,
    intlState: PropTypes.object.isRequired,
    updateLanguage: PropTypes.func.isRequired,
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
  componentWillReceiveProps({ id: nextId, children: nextChildren, intlState }) {
    if (Object.keys(intlState.messages).length) {
      this.intlLoadDone();
    }
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
  intlLoaded = new Promise(async (resolve) => {
    this.intlLoadDone = resolve;
    const locale = INTL_LOCALE;
    const { intlState, updateLanguage } = this.props;
    if (!Object.keys(intlState.messages).length) {
      const { default: messages } = await import(`../../intl/${locale}.js`);
      updateLanguage({
        ...intlState,
        messages,
      });
    } else {
      resolve();
    }
  });
  updateMessage = async (message) => {
    if (!message) {
      return '';
    }
    await this.intlLoaded;
    const { intlState } = this.props;
    return intlState.messages[message] || message;
  };
  render() {
    const {
      intlState, children, updateLanguage, id, ...props
    } = this.props;
    return !this.state.message ? (
      this.state.id
    ) : (
      <FormattedMessage
        defaultMessage={this.state.message}
        {...props}
        id={this.state.id}
      />
    );
  }
}
export default connect(
  state => ({ intlState: state.intl }),
  { updateLanguage: updateIntl }
)(Translation);
