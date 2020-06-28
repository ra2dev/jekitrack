class LocalStorage {
  static setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('app-refresh-token', refreshToken)
  }

  static clearRefreshToken = () => {
    localStorage.removeItem('app-refresh-token')
  }

  static getRefreshToken = (): string | null | undefined => {
    return localStorage.getItem('app-refresh-token')
  }

  static setAuthToken = (authToken: string) => {
    localStorage.setItem('app-token', authToken)
  }

  static clearAuthToken = () => {
    localStorage.removeItem('app-token')
  }

  static getAuthToken = (): string | null | undefined => {
    return localStorage.getItem('app-token')
  }

  static setAppContext = (context: Object) => {
    localStorage.setItem('app-context', JSON.stringify(context))
  }

  static clearClearContext = () => {
    localStorage.removeItem('app-context')
  }

  static getAppContext = (): any | undefined => {
    try {
      const context = localStorage.getItem('app-context')
      return context ? JSON.parse(context) : null
    } catch (e) {
      return undefined
    }
  }

  static clearAll = () => {
    LocalStorage.clearRefreshToken()
    LocalStorage.clearAuthToken()
    LocalStorage.clearClearContext()
  }
}

export default LocalStorage
