<template>
  <div>
    <div class="productContent">
      <nav aria-label="breadcrumb">
        <ul>
          <li>
            <RouterLink to="/ProductList/all" class="co-or">產品列表</RouterLink>
          </li>
          <li>
            <RouterLink :to="`/ProductList/${product.category}`" class="co-or">{{ product.category }}</RouterLink>
          </li>
          <li class="active co-or" aria-current="page">{{ product.title }}</li>
        </ul>
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
      <div class="similarList my-5">
        <h3 class="mb-3">相關商品</h3>
        <Carousel class="m-list list-unstyled d-flex justify-content-between" :paginationEnabled="false" :perPage="similarCount" :navigationEnabled="true" navigationNextLabel="<i class='fas fa-angle-right' style='font-size:60px'></i>" navigationPrevLabel="<i class='fas fa-angle-left' style='font-size:60px'></i>" >
          <slide v-for="(item, key) in similarList" :key="key" class="similarContent">
            <div class="head text-center">
              <img :src="item.imageUrl" alt="" class="w-100">
              <p class="my-2">{{ item.title }}</p>
              <a href="#" is="RouterLink" :to="`/Product/${item.id}`"></a>
            </div>
            <div class="content text-center">
              <p class="price">{{ item.price|corrency }}</p>
              <button type="button" class="btn bg-or text-white" @click="addOnCart(item.id, qty)" :disabled="product.is_enable==0">
                <span v-if="product.is_enable!==0"><i class="fa fa-cart-plus" aria-hidden="true"></i>加入購物車</span>
              </button>
            </div>
          </slide>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'

export default {
  metaInfo () {
    return {
      title: this.product.title
    }
  },
  data () {
    return {
      qty: 1,
      similarCount: 4
    }
  },
  methods: {
    goOrder () {
      const vm = this
      vm.$router.push(`/Checkout`)
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
    similarLi () {
      if (window.innerWidth <= 600) {
        this.similarCount = 1
      } else if (window.innerWidth <= 768) {
        this.similarCount = 3
      } else {
        this.similarCount = 4
      }
    },
    moreProduct () {
      this.$router.push('/Product/-MpVFPg2kOWzETFjcyRF')
    },
    ...mapActions('productsModules', ['getProducts'])
  },
  watch: {
    $route () {
      this.$store.dispatch('productsModules/getProduct', this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters('productsModules', ['product', 'productContent', 'productList', 'similarList'])
  },
  created () {
    this.$emit('closeNavList')
    this.$emit('cartSw', true)
    this.getProducts()
    this.$store.dispatch('cartsModules/updateCartA', true)
    this.$store.dispatch('productsModules/getProduct', this.$route.params.id)
    this.$nextTick(() => {
      this.similarLi()
    })
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<style lang="scss" scoped>
.productContent{
  width:900px;
  margin:0 auto;
  padding:40px 0 20px 0;
}
nav{
  margin-bottom:20px;
  ul{
    display:flex;
    list-style-type:none;
  }
  li{
    &::after{
      content:'/';
      color:#f28200;
      margin:0 10px;
    }
    &:last-Child::after{
      display:none;
    }
  }
  a{
    position:relative;
    text-decoration: none;
    color:#f28200;
    &::after{
      content:'';
      background:#f28200;
      height:1px;
      width:0;
      position:absolute;
      top:100%;
      left:45%;
      transition:all .8s;
    }
    &:hover::after{
      width:100%;
      left:0;
    }
  }
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
.similarList{
  h3{
    border-left:5px solid #666;
    padding-left:10px;
  }
  .head{
    position:relative;
    p{
      font-size:18px;
    }
    a{
      position:absolute;
      top:0;
      left:0;
      height:100%;
      width:100%;
    }
  }
  .price{
    font-size:22px;
    margin-bottom:5px;
    font-weight:bold;
    color: #dc3545;
  }
  .similarContent{
    box-sizing:border-box;
    padding:20px;
  }
}
@media(max-width:768px){
  .productContent{
    width:100%;
    padding:20px;
  }
  nav{
    font-size:16px;
    ol{
      margin-bottom:0;
    }
  }
  .proImg{
    width:45%;
  }
  .similarList{
    box-sizing:border-box;
    padding:0 30px;
    .head{
      width:100%;
      p{
        font-size:20px;
      }
    }
    .content{
      width:100%;
      align-self:flex-end;
      text-align:center;
    }
    .VueCarousel-navigation-prev,.VueCarousel-navigation-next{
      font-size:80px;
    }
  }
}
@media(max-width:600px){
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
</style>
