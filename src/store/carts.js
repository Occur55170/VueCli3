import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {
      carts: [],
      total: 0,
      final_total: 0
    }
  },
  actions: {
    getCart (context, status) {
      context.dispatch('updateLoad', true, { root: true })
      // 第一次進入頁面購物車領取，之後更新購物車
      let carts = JSON.parse(localStorage.getItem('carts')) || []
      context.commit('CARTS', carts)
      context.dispatch('updateLoad', false, { root: true })
    },
    addCart (context, { pid = false, prod = false, qty }) {
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      if (pid) {
        console.log(pid, qty)
        let prod = context.rootState.productsModules.productList.find(item => item.id === pid)
        if (!carts.find(item => item.product.id === pid)) {
          context.commit('ADDCART', { 'product': prod, 'qty': qty })
        } else {
          context.dispatch('correctCart', { pid, qty })
        }
      } else if (prod) {
        console.log(prod, qty)
        let pid = prod.id
        if (!carts.find(item => item.product.id === prod.id)) {
          context.commit('ADDCART', { 'product': prod, 'qty': qty })
        } else {
          context.dispatch('correctCart', { pid, qty })
        }
      } else {
        console.log('你來亂的')
      }
    },
    removeCart (context, pid) {
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      let index = carts.indexOf(carts.find(item => item.product.id === pid))
      context.commit('REMOVECART', index)
    },
    correctCart (context, { pid, qty }) {
      console.log(pid, qty)
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      let index = carts.indexOf(carts.find(item => item.product.id === pid))
      let msg = qty > 0 ? '已新增商品' : '已刪除商品'
      context.commit('CORRECTCART', { index, qty, msg })
      this.dispatch('updateLoad', false, { root: true })
    },
    clertCart (context, status) {
      // 初始化後台購物車
      context.dispatch('updateLoad', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(response => {
        if (response.data.success) {
          response.data.data.carts.forEach((item) => {
            context.dispatch('UpdateRemoveCart')
            // context.dispatch('initCart')
          })
        }
      })
    },
    UpdateRemoveCart (context, pid) {
      // context.dispatch('updateLoad', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${pid}`
      axios.delete(api).then(response => {
        if (response.data.success) {
          context.dispatch('updateLoad', false, { root: true })
        }
      })
    },
    initCart (context, status) {
      console.log('購物車已清空')
    // context.dispatch('updateLoad', false, { root: true })
    //   context.state.cart.carts.forEach((items, index) => {
    //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //     let data = { 'product_id': items.product.id, 'qty': items.qty }
    //     axios.post(api, { 'data': data }).then(response => {
    //       if (response.data.success) {
    //         console.log('success')
    //         console.log(items)
    //         if (index + 1 === context.state.cart.carts.length) {
    //           context.dispatch('updateLoad', false, { root: true })
    //         }
    //       }
    //     })
    //   })
    },
    UpdateAddCart (context, pid) {
    // context.dispatch('initCart')
    // this.dispatch('updateLoad', false, { root: true })
    //   context.state.cart.carts.forEach((items, index) => {
    //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //     let data = { 'product_id': items.product.id, 'qty': items.qty }
    //     axios.post(api, { 'data': data }).then(response => {
    //       if (response.data.success) {
    //         console.log('success')
    //         console.log(items)
    //         if (index + 1 === context.state.cart.carts.length) {
    //           this.dispatch('updateLoad', false, { root: true })
    //         }
    //       }
    //     })
    //   })
    }
    // initCart (context, status) {
    //   // 初始化後台購物車
    //   context.dispatch('updateLoad', true, { root: true })
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //   axios.get(api).then(response => {
    //     if (response.data.success) {
    //       context.commit('CARTS', response.data.data.carts)
    //       context.commit('TOTAL', response.data.data.total)
    //       context.commit('FINAL_TOTAL', response.data.data.final_total)
    //       context.dispatch('updateLoad', false, { root: true })
    //     }
    //   })
    // },
  },
  mutations: {
    CARTS (state, payload) {
      // payload 須為陣列
      state.cart.carts = payload
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      this.dispatch('updateLoad', false, { root: true })
    },
    ADDCART (state, payload) {
      state.cart.carts.push(payload)
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      this.dispatch('alertModules/updateMessage', '已新增商品')
      this.dispatch('updateLoad', false, { root: true })
    },
    REMOVECART (state, index) {
      state.cart.carts.splice(index, 1)
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      this.dispatch('alertModules/updateMessage', '已刪除商品')
      this.dispatch('updateLoad', false, { root: true })
    },
    CORRECTCART (state, { index, qty, msg }) {
      state.cart.carts[index].qty += qty
      if (state.cart.carts[index].qty < 1) {
        state.cart.carts.splice(index, 1)
      }
      this.dispatch('alertModules/updateMessage', msg)
      localStorage.setItem('carts', JSON.stringify(state.cart.carts))
    },
    TOTAL (state, payload) {
      state.cart.total = payload
    },
    FINAL_TOTAL (state, payload) {
      state.cart.final_total = payload
    }
  },
  getters: {
    cart: (state) => state.cart
  }
}
