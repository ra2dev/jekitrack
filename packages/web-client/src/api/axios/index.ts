import axios from 'axios'
import appState from '../../store/appState'
import { message } from 'antd'

axios.defaults.baseURL = 'http://localhost:3001'
// Set auth header if exists
appState.initialize()

axios.interceptors.response.use(
  (_) => _,
  async (error) => {
    if (error.response?.status === 401) {
      await appState.onLogout()
      message.info('Session expired, please login again.')
      return Promise.reject(error)
    }
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axios
