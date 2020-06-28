import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PublicRoute({ path, appComponent: Component, isAuthenticated, ...props }: any) {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return <Route {...props} path={path} render={Component} />
}
