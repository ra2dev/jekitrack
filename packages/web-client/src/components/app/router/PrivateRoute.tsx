/* eslint-disable no-nested-ternary */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, ...rest }: any) => (
  <Route {...rest} render={() => (isAuthenticated ? <Component /> : <Redirect to="/login" />)} />
)

export default PrivateRoute
