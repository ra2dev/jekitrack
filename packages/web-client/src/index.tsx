import './styles/index.less'
// Initializing appState and security headers
import './api/axios'

import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
)
