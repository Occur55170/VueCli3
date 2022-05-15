import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import productsModules from './products'
import cartsModules from './carts'
import alertModules from './alertMsg'
import backendModules from './backend'

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
    },
    addCoupon (context, status) {
      context.dispatch('updateLoad', true, { root: true })
      let coupon = { code: status }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      axios.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          context.dispatch('cartsModules/initCart')
          context.dispatch('updateLoad', false)
          this.dispatch('alertModules/updateMessage', response.data.message)
        } else {
          this.dispatch('alertModules/updateMessage', response.data.message)
        }
      })
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
    cartsModules,
    backendModules
  }
})
