import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Footer, PrivateRoute } from './components';
import { AuthContainer } from './modules/auth';
import { FiltersContainer } from './modules/filters';
import { HeaderContainer } from './modules/header';
import { ProductsContainer } from './modules/products';
import { WishlistContainer } from './modules/wishlist';

export function Layout() {
  const { visible } = useSelector(({ filters }) => filters);
  const { loggedIn } = useSelector(({ auth }) => auth);

  return (
    <BrowserRouter>
      <HeaderContainer />
      { visible && <FiltersContainer /> }
      <main className="main">
        <Switch>
          <Route path="/products/:productId">
            <h1>productId</h1>
          </Route>
          <Route path="/products">
            <ProductsContainer />
          </Route>
          <PrivateRoute path="/wishlist" loggedIn={ loggedIn }>
            <WishlistContainer />
          </PrivateRoute>
          <Route path="/login">
            <AuthContainer />
          </Route>
          <Route path="/" exact={ true }>
            <Redirect to="/products" />
          </Route>
          <Route path="*">
            <Redirect to="/products" />
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
