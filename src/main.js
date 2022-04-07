import Vue from 'vue'
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
import './bus'
import store from './store'

/* vue3不支援，之後刪除 */
import correncyFilter from './filters/corrency'
import dateDue from './filters/dateDue'
Vue.filter('corrency', correncyFilter)
Vue.filter('dateDue', dateDue)

Vue.use(VueAxios, axios)
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
  console.log(to, from)
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data.success)
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
