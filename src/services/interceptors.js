import axios from 'axios'
import store from '../store'

axios.defaults.baseURL = 'http://cjn3.stf.nus.edu.sg/api/v1'

axios.defaults.timeout = 60000

axios.interceptors.request.use(config => {
  let isAuthorise = store.state.auth.isAuthorise
  let accessToken = store.state.auth.accessToken
  if (isAuthorise && accessToken) {
    config.headers.common['Authorization'] = 'Bearer ' + accessToken
  }
  return config
}, error => {
  console.group('[SERVICE][API] Request Error')
  console.log(error)
  console.groupEnd()
  return Promise.reject(error)
})

axios.interceptors.response.use(data => {
  return data
}, error => {
  console.group('[SERVICE][API] Response Error')
  console.log(error)
  console.groupEnd()
  return Promise.reject(error)
})

export default axios
