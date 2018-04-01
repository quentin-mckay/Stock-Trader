import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  // [vuex] must call Vue.use(Vuex) before creating a store instance.

import stocks from './modules/stocks'   // bring in vuex module
import portfolio from './modules/portfolio'   // bring in vuex module

import * as actions from './actions'

export default new Vuex.Store({
  actions,
  modules: {
    stocks,
    portfolio
  }
})