import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ loggedIn, children, ...props }) {
  function redirect({ location }) {
    return loggedIn
      ? children
      : <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }

  return (
    <Route { ...props } render={ redirect } />
  );
}
