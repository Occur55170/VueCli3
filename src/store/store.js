import Vue from 'vue'
import Vuex from 'vuex'
import productsModules from './products'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
    nullaaa: [],
    cart: {
      carts: []
    },
    cartCount: ''
  },
  actions: {
    updateLoad (context, status) {
      context.commit('LOAD', status)
    },
    alertMSG (context, status) {
      // this.$bus.$emit.$emit('message:push', '測試', 'danger')
      // console.log(context)
      // console.log(this.parentNode)
    },
    getCart (context, status) {
      context.dispatch('updateLoad', true)
      // 第一次進入頁面購物車領取，之後更新購物車
      let carts = JSON.parse(localStorage.getItem('carts')) || []
      context.commit('CARTS', carts)
      context.commit('CARTCOUNT', carts)
      context.dispatch('updateLoad', false)
    },
    addCart (context, { pid, qty }) {
      context.dispatch('updateLoad', true)
      context.commit('ADDCART', { pid, qty })
    },
    removeCart (context, { pid, qty }) {
      context.dispatch('updateLoad', true)
      let mode = 'remove'
      if (qty !== undefined) {
        context.commit('REMOVECART', { mode, pid, qty })
      } else {
        mode = 'rmOne'
        context.commit('REMOVECART', { mode, pid, qty })
      }
      context.dispatch('updateLoad', false)
    },
    updateCart (context, status) {

    }
  },
  mutations: {
    LOAD (state, status) {
      state.isLoading = status
    },
    CARTS (state, status) {
      // status 須為陣列
      localStorage.setItem('carts', JSON.stringify(status))
      state.cart.carts = status
      this.commit('CARTCOUNT', status)
      this.dispatch('updateLoad', false)
    },
    ADDCART (state, { pid, qty }) {
      let carts = state.cart.carts
      if (!carts.find(item => item.product.id === pid)) {
        let product = state.productsModules.productList.find(item => item.id === pid)
        carts.push({ product, qty })
      } else {
        let cart = carts.find(item => item.product.id === pid)
        console.log(cart)
        cart.qty += qty
      }
      this.commit('CARTS', carts)
    },
    REMOVECART (state, { mode, pid, qty }) {
      let data = state.productsModules.productList.find(item => item.id === pid) || {}
      if (mode === 'all') {
        state.cart.carts.splice(state.cart.carts.indexOf(data), 1)
      } else if (mode === 'one') {
        state.cart.carts.splice(state.cart.carts.indexOf(data), 1)
      }
    },
    CARTCOUNT (state, status) {
      state.cartCount = status.length
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    cart (state) {
      return state.cart
    },
    cartCount (state) {
      return state.cartCount
    },
    cartMSG (state) {
      if (state.cartCount === 0) {
        return false
      } else {
        return true
      }
    }
  },
  modules: {
    productsModules
  }
})
