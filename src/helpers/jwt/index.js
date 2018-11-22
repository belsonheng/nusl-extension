import jwtDecode from 'jwt-decode'
import moment from 'moment'

export function isTokenExpired(jwt) {
  if (jwt) {
    let currentTime = Date.now().valueOf() / 1000
    if (currentTime > jwtDecode(jwt).exp) {
      return true
    }
  }
  return false
}

export function getTokenExpiry(jwt) {
  return jwt ? moment.unix(jwtDecode(jwt).exp).format('LLL') : null
}

export function getTokenExpiryInSeconds(jwt) {
  return jwt ? jwtDecode(jwt).exp : null
}
