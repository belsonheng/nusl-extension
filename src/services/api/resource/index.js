import axios from '../../interceptors'

const resourcesUrl = '/onsite/resources/'
const proxyUrl = '/onsite/proxy/'

export default {
  async getResources() {
    try {
      const response = await axios.get(resourcesUrl)
      return Promise.resolve(response.data)
    } catch (error) {
      console.group('[SERVICE][API] List Resource Error')
      console.log(error.response)
      console.groupEnd()
      return Promise.reject(error.response)
    }
  },
  async fetch(resource_id) {
    try {
      const response = await axios.get(`${proxyUrl}${resource_id}/`)
      return Promise.resolve(response.data)
    } catch (error) {
      console.group('[SERVICE][API] Fetch Resource Error')
      console.log(error.response)
      console.groupEnd()
      return Promise.reject(error.response)
    }
  }
}

// to simulate api delay
// await _timeout(2000)
function _timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
