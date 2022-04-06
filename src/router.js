import Vue from 'vue'
import Router from 'vue-router'
import Customer from './views/Customer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Customer,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('./views/Front-End/Home.vue')
        }
      ]
    }
  ]
})
