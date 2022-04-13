// import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {
      carts: []
    },
    cartCount: ''
  },
  actions: {
    getCart (context, status) {
      context.dispatch('updateLoad', true, { root: true })
      // 第一次進入頁面購物車領取，之後更新購物車
      let carts = JSON.parse(localStorage.getItem('carts')) || []
      context.commit('CARTS', carts)
      context.dispatch('updateLoad', false, { root: true })
    },
    addCart (context, { pid, qty }) {
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      if (!carts.find(item => item.product.id === pid)) {
        let product = context.state.productsModules.productList.find(item => item.id === pid)
        context.commit('ADDCART', { 'product': product, 'qty': qty })
      } else {
        context.dispatch('correctCart', { pid, qty })
      }
    },
    removeCart (context, pid) {
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      let index = carts.indexOf(carts.find(item => item.product.id === pid))
      context.commit('REMOVECART', index)
    },
    correctCart (context, { pid, qty }) {
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      let index = carts.indexOf(carts.find(item => item.product.id === pid))
      let msg = qty > 0 ? '已新增商品' : '已刪除商品'
      context.commit('CORRECTCART', { index, qty, msg })
      this.dispatch('updateLoad', false, { root: true })
    }
  },
  mutations: {
    CARTS (state, payload) {
      // payload 須為陣列
      state.cart.carts = payload
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      // console.log(this)
      // console.log(this._mutations)
      // this.commit('CARTCOUNT', state.cart.carts.length)
      this.dispatch('updateLoad', false, { root: true })
    },
    ADDCART (state, payload) {
      state.cart.carts.push(payload)
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      this.dispatch('alertModules/updateMessage', '已新增商品')
      // this.commit('CARTCOUNT', state.cart.carts.length)
      this.dispatch('updateLoad', false, { root: true })
    },
    REMOVECART (state, index) {
      state.cart.carts.splice(index, 1)
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      this.dispatch('alertModules/updateMessage', '已刪除商品')
      // this.commit('CARTCOUNT', state.cart.carts.length)
      this.dispatch('updateLoad', false, { root: true })
    },
    CORRECTCART (state, { index, qty, msg }) {
      state.cart.carts[index].qty += qty
      if (state.cart.carts[index].qty < 1) {
        state.cart.carts.splice(index, 1)
      }
      this.dispatch('alertModules/updateMessage', msg)
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      // this.commit('CARTCOUNT', state.cart.carts.length)
    },
    CARTCOUNT (state, payload) {
      state.cartCount = payload
    }
  },
  getters: {
    cart: (state) => state.cart,
    cartCount: (state) => state.cartCount,
    cartMSG (state) {
      if (state.cartCount === 0) {
        return false
      } else {
        return true
      }
    }
  }
}
