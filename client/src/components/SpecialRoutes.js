import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ loggedIn: loggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  );
};

export const RestrictedRoute = ({ loggedIn: loggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect to="/" />
          )
      }
    />
  );
};
