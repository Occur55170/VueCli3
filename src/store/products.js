import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    productList: [],
    product: {},
    groupList: [],
    sort: 'all'
  },
  actions: {
    getProducts (context, status) {
      context.dispatch('updateLoad', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCTlIST', response.data.products)
          context.commit('GLIST', response.data.products)
          context.dispatch('updateLoad', false, { root: true })
        }
      })
    },
    getProduct (context, pid) {
      context.dispatch('updateLoad', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${pid}`
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCT', response.data.product)
          // vm.textFilt()
          context.dispatch('updateLoad', false, { root: true })
        }
      })
    },
    changGroup (context, status) {
      context.commit('SORT', status)
    }
  },
  mutations: {
    PRODUCTlIST (state, status) {
      state.productList = status
    },
    PRODUCT (state, status) {
      state.product = status
    },
    GLIST (state, status) {
      status.map(element => {
        if (state.groupList.indexOf(element.category) === -1) {
          state.groupList.push(element.category)
        }
      })
    },
    SORT (state, status) {
      state.sort = status
    }
  },
  getters: {
    productList (state) {
      if (state.sort !== 'all') {
        return state.productList.filter(element => {
          return element.category === state.sort
        })
      } else {
        return state.productList
      }
    },
    groupList (state) {
      return state.groupList
    },
    product (state) {
      return state.product
    }
  }
}
