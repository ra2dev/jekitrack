import { observable, action } from 'mobx'
import axios from 'axios'
import LocalStorage from '../api/axios/localStorage'

class AppState {
  @observable appContext: any = null
  @observable authorized: boolean | undefined = undefined

  @action onLogout = () => {
    LocalStorage.clearAll()
    this.appContext = null
    this.authorized = false
  }

  @action authSuccess = (appToken: any, appContext: any) => {
    if (appToken) {
      axios.defaults.headers.Authorization = appToken
    }

    this.authorized = !!appToken
    if (appContext) {
      this.appContext = appContext
    }
  }

  @action onLogin = (appToken: any, appContext: any) => {
    LocalStorage.setAuthToken(appToken)
    LocalStorage.setAppContext(appContext)
    this.authSuccess(appToken, appContext)
  }

  initialize = () => {
    const appToken = LocalStorage.getAuthToken()
    const appContext = LocalStorage.getAppContext()
    this.authSuccess(appToken, appContext)
  }
}

const appState = new AppState()

export default appState
