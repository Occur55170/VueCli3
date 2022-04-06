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
        },
        {
          name: '門市據點',
          path: '/storeBase',
          component: () => import('./views/Front-End/Storebase.vue')
        },
        {
          name: '查詢訂單',
          path: '/Search',
          component: () => import('./views/Front-End/Search.vue')
        // },
        // {
        //   name: '產品列表',
        //   path: '/ProductList/:sortId',
        //   component:ProductList
        // },
        // {
        //   name: '產品資訊頁',
        //   path: '/product/:id',
        //   component:Product
        // },
        // {
        //   name: '顧客結帳頁面',
        //   path: '/Checkout',
        //   component:Checkout
        // },
        // {
        //   name: '顧客付款頁面',
        //   path: '/pay/:id',
        //   component:pay,
        }
      ]
    }
  ]
})
