<template>
  <div>
    <loading :active.sync="isLoading"/>
    <header>
      <div class="indexContainer header">
        <router-link to="/" class="logo" style="color: #EF8C1A;">
          <img src="@/assets/images/headLogo.png" alt="幸福烘焙logo">
        </router-link>
        <a href="" class="navListA" @click.prevent="openNavList()"><i class="fas fa-bars"></i></a>
        <ul class="navList">
          <li>
            <router-link to="/" class="active"><strong>首頁</strong></router-link>
          </li>
          <li>
            <router-link to="/productList/all" class="">產品列表</router-link>
          </li>
          <li>
            <router-link to="/search" class="">查詢訂單</router-link>
          </li>
          <li>
            <router-link to="/storeBase" class="">門市據點</router-link>
          </li>
        </ul>
        <button type="button" class="cartA" id="btn" @click="openCartModal()">
         <i class="fas fa-shopping-cart"></i><span v-if="!(cartCount==0)">{{ cartCount }}</span>
        </button>
      </div>
    </header>
    <main>
      <router-view @LoadingModel="loadingEvent" @getcart="getCart" @closeNavList="closeNavList"></router-view>
    </main>
    <footer class="bg-dark text-muted p-2">
      <div class="footer indexContainer">
        <ul class="mb-0 pl-0">
          <li class="footerLogo">
            <img src="@/assets/images/logo.png" alt="幸福烘焙" class="mr-3">
            <p class="mb-0">台灣第一家泡芙專賣店，我們賣的是令人吃了幸福的泡芙。</p>
          </li>
          <li class="copright align-self-center">
            <p class="text-center text-white">Copyright © 2022 by Occur</p>
          </li>
          <li class="shopContact">
            <a class="mx-2 text-white" href="#" title="Facebook"><i class="fab fa-facebook-square"></i></a>
            <a class="mx-2 text-white" href="#" title="Line"><i class="fab fa-line"></i></a>
            <a class="mx-2 text-white" href="#" title="Instagrame"><i class="fab fa-instagram"></i></a>
          </li>
        </ul>
      </div>
    </footer>

    <div class="p-3 copyright">
      <p class="text-center m-1">本網站僅個人練習使用．不做任何商業用途。商品圖片與內容均為<a href="https://www.frenchkiss.com.tw/">幸福烘焙</a>所有</p>
      <div class="d-flex justify-content-center mt-2">
        <a class="" href="https://github.com/Occur55170/" title="github"><i class="fab fa-github"></i>GitHub</a>
        <a href="" is="router-link" class="ml-3" to="/login"><i class="fas fa-wrench"></i>管理者模式</a>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal cartList" id="cartList" v-on:keyup.enter="closeCartModal()">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="cart-header">
            <h5 class="cart-title" id="exampleModalLabel">購物車</h5>
            <a href="#" class="btn btn-white" @click.prevent="closeCartModal()"><i class="text-white fas fa-times-circle mb-0"></i></a>
          </div>
          <div class="cart-body">
            <div class="text-center h5 p-3 mb-0" v-if="cartMSG">
              <h3 class="text-center my-5">您尚未加入商品至購物車</h3>
              <a href="" class="btn bg-or text-white" @click.prevent="goPl()">趕快去逛逛</a>
            </div>
            <div v-if="!(cartMSG)">
              <ul>
                <li v-for="item in filterCarts" :key="item.id">
                  <img :src="item.product.imageUrl" :alt="item.product.title">
                  <div class="w-100">
                    <p class="title">{{ item.product.title }}</p>
                    <div class="price d-flex">
                      <div class="w-50 d-flex align-items-center">
                        <a href="" class="co-or" @click.prevent="correctCart(item.product_id,-1)" ><i class="fas fa-minus"></i></a>
                        <span class="w-75 text-center">{{ item.qty }}</span>
                        <a href="" class="co-or" @click.prevent="correctCart(item.product_id,1)" ><i class="fas fa-plus"></i></a>
                      </div>
                      <div class="w-50 text-right">
                        {{ item.product.price | corrency }}/{{ item.product.unit }}
                      </div>
                    </div>
                    <a href="" class="text-muted close" data-title="取消加入購物車" @click.prevent="removeCart(item.product.id)">
                      <i class="fas fa-trash-alt"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="cart-footer">
            <a v-if="!(cartMSG)" @click.prevent="goOrder()"><i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <AlertMSG/>
  </div>
</template>

<script>
import $ from 'jquery'
import AlertMSG from '@/components/HelloWorld.vue'

export default {
  data  () {
    return {
      msg: 'customer',
      isLoading: false,
      cart: {
        carts: []
      },
      filterCarts: [],
      cartCount: '',
      cartMSG: ''
    }
  },
  methods: {
    loadingEvent (opa) {
      this.isLoading = opa
    },
    openNavList () {
      $('.navList').slideToggle()
    },
    closeNavList () {
      if (document.body.offsetWidth < 600) {
        $('.navList').hide()
      }
    },
    closeCartModal () {
      $('#cartList').modal('hide')
    },
    openCartModal () {
      $('#cartList').modal('show')
    },
    goPl () {
      if (this.$route.path !== '/productList/all') {
        this.$router.push('/productList/all')
      }
      this.closeCartModal()
    },
    getCart (loadMode) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.cart = response.data.data
          vm.assortCarts()
          if (loadMode !== undefined) {
            vm.$bus.$emit('message:push', loadMode)
          }
        }
      })
    },
    assortCarts () {
      const vm = this
      vm.cart.carts.forEach(element => {
        // 判斷是否有重複的值在購物車上
        const newItem = vm.filterCarts.find((item, index) => item.product_id === element.product_id)
        if (!newItem) {
          vm.filterCarts.push(element)
        } else {
          // 數量計算
          let sum = 0
          const spAr = vm.cart.carts.filter(el => el.product_id === element.product_id)
          spAr.forEach(item => {
            sum = sum + item.qty
          })
          // 數量小於一的商品刪除
          if (newItem.qty < 1) {
            vm.removeCart(element.product_id)
          } else {
            vm.filterCarts[vm.filterCarts.indexOf(newItem)].qty = sum
          }
        }
      })

      if (vm.cart.carts.length === 0) {
        vm.filterCarts = []
      }

      vm.cartCount = vm.filterCarts.length
      if (vm.cartCount) {
        vm.cartMSG = false
      } else {
        vm.cartMSG = true
      }
      vm.isLoading = false
    },
    correctCart (pid, qty = 1) {
      const vm = this
      vm.loadingEvent(true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$emit('LoadingModel', true)
      vm.$http.post(api, { data: { product_id: pid, qty: qty } }).then((response) => {
        vm.getCart()
      })
    },
    removeCart (pid) {
      const vm = this
      vm.isLoading = true
      const del = vm.cart.carts.filter(el => el.product_id === pid)
      vm.filterCart = vm.filterCarts.filter(item => item.product_id !== pid)
      del.forEach((element, index) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${element.id}`
        vm.$http.delete(api).then((response) => {
          console.log(response.data)
          // 刪除最後一筆後，重新整理購物車
          if (index + 1 === del.length) {
            vm.cartCount = vm.filterCarts.length
            if (vm.cartCount) {
              vm.cartMSG = false
            } else {
              vm.cartMSG = true
            }
            vm.getCart()
          }
        })
      })
    },
    goOrder () {
      const vm = this
      $('#cartList').modal('hide')
      localStorage.setItem('checkoutStep', '1')
      vm.$router.push('/Checkout')
    }
  },
  created () {
    this.getCart()
  },
  components: {
    AlertMSG
  }
}
</script>
