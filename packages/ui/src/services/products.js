import { API_URL } from '../config';
import { fetchApi } from './fetch';

export function init() {
  return {
    getProduct(productId) {
      return fetchApi(`${ API_URL }/products/${ productId }`, {
        method: 'GET'
      });
    },
    getProducts({ type = '', page = 1, sorting = '' }) {
      const params = [
        `type=${ type }`,
        `page=${ page }`,
        `sorting=${ sorting }`
      ].join('&');

      return fetchApi(`${ API_URL }/products?${ params }`, {
        method: 'GET'
      });
    }
  };
}
