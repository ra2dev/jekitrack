import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import IntegrationPage from './pages/Integration/IntegrationPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import AuthHandler from './pages/AuthHandlerPage'
import appState from './store/appState'
import PublicRoute from './components/app/router/PublicRoute'
import PrivateRoute from './components/app/router/PrivateRoute'

export default observer(function AppRouter() {
  const { authorized } = appState
  const isAuthenticated = authorized ?? true

  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" component={LoginPage} isAuthenticated={isAuthenticated} />
        <PublicRoute exact path="/handle-auth" component={AuthHandler} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/" component={DashboardPage} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/integrations" component={IntegrationPage} isAuthenticated={isAuthenticated} />
      </Switch>
    </Router>
  )
})
