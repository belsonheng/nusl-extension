import * as types from '../mutations_types'

let timeout = null

const state = {
  message: null
}

const getters = {
  getFlashMessage: state => state.message
}

const mutations = {
  [types.FLASH_MESSAGE](state, message) {
    state.message = message
  }
}

const actions = {
  flash({ commit }, context) {
    clearTimeout(this.timeout)
    if (context.timeout) {
      commit(types.FLASH_MESSAGE, context.message)
      this.timeout = setTimeout(() => {
        commit(types.FLASH_MESSAGE, null)
      }, context.timeout)
    } else {
      commit(types.FLASH_MESSAGE, context.message)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
