// <!-- eject:remove -->
import config from 'config.json';
// <!-- /eject:remove -->
export const CACHEABLE_APIS = [];
export const DEFAULT_API_FETCH_TIMEOUT = 10000;
// <!-- eject:replace with='export const REST_API = ${&#39;}/${&#39;};' -->
export const REST_API = config.apiServer;
// <!-- /eject:replace -->
export const THEME_CONFIG = {
  // <!-- eject:remove -->
  panelColor: '#f8f8f8',
  bgColor: 'orange',
  primaryColor: '#1890ff',
  primaryLightColor: '#e5f7ff',
  black: '#001529',
  white: '#fff',
  defaultPadding: 24,
  // <!-- /eject:remove -->
};
// <!-- eject:remove if='!args.multilingual' -->
export const INTL_LOCALE =
  navigator.language || navigator.browserLanguage || 'en-US';
// <!-- /eject:remove -->
