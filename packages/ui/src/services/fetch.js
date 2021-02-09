function transformJsonResponse(response) {
  return response.json();
}

export function fetchApi(url, options) {
  return fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    ...options
  })
  .then(transformJsonResponse);
}

export function fetchApiBasicAuth({ userName, password }) {
  return (url, options) => fetchApi(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Basic ${ btoa(`${ userName }:${ password }`) }`
    }
  });
}

export function fetchApiBearerAuth(token) {
  return (url, options) => fetchApi(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${ token }`
    }
  });
}
