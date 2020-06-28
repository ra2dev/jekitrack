import axios from 'axios'
import appState from '../../store/appState'

axios.defaults.baseURL = 'http://localhost:3001'
// Set auth header if exists
appState.initialize()

export default axios
