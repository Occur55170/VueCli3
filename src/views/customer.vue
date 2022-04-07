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
            <router-link to="/Search" class="">查詢訂單</router-link>
          </li>
          <li>
            <router-link to="/Storebase" class="">門市據點</router-link>
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
import AlertMSG from '@/components/AlertMSG.vue'

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
          console.log(response.data.success)
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
      if (vm.cart.carts.length === 0) {
        vm.filterCarts = []
      }
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
          // 刪除最後一筆後，重新整理購物車
          if (index + 1 === del.length) {
            vm.getCart()
            // vm.cartCount = vm.filterCarts.length
            // if (vm.cartCount) {
            //   vm.cartMSG = false
            // } else {
            //   vm.cartMSG = true
            // }
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
<style lang="scss" scoped>
  .vld-overlay.is-full-page{z-index:1070;}
  header{
    box-shadow: 0 0 10px 4px #5a5a5a;
    padding:10px 0;
    background:#fffbe7;
    position:fixed;
    top:0;
    left:0;
    z-index:997;
    width:100%;
    .header{
      display:flex;
      justify-content:flex-end;
      align-items:center;
    }
    .logo{
      flex-grow:2;
    }
    .logo img{
      width:230px;
    }
    .navListA{
      display: none;
    }
    .navList{
      display:flex;
      list-style-type:none;
      padding:0 10px;
      margin-bottom:0;
      &>li:last-Child a{
        border-width:0;
      }
      a{
        display:inline-block;
        margin:0 20px;
        padding:0 5px;
        box-sizing:border-box;
        color:#706d63;
        font-weight:bold;
        font-size:18px;
        text-decoration:none;
        position:relative;
        &::after{
          content:'';
          transition:all .8s;
          background:#706d63;
          width:0;
          height:1px;
          position:absolute;
          bottom:0;
          left:45%;
        }
        &:hover::after{
          width:100%;
          left:0;
          background:#706d63;
        }
      }
    }
    .cartA{
      display:inline-block;
      padding:0 5px;
      box-sizing:border-box;
      color:#706d63;
      font-weight:bold;
      font-size:28px;
      text-decoration:none;
      position:relative;
      border:0;
      background:unset;
      display:flex;
      justify-content:center;
      align-items:center;
      & span{
        font-size:15px;
        position:absolute;
        bottom:-10%;
        right:-10%;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:99em;
        width:20px;
        height:20px;
        color:#fff;
        background:#dc3545;
      }
    }
  }
  .show{
    display: flex !important
  }
  .cartList{
    justify-content: flex-end;
    align-items: flex-start;
    padding-right:0 !important;
    &>div{
      transform:translateX(100%);
      transition:all .5s;
      background:#fff;
      text-align:left;
      height:100%;
      margin:0;
      width:410px;
      &>div{
        height: 100%;
      }
    }
    .cart-header{
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:#f8a835;
      padding:10px 20px;
      box-sizing:border-box;
      h5{margin-bottom: 0;font-weight: bold;font-size: 24px;color: #fff;}
    }
    .cart-body{
      box-sizing:border-box;
      padding:10px 20px;
      text-align: right;
      p{margin-bottom: 0;}
      ul{
        padding: 0;
        margin-bottom: 0;
        list-style-type: none;
        text-align:left;
        li{
          border-bottom:1px solid #acacac;
          position: relative;
          padding:20px 10px;
          display: flex;
          align-items: center;
          &>img{width:20%;margin-right:5%;}
          .title{
            font-weight: bold;
            font-size: 20px;
          }
          .price{
            color: #666;
            font-weight: bold;
            font-size:20px;
            margin-top:10px;
            div{
              &>a{
                text-decoration:none;
                font-size:16px;
              }
              &:hover{
                text-decoration:none;
              }
            }
          }
          .close{
            position: absolute;
            top:10px;
            right:10px;
          }
        }
      }
    }
    .cart-footer{
      text-align:right;
      padding:10px 20px;
      box-sizing:border-box;
      &>a{
        background:#f28200;
        color:#fff;
        padding:6px 18px;
        border-radius:5px;
        font-size:18px;
        cursor: pointer;
        &:hover{
          background:#cb6d00;
          color:#fff;
        }
      }
    }
  }
  main{
    margin:65px 0 0 0;
  }
  footer{
    ul{
      list-style-type:none;
      display:flex;
      align-items:center;
      justify-content:space-between;
      .footerLogo{
        width:30%;
        img{
          max-width:80px;
        }
        p{
          display:none;
        }
      }
      .copright{
        width:100%;
        box-sizing:border-box;
        padding:20px;
        p{
          margin-bottom:0;
          font-size:16px;
        }
      }
      .shopContact{
        width:30%;
        text-align: right;
        a{
          font-size:30px;
        }
      }
    }
  }
  @media(max-width:768px){
    header{
      .navList{
        a{
          margin:0 10px;
        }
      }
    }
    main{
      margin:95px 0 0 0;
    }
    footer{
      .footer{
        padding:20px 0;
        ul{
          flex-wrap:wrap;
          .footerLogo{
            width:100%;
            margin-right:0 !important;
            display:flex;
            flex-wrap:wrap;
            justify-content:center;
            img{
              width:12%;
              max-width: 120px;
              margin-right:0 !important;
            }
            p{
              margin:20px auto !important;
              display:block;
              text-align:center;
              color:#fff;
              width:100%;
              font-size:18px;
            }
          }
          .copright{
            width:100%;
            padding:10px 20px;
            p{
              font-size:15px;
            }
          }
          .shopContact{
            display:none;
          }
        }
      }
    }
  }
  @media(max-width:600px){
    header {
      box-shadow: 0 0 10px 4px #ccc;
      .header {
        padding:0 20px;
        justify-content:space-between;
      }
      .logo {
        order:2;
        flex-grow:0;
        img {
          width:75%;
          display:block;
          margin:0 auto;
        }
      }
      .navListA {
        order:1;
        display:block;
        font-size:36px;
        color:#333;
      }
      .navList {
        display: none;
        z-index: -1;
        position:absolute;
        top:100%;
        left:0;
        width:100%;
        background:#fff;
        flex-wrap:wrap;
        border-bottom:1px solid #999;
        li {
          width:100%;
          padding:10px;
          text-align:center;
          border-bottom:1px solid #ccc;
          &:last-Child {
            border:0;
          }
        }
      }
      .cartA {order:3;margin:0;}
    }
    main {
      margin:80px 0 0 0;
    }
    footer {
      .footer {
        ul {
          .footerLogo {
            width:100%;
            margin-right:0 !important;
            img {
              width:20%;
            }
            p {
              font-size: 4.2vw;
            }
          }
          .copright {
            width:100%;
            padding:0 0 20px 0;
            p {
              font-size:14px;
            }
          }
          .shopContact {
            display:none;
          }
        }
      }
    }
  }
  .cartList {
    .cart-body {
      h3 {
        font-size:1.6rem;
      }
    }
  }
</style>
