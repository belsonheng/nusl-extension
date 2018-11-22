import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import flash from './modules/flash'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    flash,
  },
  strict: true
})

export default store
