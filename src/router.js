import Vue from 'vue'
import Router from 'vue-router'
import Customer from './views/Customer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: '登入頁',
      path: '/Login',
      component: () => import('./views/Back-End/Login.vue')
    },
    {
      path: '/Admin',
      component: () => import('./views/Back-End/Admin.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          name: '產品頁',
          path: 'Products',
          component: () => import('./views/Back-End/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          name: '優惠卷頁面',
          path: 'Coupon',
          component: () => import('./views/Back-End/Coupon.vue'),
          meta: { requiresAuth: true }
        },
        {
          name: '訂單列表',
          path: 'OrderList',
          component: () => import('./views/Back-End/OrderList.vue'),
          meta: { requiresAuth: true }
        },
        {
          name: '模擬_購物頁面頁',
          path: '/AdminOrder',
          component: () => import('./views/Back-End/AdminOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          name: '模擬_結帳頁面',
          path: '/AdminCheckout/:id',
          component: () => import('./views/Back-End/AdminCheckout.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
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
          path: '/StoreBase',
          component: () => import('./views/Front-End/StoreBase.vue')
        },
        {
          name: '查詢訂單',
          path: '/Search',
          component: () => import('./views/Front-End/Search.vue')
        },
        {
          name: '產品列表',
          path: '/ProductList/:sortId',
          component: () => import('./views/Front-End/ProductList.vue')
        },
        {
          name: '產品資訊頁',
          path: '/Product/:id',
          component: () => import('./views/Front-End/Product.vue')
        },
        {
          name: '顧客結帳頁面',
          path: '/Checkout',
          component: () => import('./views/Front-End/Checkout.vue')
        },
        {
          name: '顧客付款頁面',
          path: '/Pay/:id',
          component: () => import('./views/Front-End/Pay.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
