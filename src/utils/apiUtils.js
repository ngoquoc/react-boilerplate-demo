import { CACHEABLE_APIS, DEFAULT_API_FETCH_TIMEOUT, REST_API } from '../config';
import { MOCK_LOGGED_IN } from '../mockData/apiData';

const RESULT_CACHES = {};
const FETCHING = {};

function isFetching(api) {
  return FETCHING[api];
}

function fetched(api) {
  FETCHING[api] = false;
}

function updateCachedResult(api, data) {
  RESULT_CACHES[api] = data;
  fetched(api);
  FETCHING[api] = undefined;
}

function fetching(api, callback) {
  FETCHING[api] = callback().then((result) => {
    updateCachedResult(api, result);
    return result;
  });
}

function getCachedResult(api, callback) {
  const deferredFetching = isFetching(api);
  if (typeof RESULT_CACHES[api] === 'undefined' && !deferredFetching) {
    fetching(api, callback);
    return isFetching(api);
  }
  if (deferredFetching) {
    return deferredFetching;
  }
  return Promise.resolve(RESULT_CACHES[api]);
}

function isCacheable(api) {
  return CACHEABLE_APIS.indexOf(api) !== -1;
}

function fetchWithTimeout(args, timeout = DEFAULT_API_FETCH_TIMEOUT) {
  return new Promise((resolve, reject) => {
    let timedOut = false;
    const fetchTimeout = setTimeout(() => {
      timedOut = true;
      resolve(new Response(new Blob(), {
        status: 500,
        statusText: '[[[Request timed out]]]',
      }));
    }, timeout);
    return fetch(...args).then((response) => {
      if (timedOut) {
        return;
      }
      clearTimeout(fetchTimeout);
      resolve(response);
    }, reject);
  });
}

const handleErrors = (response) => {
  if (!response.ok) {
    try {
      if (response.status === 403) {
        // this is custom fallback where action is forbidden because of unauthorized access
        // 403 is used so that popup for login data is not shown
        response
          .json()
          .then((res) => {
            window.location.href = decodeURIComponent(res.redirectURL);
          })
          .catch((error) => {
            console.error('Error', error);
          });
      } else {
        response
          .json()
          .then((error) => {
            if (error.message) {
              console.error('Error', error.message);
            } else {
              console.error('Error', 'Unexpected error happened');
            }
          })
          .catch((error) => {
            console.error('Error', error);
          });
      }
      return Promise.reject(response);
    } catch (error) {
      return Promise.reject(response);
    }
  }
  return response;
};

const buildURL = (path = null) => [REST_API, path].join('/');

// Default options used for every request
const defaultOptions = {
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

/**
 * @function post
 * @description Make a POST request.
 * @param {string} path
 * @param {object} body
 * @param {object} options
 * @returns {promise}
 */
export const apiPost = (path, body, options = {}) =>
  fetchWithTimeout(
    [
      buildURL(path),
      Object.assign(options, defaultOptions, {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    ],
    options.timeout
  ).then(handleErrors);

/**
 * @function get
 * @description Make a GET request.
 * @param {string} path
 * @param {object} options
 * @returns {promise}
 */
export const apiGet = (path, options = {}) => {
  const cacheable = isCacheable(path);
  const fetchAPI = () =>
    fetchWithTimeout(
      [
        buildURL(path),
        Object.assign(options, defaultOptions, { method: 'GET' }),
      ],
      options.timeout
    ).then(handleErrors);
  return !options.forceUpdate && cacheable
    ? getCachedResult(path, fetchAPI)
    : fetchAPI();
};

/**
 * @function edit
 * @description Make a PUT request.
 * @param {string} path
 * @param {object} body
 * @param {object} options
 * @returns {promise}
 */
export const apiPut = (path, body, options = {}) =>
  fetchWithTimeout(
    [buildURL(path), Object.assign(options, defaultOptions, { method: 'PUT' })],
    options.timeout
  ).then(handleErrors);

/**
 * @function delete
 * @description Make a DELETE request.
 * @param {string} path
 * @param {object} options
 * @returns {promise}
 */
export const apiDelete = (path, options = {}) =>
  fetchWithTimeout(
    [
      buildURL(path),
      Object.assign(options, defaultOptions, { method: 'DELETE' }),
    ],
    options.timeout
  ).then(handleErrors);

export const authenticated = () =>
  // TODO: implement authentication and authentication checking
  Promise.resolve(MOCK_LOGGED_IN);
