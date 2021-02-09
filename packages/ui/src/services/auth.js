import { API_URL } from '../config';
import { fetchApiBasicAuth } from './fetch';

export function init() {
  return {
    login(credentials) {
      return fetchApiBasicAuth(credentials)(`${ API_URL }/user/login`, {
        method: 'POST'
      });
    }
  };
}

