/* eslint-disable no-nested-ternary */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : isLoading ? () => <div>LOADING</div> : <Redirect to="/login" />
    }
  />
)

export default PrivateRoute
