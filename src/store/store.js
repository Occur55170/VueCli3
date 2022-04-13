import Vue from 'vue'
import Vuex from 'vuex'
import productsModules from './products'
import cartsModules from './carts'
import alertModules from './alertMsg'

// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  namespaced: true,
  state: {
    isLoading: false
  },
  actions: {
    updateLoad (context, status) {
      context.commit('LOAD', status)
    }
  },
  mutations: {
    LOAD (state, payload) {
      state.isLoading = payload
    }
  },
  getters: {
    isLoading: (state) => state.isLoading
  },
  modules: {
    productsModules,
    alertModules,
    cartsModules
  }
})
