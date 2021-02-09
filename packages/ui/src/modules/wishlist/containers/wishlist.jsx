import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useApi } from '../../../services/api';
import { removeWishlistProduct as removeWishlistProductAction } from '../../../store/actions';
import { I18nContext } from '../../../locales/i18n';
import { ProductCard, Wish } from '../../../components';
import { getWishlistStart, getWishlistSuccess, getWishlistError, getWishlistProducts } from '../store/wishlist';

export function WishlistContainer({ className }) {
  const _className = cn('container', 'space-p-4', className);

  const t = useContext(I18nContext);
  const dispatch = useDispatch();
  const { wishlist, wishlistProducts, loading } = useSelector(({ wishlist }) => wishlist);
  const { loggedIn, fullName, token } = useSelector(({ auth }) => auth);

  const { getProduct } = useApi('products');
  const { getWishlist, removeWishlistProduct } = useApi('wishlist', { token });

  function handleRemove(productId) {
    return () => {
      removeWishlistProduct(productId)
      .then(({ productId }) => {
        dispatch(removeWishlistProductAction({ productId }));
      })
      .catch(console.error.bind(console));
    };
  }

  useEffect(() => {
    if (loggedIn) {
      dispatch(getWishlistStart());

      (!wishlist.length
        ? getWishlist(token)
          .then((wishlist) => {
            dispatch(getWishlistSuccess({ wishlist }));

            return wishlist;
          })
        : Promise.resolve(wishlist))
      .then((wishlist) => Promise.all(wishlist.map((productId) => getProduct(productId))))
      .then((wishlistProducts) => {
        dispatch(getWishlistProducts({ wishlistProducts }));
      })
      .catch((error) => {
        dispatch(getWishlistError({ error }));
      });
    }
  }, [ loggedIn ]);

  return (
    <div className={ _className }>
      <div className="row space-m-t-2">
        { wishlistProducts.length
          ? wishlistProducts.map((wishlistProduct) => (
            <div key={ wishlistProduct.productId } className="col-xs-12 space-m-v-1">
              <ProductCard product={ wishlistProduct } horizontal={ true }>
                { loggedIn && (
                  <Wish active={ true }
                      dark={ true }
                      onClick={ handleRemove(wishlistProduct.productId) } />
                ) }
              </ProductCard>
            </div>
          ))
          : !loading && (
            <span className="body">
              <span className="space-m-r-2">
                { t('wishlist.empty', { fullName }) }
              </span>
              <Link className="link" to="/products">{ t('products.label') }</Link>
            </span>
          )
        }
      </div>
    </div>
  );
}
