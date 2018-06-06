import React from 'react';
import { injectIntl } from 'react-intl';
import { INTL_LOCALE } from '../../config';
export default function(Comp) {
  class TranslatableComponent extends React.Component {
    updateMessage = async message => {
      if (!message) {
        return '';
      }
      const locale = INTL_LOCALE;
      if (
        !window._intl ||
        !window._intl[INTL_LOCALE] ||
        !window._intl[INTL_LOCALE][message]
      ) {
        window._intl = window._intl || {
          [INTL_LOCALE]: {}
        };
        const { default: localeData } = await import(`../../intl/${locale}.js`);
        window._intl[INTL_LOCALE] = localeData;
      }
      return window._intl[INTL_LOCALE][message] || message;
    };
    render() {
      return (
        <Comp
          {...this.props}
          translate={async (message, values) => {
            const { intl } = this.props;
            const defaultMessage = await this.updateMessage(message);
            const msg = {
              id: message,
              defaultMessage
            };
            return intl.formatMessage(msg, values);
          }}
        />
      );
    }
  }
  return injectIntl(TranslatableComponent);
}
