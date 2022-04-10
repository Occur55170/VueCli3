<template>
  <div>
    <div class="productContent">
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb bg-transparent pl-0">
          <li class="breadcrumb-item">
            <router-link to="/ProductList/all">產品列表</router-link>
          </li>
          <li class="breadcrumb-item">
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
            <button class="btn mb-0" @click.prevent="qty--" :disabled="qty<2"><i class="fas fa-minus"></i></button>
            <input type="number" v-model.number="qty"  class="text-center" @blur="qtyblur()">
            <button class="btn mb-0" @click.prevent="qty++"><i class="fas fa-plus"></i></button>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <button class="btn bg-or text-white" @click="addCart(product.id,qty)" :disabled="product.is_enable==0">
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
          <p class="productDesc" id="productDesc">
          {{ product.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      pid: '',
      product: {},
      qty: 1
    }
  },
  methods: {
    getProduct () {
      const vm = this
      vm.$emit('LoadingModel', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.pid}`
      vm.$http.get(api).then((response) => {
        vm.$emit('LoadingModel', false)
        if (response.data.success) {
          vm.product = response.data.product
          vm.textFilt()
          vm.$emit('LoadingModel', false)
        }
      })
    },
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
    addCart (pid, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$emit('LoadingModel', true)
      vm.$http.post(api, { 'data': { 'product_id': pid, 'qty': qty } }).then((response) => {
        vm.$emit('getcart', '已成功將商品加入購物車')
      })
    },
    qtyblur () {
      const vm = this
      if (vm.qty < 1 || vm.qty === false) {
        vm.qty = 1
      }
    }
  },
  created () {
    this.$emit('closeNavList')
    this.$emit('cartSw', true)
    this.pid = this.$route.params.id
    this.getProduct()
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
  }
  .instruction{
    .productDesc{
      margin:10px 0;
      line-height:2;
      font-size:18px;
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
