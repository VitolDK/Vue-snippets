import Vue from 'vue'
import Vuex from 'vuex'

import lang from './modules/lang'
import sidePanel from './modules/sidePanel'
import modal from './modules/modal'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    lang,
    sidePanel,
    modal
  },
  getters
})

export default store
