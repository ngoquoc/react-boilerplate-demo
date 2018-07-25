import React from 'react';
import { injectIntl } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { INTL_LOCALE } from '../../config';

export default function (translation) {
  return (Comp) => {
    class TranslatableComponent extends React.Component {
      static propTypes = {
        intl: PropTypes.object.isRequired,
        updateLanguage: PropTypes.func.isRequired,
      };
      state = {
        translation,
      };
      componentWillMount() {
        if (this.state.translation) {
          const keys = Object.keys(this.state.translation);
          Promise.all(keys.map(key => this.translate(this.state.translation[key]))).then((translated) => {
            this.setState({
              translation: translated.reduce(
                (result, value, index) => ({
                  ...result,
                  [keys[index]]: value,
                }),
                {}
              ),
            });
          });
        }
      }
      componentWillReceiveProps({ intl }) {
        if (Object.keys(intl.messages).length) {
          this.intlLoadDone();
        }
      }
      intlLoaded = new Promise(async (resolve) => {
        this.intlLoadDone = resolve;
        const locale = INTL_LOCALE;
        const { intl, updateLanguage } = this.props;
        if (!Object.keys(intl.messages).length) {
          const { default: messages } = await import(`../../intl/${locale}.js`);
          updateLanguage({
            locale: intl.locale,
            messages,
          });
        } else {
          resolve();
        }
      });
      translate = async (message, values) => {
        const defaultMessage = await this.updateMessage(message);
        const { intl } = this.props;
        const msg = {
          id: message,
          defaultMessage,
        };
        return intl.formatMessage(msg, values);
      };
      updateMessage = async (message) => {
        if (!message) {
          return '';
        }
        await this.intlLoaded;
        const { intl } = this.props;
        return intl.messages[message] || message;
      };
      render() {
        const { intl, ...props } = this.props;
        return (
          <Comp
            {...props}
            translate={this.translate}
            translation={this.state.translation}
          />
        );
      }
    }
    return injectIntl(connect(
      undefined,
      { updateLanguage: updateIntl }
    )(TranslatableComponent));
  };
}
