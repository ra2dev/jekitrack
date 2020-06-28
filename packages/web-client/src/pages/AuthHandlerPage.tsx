import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useLocation, useHistory } from 'react-router-dom'
import appState from '../store/appState'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default observer(function AuthHandler() {
  const query = useQuery()
  const history = useHistory()

  // ["email", "id", "profileImageUrl", "token"]
  useEffect(() => {
    const appContext = {
      id: query.get('id'),
      email: query.get('email'),
      profileImageUrl: query.get('profileImageUrl'),
    }
    const token = query.get('token')

    appState.onLogin(token, appContext)
    history.push('/dashboard')
  }, [])
  return <div />
})
