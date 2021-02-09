import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useApi } from '../../../services/api';
import {
  getWishlist as getWishlistAction,
  addWishlistProduct as addWishlistProductAction,
  removeWishlistProduct as removeWishlistProductAction,
  getProductsSuccess,
  setFiltersVisible
} from '../../../store/actions';
import { ProductCard, Wish } from '../../../components';
import { getProductsStart, getProductsError } from '../store/products';

export function ProductsContainer({ className }) {
  const _className = cn('container', className);

  const dispatch = useDispatch();
  const { loggedIn, token } = useSelector(({ auth }) => auth);
  const { filters: { horizontal, type, pagination, sorting } } = useSelector(({ filters }) => filters);
  const { products } = useSelector(({ products }) => products);
  const { wishlist } = useSelector(({ wishlist }) => wishlist);

  const { getProducts } = useApi('products');
  const { getWishlist, addWishlistProduct, removeWishlistProduct } = useApi('wishlist', { token });

  const { page } = pagination;
  const { property: sortingProperty, direction } = sorting;

  const cardContainerClassName = cn({
    'col-xs-12 space-m-v-1': horizontal,
    'col-xs-6 col-md-4 col-lg-2 space-m-v-3': !horizontal
  });

  function handleWish(productId) {
    return (wished) => {
      (wished ? addWishlistProduct : removeWishlistProduct)(productId)
      .then(({ productId }) => {
        dispatch((wished ? addWishlistProductAction : removeWishlistProductAction)({ productId }));
      })
      .catch(console.error.bind(console));
    };
  }

  useEffect(() => {
    dispatch(setFiltersVisible({ visible: true }));

    return () => {
      dispatch(setFiltersVisible({ visible: false }));
    };
  }, []);

  useEffect(() => {
    dispatch(getProductsStart());

    getProducts({ page, type, sorting: direction ? `${ sortingProperty }|${ direction }` : '' })
    .then((data) => {
      dispatch(getProductsSuccess({ data }));
    })
    .catch((error) => {
      dispatch(getProductsError({ error }));
    });
  }, [ page, type, direction ]);

  useEffect(() => {
    if (loggedIn && !wishlist.length) {
      getWishlist(token)
      .then((wishlist) => {
        dispatch(getWishlistAction({ wishlist }));
      })
      .catch(console.error.bind(console));
    }
  }, [ loggedIn ]);

  return (
    <div className={ _className }>
      <div className="row">
        { products && products.map((product) => (
          <div key={ product.productId } className={ cardContainerClassName }>
            <ProductCard product={ product } horizontal={ horizontal }>
              { loggedIn && (
                <Wish active={ wishlist.includes(product.productId) }
                    dark={ horizontal }
                    onClick={ handleWish(product.productId) } />
              ) }
            </ProductCard>
          </div>
        )) }
      </div>
    </div>
  );
}

ProductsContainer.propTypes = {
  className: PropTypes.string
};
