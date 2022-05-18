import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'animate.css'

import correncyFilter from './filters/corrency'
import dateDue from './filters/dateDue'
Vue.filter('corrency', correncyFilter)
Vue.filter('dateDue', dateDue)

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.component('Loading', Loading)

Vue.config.productionTip = false

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({ path: '/Login' })
      }
    })
  } else {
    next()
  }
})
