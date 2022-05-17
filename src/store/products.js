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
      })
    },
    getProduct (context, pid) {
      context.dispatch('updateLoad', true, { root: true })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${pid}`
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCT', response.data.product)
          context.commit('PRODUCTCONTENT', response.data.product.content)
          context.dispatch('updateLoad', false, { root: true })
        }
      }).then(() => {
        const Allapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
        axios.get(Allapi).then((response) => {
          if (response.data.success) {
            context.commit('PRODUCTlIST', response.data.products)
            context.dispatch('updateLoad', false, { root: true })
          }
        }).then(() => {
          context.commit('ADDSIMILAR')
        })
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
    GLIST (state, status) {
      status.map(element => {
        if (state.groupList.indexOf(element.category) === -1) {
          state.groupList.push(element.category)
        }
      })
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
      let filterAry = state.productList.filter(item => item.category === state.product.category)
      for (let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * filterAry.length)
        // 判斷是否有重複推薦
        let ans = state.similar.some(item => item.id === filterAry[rand].id)
        if (!ans && filterAry[rand].title !== state.product.title) {
          state.similar.push(filterAry[rand])
        } else {
          i -= 1
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
