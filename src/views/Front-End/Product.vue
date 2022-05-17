<template>
  <div>
    <div class="productContent">
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb bg-transparent pl-0">
          <li class="breadcrumb-item">
            <RouterLink to="/ProductList/all">產品列表</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <!-- <RouterLink :to='`/ProductList/${product.category}`'>產品列表</RouterLink> -->
            <a href="#" @click.prevent="proCate(product.category)">{{ product.category }}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="d-flex flex-wrap align-items-start">
        <img :src="product.imageUrl" class="proImg" :alt="product.title">
        <div class="proCon">
          <h1>{{ product.title }}</h1>
          <h4 class="card-text">{{ product.description }}</h4>
          <div class="priceCon">
            <p class="SellPrice">售價{{ product.origin_price|corrency }}</p>
            <p class="webPrice">網路價<span>{{ product.price|corrency }}</span></p>
          </div>
          <div class="qtyCon" v-if="product.is_enable!==0">
            <button type="button" class="btn mb-0" @click.prevent="qty--" :disabled="qty<2"><i class="fas fa-minus"></i></button>
            <input type="number" v-model.number="qty"  class="text-center" @blur="qtyblur">
            <button type="button" class="btn mb-0" @click.prevent="qty++"><i class="fas fa-plus"></i></button>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <button type="button" class="btn bg-or text-white" @click="addCart(qty)" :disabled="product.is_enable==0">
              <span v-if="product.is_enable!==0"><i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車</span>
              <span v-if="product.is_enable==0">缺貨中</span>
            </button>
            <div class="text-muted text-right">
              <i class="h3 mx-1 fab fa-cc-visa"></i>
              <i class="h3 mx-1 fab fa-cc-jcb"></i>
              <i class="h3 mx-1 fab fa-cc-paypal"></i>
            </div>
          </div>
        </div>
        <div class="alert alert-secondary mt-4 w-100 instruction" role="alert">
          <h2 class="text-center">購物說明</h2>
          <p class="productDesc" id="productDesc" v-html="productContent">
          </p>
        </div>
      </div>
      <div class="similarList my-5 d-flex flex-wrap justify-content-between">
        <h2 class="font-weight-bold w-100 mb-3">相關商品</h2>
        <div v-for="(item, key) in similarList" :key="key" class="d-flex flex-column justify-content-between">
          <div class="head text-center">
            <img :src="item.imageUrl" alt="" class="w-100">
            <p class="mb-0">{{ item.title }}</p>
            <a href="#" :title="item.title" @click.prevent="moreProduct(item.id)"></a>
          </div>
          <div class="con text-center">
            <p class="price">{{ item.price|corrency }}</p>
            <a href="#" class="btn bg-or text-white mx-auto" @click.prevent="addOnCart(item.id, 1)">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>搶購去
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  data () {
    return {
      qty: 1,
      toPro: false
    }
  },
  methods: {
    proCate (categoryName) {
      this.$router.push(`/ProductList/${categoryName}`)
    },
    goOrder () {
      const vm = this
      vm.$router.push(`/Checkout`)
    },
    textFilt () {
      const vm = this
      let prodContent = vm.product.content
      let newTextAry = []
      for (let i = 0; prodContent.length > i; i++) {
        if (prodContent[i] === '♥' && i !== 0) {
          newTextAry.push('<br>')
        }
        newTextAry.push(prodContent[i])
      }
      $('#productDesc').html(newTextAry.join(''))
    },
    addCart (qty = 1) {
      let prod = this.product
      this.$store.dispatch('cartsModules/addCart', { prod, qty })
    },
    addOnCart (pid, qty = 1) {
      this.$store.dispatch('cartsModules/addCart', { pid, qty })
    },
    qtyblur () {
      const vm = this
      if (vm.qty < 1 || vm.qty === false) {
        vm.qty = 1
      }
    },
    moreProduct (pid) {
      this.$router.push(`/Product/${pid}`)
      this.toPro = true
    }
  },
  watch: {
    $route (to) {
      if (this.toPro) {
        this.$store.dispatch('productsModules/getProduct', this.$route.params.id)
        this.toPro = false
      } else {
        console.log('notPro')
      }
    }
  },
  computed: {
    ...mapGetters('productsModules', ['product', 'productContent', 'productList', 'similarList'])
  },
  created () {
    this.$emit('closeNavList')
    this.$emit('cartSw', true)
    this.$store.dispatch('cartsModules/updateCartA', true)
    this.$store.dispatch('productsModules/getProduct', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.productContent{
  width:900px;
  margin:0 auto;
  padding:20px 0;
  nav{
    margin-bottom:20px;
  }
  .proImg{
    width:45%;
  }
  .proCon{
    margin-left:5%;
    width:50%;
    h1{
      margin-bottom:10px;
      font-weight:bold;
    }
    h4{
      margin-bottom:10px;
    }
    i{
      margin-bottom:0 !important;
    }
    .card-text{
      font-size:18px;
      line-height:1.6;
    }
    .priceCon{
      display:flex;
      justify-content:flex-start;
      align-items:center;
      margin-bottom:20px;
      .SellPrice{
        opacity:0.8;
        margin-top:0 !important;
        margin-bottom:0 !important;
        text-decoration:line-through;
        font-size:18px;
      }
      .webPrice{
        margin:0 20px !important;
        font-size:30px;
        span{
          font-weight:bold;
          color:#dc3545;
          font-size:40px;
        }
      }
    }
    .qtyCon{
      display:flex;
      align-items:stretch;
      margin-bottom:60px;
      & button{
        margin:0 5px;
        font-weight:bold;
        font-size:20px;
      }
    }
    .addCartA:hover{
      background:#bd6500;
    }
  }
  .instruction{
    .productDesc{
      margin:10px 0;
      line-height:2;
      font-size:18px;
    }
  }
  .similarList{
    h2{
      border-left:5px solid #ccc;
      padding-left:10px;
    }
    &>div{
      width:22%;
      border:1px solid #ccc;
      box-sizing:border-box;
      padding:10px;
    }
    .head{
      position:relative;
      font-weight:bold;
      margin-bottom: 5px;
      img{
        height:180px;
        margin-bottom:10px;
      }
      p{
        font-size:17px;
      }
      a{
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;
      }
    }
    .con{
      .price{
        color:#dc3545;
        font-size:20px;
        font-weight:bold;
        margin-bottom: 10px;
      }
      a{
        width:90%;
      }
    }
  }
}
@media(max-width:768px){
  .productContent{
    width:100%;
    padding:20px;
    nav{
      font-size:16px;
      ol{
        margin-bottom:0;
      }
    }
    .proImg{
      width:45%;
    }
  }
}
@media(max-width:600px){
  .productContent{
    width:100%;
    padding:20px;
    nav{
      font-size:16px;
      margin-bottom:10px;
      ol{
        margin-bottom:0;
      }
    }
    .proImg{
      width:100%;
      margin-bottom:20px;
    }
    .proCon{
      width:100%;
      margin-top: 0;
      margin-left: 0;
      margin-bottom:50px;
      h1{
        font-size:28px;
        font-weight:bold;
      }
      .card-text{
        font-size: 16px;
      }
      .priceCon{
        justify-content: space-between;
        margin-bottom:30px;
        .webPrice{
          font-size:40px;
          span{
            font-size:40px;
          }
        }
      }
      .qtyCon{
        margin-bottom:20px;
        justify-content:center;
      }
    }
    .instruction{
      .productDesc{
        margin:10px 0;
        line-height:1.6;
        font-size:16px;
      }
    }
  }
}
</style>
