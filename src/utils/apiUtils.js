import config from 'config';

const Network = resource => {
  let buildURL = (path = null) => {
    return [config.apiServer, config.restApi, path].join('/');
  };

  // Default options used for every request
  const defaultOptions = {
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return {
    /**
     * @function post
     * @description Make a POST request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    post: (path, body, options = {}) => {
      return fetch(
        buildURL(path),
        Object.assign(options, defaultOptions, {
          method: 'POST',
          body: JSON.stringify(body),
        }),
      );
    },

    /**
     * @function post
     * @description Make a GET request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    get: (path, options = {}) => {
      return fetch(
        buildURL(path),
        Object.assign(options, defaultOptions, { method: 'GET' }),
      );
    },

    /**
     * @function edit
     * @description Make a PUT request.
     * @param {string} path
     * @param {object} body
     * @param {object} options
     * @returns {promise}
     */
    edit: (path, body, options = {}) => {
      return fetch(
        buildURL(path),
        Object.assign(options, defaultOptions, { method: 'PUT' }),
      );
    },

    /**
     * @function delete
     * @description Make a DELETE request.
     * @param {string} path
     * @param {object} options
     * @returns {promise}
     */
    delete: (path, options = {}) => {
      return fetch(
        buildURL(path),
        Object.assign(options, defaultOptions, { method: 'DELETE' }),
      );
    },
  };
};

export default Network;
