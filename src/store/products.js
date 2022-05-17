import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    productList: [],
    product: {},
    groupList: [],
    sort: 'all',
    productContent: '',
    similar: []
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
      }).then(() => {
        if (context.state.pid) {
          context.commit('ADDSIMILAR')
        }
      })
    },
    getProduct (context, pid) {
      context.dispatch('updateLoad', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${pid}`
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCT', response.data.product)
          context.commit('PRODUCTCONTENT', response.data.product.content)
          context.commit('PID', pid)
          context.dispatch('updateLoad', false, { root: true })
        }
      }).then(() => {
        context.dispatch('getProducts')
      })
    },
    changGroup (context, status) {
      context.commit('SORT', status)
    }
  },
  mutations: {
    PRODUCTlIST (state, status) {
      if (state.product) {
        state.productList = status
      } else {
        state.productList = status
      }
    },
    GLIST (state, status) {
      status.map(element => {
        if (state.groupList.indexOf(element.category) === -1) {
          state.groupList.push(element.category)
        }
      })
    },
    PID (state, pid) {
      state.pid = pid
    },
    PRODUCT (state, status) {
      state.similar = []
      state.product = status
    },
    PRODUCTCONTENT (state, status) {
      let prodContent = status
      let newTextAry = []
      for (let i = 0; prodContent.length > i; i++) {
        if (prodContent[i] === '♥' && i !== 0) {
          newTextAry.push('<br>&nbsp;')
        }
        newTextAry.push(prodContent[i])
      }
      state.productContent = newTextAry.join('')
    },
    SORT (state, status) {
      state.sort = status
    },
    ADDSIMILAR (state, status) {
      let pidSort = state.productList.find(item => item.id === state.pid)
      let filterAry = state.productList.filter(item => item.category === pidSort.category)
      for (let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * filterAry.length)
        let ans = state.similar.some(item => {
          return item.id === filterAry[rand].id
        })
        if (!ans && filterAry[rand].title !== pidSort.title) {
          state.similar.push(filterAry[rand])
        } else {
          i--
        }
      }
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
    groupList: state => state.groupList,
    product: state => state.product,
    productContent: state => state.productContent,
    similarList: state => state.similar
  }
}
