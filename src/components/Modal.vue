<template>
  <div class="modal cartMoadl" id="cartMoadl" v-on:keyup.enter="closeCartModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="cart-header">
          <h5 class="cart-title" id="exampleModalLabel">購物車</h5>
          <a href="#" class="btn btn-white" @click.prevent="closeCartModal"><i class="text-white fas fa-times-circle mb-0"></i></a>
        </div>
        <div class="cart-body">
          <div class="text-center h5 p-3 mb-0" v-if="cart.carts.length == 0">
            <h3 class="text-center my-5">您尚未加入商品至購物車</h3>
          </div>
          <div v-if="cart.carts.length !== 0">
            <ul>
              <li v-for="item in cart.carts" :key="item.id">
                <img :src="item.product.imageUrl" :alt="item.product.title">
                <div class="w-100">
                  <p class="title">{{ item.product.title }}</p>
                  <div class="price d-flex">
                    <div class="w-50 d-flex align-items-center">
                      <a href="#" class="co-or" @click.prevent="correctCart(item.product.id,-1)" ><i class="fas fa-minus"></i></a>
                      <span class="w-75 text-center">{{ item.qty }}</span>
                      <a href="#" class="co-or" @click.prevent="correctCart(item.product.id,1)" ><i class="fas fa-plus"></i></a>
                    </div>
                    <div class="w-50 text-right">
                      {{ item.product.price | corrency }}/{{ item.product.unit }}
                    </div>
                  </div>
                  <a href="#" class="text-muted close" data-title="取消加入購物車" @click.prevent="removeCart(item.product.id)">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-footer">
          <a @click.prevent="goOrder" v-if="cart.carts.length !== 0"><i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去</a>
          <a href="#" class="btn bg-or text-white" @click.prevent="goProduct" v-if="cart.carts.length == 0">趕快去逛逛</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  methods: {
    closeCartModal () {
      $('#cartMoadl').modal('hide')
    },
    openCartModal () {
      $('#cartMoadl').modal('show')
    },
    goOrder () {
      $('#cartMoadl').modal('hide')
      localStorage.setItem('checkoutStep', '1')
      this.$router.push('/Checkout')
    },
    goProduct () {
      if (this.$route.path !== '/ProductList/all') {
        this.$router.push('ProductList/all')
      }
      this.closeCartModal()
    },
    removeCart (pid) {
      this.$store.dispatch('cartsModules/removeCart', pid)
    },
    correctCart (pid, qty) {
      this.$store.dispatch('cartsModules/correctCart', { pid, qty })
    },
    ...mapActions('cartsModules', ['getCart'])
  },
  computed: {
    ...mapGetters('cartsModules', ['cart', 'cartA'])
  },
  created () {
    this.getCart()
    this.$store.dispatch('cartsModules/updateCartA', true)
  }
}
</script>

<style lang="scss" scoped>
.vld-overlay.is-full-page{z-index:1070;}
.show{
  display: flex !important
}
.cartMoadl{
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
    p{
      margin-bottom: 0;
    }
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
        &>img{
          width:20%;
          margin-right:5%;
        }
      }
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

@media(max-width:600px){
  .cartMoadl {
    .cart-body {
      h3 {
        font-size:1.6rem;
      }
    }
  }
}
</style>
