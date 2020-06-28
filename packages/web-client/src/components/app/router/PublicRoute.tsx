import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PublicRoute({ path, appComponent: Component, isAuthenticated, ...props }: any) {
  return <Route {...props} path={path} render={() => (isAuthenticated ? <Redirect to="/" /> : <Component />)} />
}
