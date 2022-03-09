/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Route, Redirect,
} from 'react-router-dom';
import { useAuth } from '../../providers/auth';

function PrivateRoute({ component: Component, type, ...rest }) {
  const { user, isAuthenticated, typeAuthorized } = useAuth();
  console.log('🚀 ~ file: PrivateRoute.js ~ line 11 ~ PrivateRoute ~ user', user);

  return (
    <Route
      {...rest}
      render={(props) => ((isAuthenticated() && typeAuthorized(type, user)) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ))}
    />
  );
}

export default PrivateRoute;
