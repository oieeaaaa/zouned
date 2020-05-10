import fetch from 'node-fetch';

export default (url, options = {}) => {
  const baseUrl = `/api/${url}`;

  // custom options
  const customOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  // update header
  if ('headers' in options) {
    customOptions.headers = {
      ...customOptions.headers,
      ...options.headers,
    };
  }

  // automatically parse json response
  return fetch(baseUrl, customOptions).then(res => res.json());
};
