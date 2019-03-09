import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({authId, component: Component, ...rest}) => {
  return !!authId ? (
    <Route {...rest} render={
      (props) =>  <Component authId={authId} {...props}/>
      }
    />
  ) : (
    <Redirect to="/saved" />
  )
}

export default PrivateRoute;