import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {
      carts: [],
      total: 0,
      final_total: 0
    },
    cartA: true
  },
  actions: {
    getCart (context, status) {
      context.dispatch('updateLoad', true, { root: true })
      let carts = JSON.parse(localStorage.getItem('carts')) || []
      context.commit('CARTS', carts)
      context.dispatch('updateLoad', false, { root: true })
    },
    addCart (context, { pid = false, prod = false, qty }) {
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      if (pid) {
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
        this.dispatch('alertModules/updateMessage', '加入購物車失敗，請重新整理後再加入購物車一次')
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
    cleartCart (context, status) {
      // 清除之前的購物車
      context.dispatch('updateLoad', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(response => {
        if (response.data.success) {
          // 可調整
          let carts = response.data.data.carts
          if (carts.length !== 0) {
            let i = 0
            carts.forEach((item, index) => {
              const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
              axios.delete(url).then(response => {
                if (response.data.success) {
                  i = i + 1
                }
              }).then(() => {
                if (i === carts.length) {
                  context.dispatch('updateCart')
                }
              })
            })
          } else {
            context.dispatch('updateCart')
          }
          // 可調整
        }
      })
    },
    updateCart (context, status) {
      // 上傳購物車
      context.dispatch('updateLoad', true, { root: true })
      let carts = context.state.cart.carts
      let i = 0
      carts.forEach((item, index) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        let data = { 'product_id': item.product.id, 'qty': item.qty }
        axios.post(api, { 'data': data }).then(response => {
          if (response.data.success) {
            i = i + 1
            if (i === carts.length) {
              context.dispatch('initCart')
            } else {
              console.log(i)
            }
          }
        })
      })
    },
    initCart (context, status) {
      // 同步購物車
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('CARTS', response.data.data.carts)
          context.commit('FINAL_TOTAL', response.data.data.final_total)
          context.commit('TOTAL', response.data.data.total)
          context.dispatch('updateLoad', false, { root: true })
        }
      })
    },
    UpdateRemoveCart (context, pid) {
      context.dispatch('updateLoad', true, { root: true })
      context.dispatch('removeCart', pid)
      localStorage.setItem('carts', JSON.stringify(context.state.cart.carts))
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${pid}`
      axios.delete(api).then(response => {
        if (response.data.success) {
          localStorage.setItem('carts', JSON.stringify(context.state.cart.carts))
          context.dispatch('updateLoad', false, { root: true })
        }
      })
    },
    updateCartA (context, status) {
      context.commit('CARTA', status)
    }
  },
  mutations: {
    CARTS (state, payload) {
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
    },
    CARTA (state, payload) {
      state.cartA = payload
    }
  },
  getters: {
    cart: (state) => state.cart,
    cartA: (state) => state.cartA
  }
}
