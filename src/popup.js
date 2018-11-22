import Vue from 'vue'

import App from './App.vue'
import store from './store'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons'

import VModal from 'vue-js-modal'

library.add(faCaretDown)
library.add(faInfoCircle)
library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VModal)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
