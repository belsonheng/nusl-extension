import axios from '../../interceptors'

const loginUrl = '/auth/login'
const logoutUrl = '/auth/logout'

export default {
  login(data) {
    return axios.post(loginUrl, data)
  },
  logout() {
    return axios.get(logoutUrl)
  }
}
