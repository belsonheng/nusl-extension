import * as types from '../mutations_types'

import authAPI from '../../services/api/auth'

const state = {
  isAuthorise: JSON.parse(localStorage.getItem('isAuthorise')) || false,
  accessToken: localStorage.getItem('accessToken') || '',
}

const getters = {
  getIsAuthorise: state => state.isAuthorise,
  getAccessToken: state => state.accessToken,
}

const mutations = {
  [types.LOGIN](state, data) {
    state.isAuthorise = true
    state.accessToken = data.accessToken
    localStorage.setItem('isAuthorise', true)
    localStorage.setItem('accessToken', data.accessToken)
  },
  [types.LOGOUT](state) {
    state.isAuthorise = false
    state.accessToken = ''
    localStorage.removeItem('isAuthorise')
    localStorage.removeItem('accessToken')
  }
}

const actions = {
  async login({ commit }, context) {
    try {
      const response = await authAPI.login(context)
      commit(types.LOGIN, response.data)
      return Promise.resolve(response.data)
    } catch (error) {
      console.group('[STATE][ACTION] Login Error')
      console.log(error.response)
      console.groupEnd()
      commit(types.LOGOUT)
      return Promise.reject(error.response)
    }
  },
  async logout({ commit }) {
    try {
      const response = await authAPI.logout()
      commit(types.LOGOUT)
      return Promise.resolve()
    } catch (error) {
      console.group('[STATE][ACTION] Logout Error')
      console.log(error.response)
      console.groupEnd()
      return Promise.reject(error.response)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
