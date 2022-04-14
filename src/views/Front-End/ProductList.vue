<template>
<div>

  <div class="productListOrder pt-3">
    <!-- banner -->
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end productListBN">
      <div class="container">
        <h1 class="display-3 font-weight-bold text-white">線上訂購</h1>
      </div>
    </div>
    <!-- banner -->

    <!-- main -->
    <div class="container mainContant mb-1 d-flex justify-content-between flex-wrap">
        <!-- 類別選單 (List group) -->
        <div class="list-group pb-2 text-left">
          <a href="#" class="h5 list-group-item font-weight-bold list-group-item-action list-group-item-light mb-0" @click.prevent="changGroup('all')">全部顯示</a>
          <a href="#" class="h5 list-group-item font-weight-bold list-group-item-action list-group-item-light mb-0" v-for="(item,key) in groupList" :key="key" @click.prevent="changGroup(item)">{{ item }}</a>
        </div>
        <!-- 類別選單 (List group) -->
        <!-- 主要商品列表 (Card) -->
        <div class="productList">
          <div class="mb-4" v-for="item in productList" :key="item.id">
            <div class="card border-0 box-shadow text-center h-100">
              <a href="#" class="card-title" @click.prevent="moreProduct(item.id)">
                <img class="card-img-top" :src="item.imageUrl" alt="Card image cap">
              </a>
              <div class="card-body">
                <h4>{{ item.title }}</h4>
                <p class="h6 text-left">{{ item.description }}</p>
              </div>
              <div class="card-footer border-top-0 bg-white" v-if="!item.is_enable">
                <a href="#" class="btn btn-outline-secondary btn-block btn-sm disabled">缺貨中</a>
              </div>
              <div class="card-footer border-top-0 bg-white pt-0" v-if="item.is_enable">
                <div class=" mb-4">
                  <p class="h5 text-muted text-left mb-1"  v-show="item.origin_price !== item.price"><del>原價 {{ item.origin_price | corrency }}</del></p>
                  <p class="h4 font-weight-bold">網路價 <span class="h2 text-danger">{{ item.price | corrency }}</span></p>
                </div>
                <a href="#" class="btn btn-outline-secondary btn-block btn-sm" @click.prevent="addCart(item.id)">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>搶購去
                </a>
              </div>
          </div>
        </div>
        <!-- 主要商品列表 (Card) -->
    </div>
    <!-- main -->
  </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    moreProduct (pid) {
      this.$router.push(`/Product/${pid}`)
    },
    changGroup (sort) {
      this.$store.dispatch('productsModules/changGroup', sort)
      this.$router.push(`/productList/${sort}`)
    },
    addCart (pid, qty = 1) {
      console.log(pid, qty)
      this.$store.dispatch('cartsModules/addCart', { pid, qty })
    },
    ...mapActions('productsModules', ['getProducts'])
  },
  computed: {
    ...mapGetters('productsModules', ['productList', 'groupList'])
  },
  created () {
    this.$emit('closeNavList')
    this.$emit('cartSwitch', true)
    this.sort = this.$route.params.sortId
    this.$store.commit('productsModules/SORT', this.$route.params.sortId)
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.productListOrder{
  background:#f9f9f9;
  .productListBN{
    background-image: url(../../assets/images/productListBN.jpg);
    background-position:center 200%;
    position:relative;
    &::after{
      content:'';
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:#000;
      opacity:0.5;
    }
    &>div{
      position:relative;
      z-index:5;
    }
  }
  .mainContant{
    display:flex;
    justify-content:space-between;
  }
  .list-group{
    width:20%;
  }
  .productList{
    width:78%;
    display:flex;
    flex-wrap:wrap;
    &>div{
      width:32%;
      margin:calc((100% - 96%)/6);
    }
    & .card-title{
      position:relative;
      img{
        width:100%;
        height:230px;
      }
    }
    & .card-title:hover::before{
      content:'查看商品';
      position:absolute;
      top:0;
      left:0;
      z-index:10;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      color:#fff;
      font-size:20px;
      font-weight:bold;
    }
    & .card-title:hover::after{
      content:'';
      font-size:20px;
      font-weight:bold;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:#000;
      opacity:0.6;
    }
    & .card-body{
      padding:10px;
      h4{
        font-weight:bold;
        color:#f28200;
        font-size:20px;
      }
      .h6{
        line-height:1.6;
        margin-bottom:0;
        font-size:16px;
      }
    }
  }
}
@media(max-width:1000px){
  .productListOrder{
    .list-group{
      width:28%;
    }
    .productList{
      width:70%;
      display:flex;
      flex-wrap:wrap;
      &>div{
        width:48%;
        margin:calc((100% - 96%)/6);
      }
    }
  }
}
@media(max-width:768px){
  .productListOrder{
    background:#f9f9f9;
    .mainContant{
      display:flex;
      justify-content:space-between;
    }
    .list-group{
      width:28%;
    }
    .productList{
      width:72%;
      justify-content:flex-start;
      &>div{
        width:48%;
        margin:calc((100% - 96%)/4);
      }
      .card-title img{
        width: 100%;
        height: 190px;
      }
      & .card-body{
        padding:10px;
        .h6{
          font-size: 15px;
        }
        h4{
          font-size: 20px;
        }
      }
    }
  }
}
@media(max-width:600px){
  .productListOrder{
    .mainContant{
      flex-wrap:wrap;
    }
    .list-group{
      width:90%;
      flex-flow:row;
      flex-wrap:wrap;
      margin:0 auto 20px auto;
      a{
        width:48%;
        margin:2% 1%;
        border: 1px solid rgba(0,0,0,0.125) !important;
      }
    }
    .productList{
      width:90%;
      margin:0 auto;
      justify-content:center;
      &>div{
        width:100%;
        flex:unset;
      }
      .card-title img{
        width: 100%;
        height: 260px;
      }
      & .card-body{
        padding:10px;
        .h6{
          font-size: 15px;
        }
        h4{
          font-size: 26px;
        }
      }
    }
  }
}
</style>
