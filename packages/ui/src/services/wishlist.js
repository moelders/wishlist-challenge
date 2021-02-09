import { API_URL } from '../config';
import { fetchApiBearerAuth } from './fetch';

export function init({ token }) {
  const fetchApi = fetchApiBearerAuth(token);

  return {
    getWishlist() {
      return fetchApi(`${ API_URL }/wishlist`, {
        method: 'GET'
      })
      .then(({ products }) => products);
    },
    addWishlistProduct(productId) {
      return fetchApi(`${ API_URL }/wishlist/${ productId }`, {
        method: 'PUT'
      });
    },
    removeWishlistProduct(productId) {
      return fetchApi(`${ API_URL }/wishlist/${ productId }`, {
        method: 'DELETE'
      });
    }
  };
}
