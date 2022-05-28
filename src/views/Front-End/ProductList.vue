<template>
  <div>
    <div class="productListOrder pt-3">
      <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end productListBN">
        <div class="indexContainer">
          <h1 class="display-3 font-weight-bold text-white">線上訂購</h1>
        </div>
      </div>
      <div class="indexContainer mb-3 arrange">
        <a href="#" class="btn" @click.prevent="changMode = 'slist'"><i class="fas fa-th-large"></i></a>
        <a href="#" class="btn ml-3" @click.prevent="changMode = 'etclist'"><i class="fas fa-list"></i></a>
      </div>
      <div class="indexContainer mainContant mb-1 d-flex justify-content-between flex-wrap">
        <div class="Group-list">
          <a href="#" class="h5 font-weight-bold co-or" @click.prevent="changGroup('all')">全部顯示</a>
          <a href="#" class="h5 font-weight-bold co-or" :class="{active: item == sortClass}" v-for="(item,key) in groupList" :key="key" @click.prevent="changGroup(item)">{{ item }}</a>
        </div>
        <div class="productList" :class="{'slist':changMode == 'slist','etclist':changMode == 'etclist'}">
          <div class="mb-4" v-for="item in productList" :key="item.id">
            <div class="card border-0 box-shadow text-center h-100">
              <div class="card-title">
                <img class="card-img-top" :src="item.imageUrl" alt="Card image cap">
                <div class="cardA">
                  <a href="#" :title="item.title" @click.prevent="moreProduct(item.id)"><i class="fas fa-search"></i></a>
                  <a href="#" :title="item.title"  @click.prevent="addCart(item.id)" v-if="item.is_enable"><i class="fas fa-shopping-cart"></i></a>
                  <p class="disabled" v-else><i class="fas fa-shopping-cart"></i></p>
                </div>
              </div>
              <div class="card-body">
                <a href="#" :title="item.title" @click.prevent="moreProduct(item.id)">
                  <h4>{{ item.title }}</h4>
                  <p class="h6 text-left">{{ item.description }}</p>
                  <div>
                    <p class="h5 text-muted text-left" v-show="item.origin_price !== item.price"><del>原價 {{ item.origin_price | corrency }}</del></p>
                    <p class="h4 font-weight-bold">網路價 <span class="h2 text-danger">{{ item.price | corrency }}</span></p>
                  </div>
                </a>
              </div>
              <div class="card-footer border-top-0 bg-white" v-if="!item.is_enable">
                <p href="#" class="btn btn-outline-secondary btn-block btn-sm disabled">缺貨中</p>
              </div>
              <div class="card-footer border-top-0 bg-white" v-if="item.is_enable">
                <a href="#" class="btn btn-or bo-or btn-sm" @click.prevent="addCart(item.id)">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>搶購去
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      sortClass: '',
      changMode: 'slist'
    }
  },
  methods: {
    moreProduct (pid) {
      this.$router.push(`/Product/${pid}`)
    },
    changGroup (sort) {
      if (this.$route.params.sortId !== sort) {
        this.sortClass = sort
        this.$store.dispatch('productsModules/changGroup', sort)
        this.$router.push(`/ProductList/${sort}`)
      }
    },
    addCart (pid, qty = 1) {
      this.$store.dispatch('cartsModules/addCart', { pid, qty })
    },
    ...mapActions('productsModules', ['getProducts'])
  },
  computed: {
    ...mapGetters('productsModules', ['productList', 'groupList'])
  },
  created () {
    this.$emit('closeNavList')
    this.$store.dispatch('cartsModules/updateCartA', true)
    this.$store.commit('productsModules/SORT', this.$route.params.sortId)
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.productListOrder{
  background:#f9f9f9;
}
.productListBN{
  background-image: url(~@/assets/images/productListBN.jpg);
  background-size:cover;
  background-position:center 70%;
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
.arrange {
  display:flex;
  justify-content:flex-end;
  a{
    color:#f28200;
    border:1px solid #f28200;
    &:hover{
      background:#f28200;
      color:#fff;
    }
  }
}
.mainContant{
  display:flex;
  justify-content:space-between;
}
.Group-list{
  width:20%;
  display:flex;
  flex-flow:column;
  flex-wrap:wrap;
  a{
    width:100%;
    box-sizing:border-box;
    padding:10px 20px;
    border:1px solid #f28200;
    text-decoration:none;
    &:hover{
      background:#f28200;
      color:white;
    }
    &.active{
      background:#f28200;
      color:white;
    }
  }
}
.productList{
  width:78%;
}
.slist{
  display:flex;
  flex-wrap:wrap;
  &>div{
    width:31%;
    margin:calc((100% - 93%)/6);
  }
  .card-title{
    position:relative;
    margin-bottom:0;
    img{
      width:100%;
      height:230px;
    }
    &:hover::after{
      content:'';
      z-index:0;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:#fff;
      opacity:0.6;
    }
    &:hover .cardA{
      cursor: pointer;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:20px;
      font-weight:bold;
      position:absolute;
      z-index:1;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    .cardA{
      display:none;
      a{
        text-decoration:none;
        background:transparent;
        border:1px solid #000;
        width:50px;
        height:50px;
        display:flex;
        align-items:center;
        justify-content:center;
        margin:0 10px;
        border-radius:5px;
        position:relative;
        i{
          color:#000;
        }
        &:hover{
          background:#000;
          &:nth-Child(1)::after{
            content:'查看商品';
            color:#000;
            position:absolute;
            top:100%;
            left:0;
            font-size:10px;
          }
          &:nth-Child(2)::after{
            content:'搶購去';
            color:#000;
            position:absolute;
            top:100%;
            left:0;
            font-size:10px;
          }
          i{
            color:#fff;
          }
        }
      }
      p{
        text-decoration:none;
        background:#000;
        color:#fff;
        width:50px;
        height:50px;
        display:flex;
        align-items:center;
        justify-content:center;
        margin:0 10px;
        border-radius:5px;
        position:relative;
        position:relative;
        z-index:10;
        cursor: not-allowed;
        &:hover::after{
          content:'商品已售完';
          color:#000;
          position:absolute;
          top:100%;
          left:-10%;
          width:120%;
          text-align:center;
          font-size:10px;
        }
      }
    }
  }
  .card-body{
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
    a{
      text-decoration:none;
      color:#000;
      &>div{
        margin-top:20px;
      }
    }
  }
  .card-footer{
    display:none;
  }
}
.etclist{
  &>div{
    width: 100%;
  }
  .card{
    display:flex;
    flex-flow:row;
    justify-content:space-between;
    align-items:center;
    padding:0 20px;
  }
  .card-title{
    margin-bottom:0;
    height:120px;
    width:120px;
    position:relative;
    overflow:hidden;
    flex-grow:0;
    flex-shrink:0;
    img{
      width:120px;
    }
  }
  .card-body{
    width:100%;
    text-align:left;
    flex-grow:2;
    flex-shrink:2;
    text-decoration:none;
    h4{
      font-weight: bold;
      margin-bottom: 10px;
      color:#f28200;
    }
    a{
      text-decoration:none;
      color:#000;
    }
  }
  .card-footer{
    display:flex;
    align-items:center;
    padding:0;
    flex-grow:0;
    flex-shrink:0;
    &>div{
      margin:0 20px 0 0 !important;
      .h5{
        font-size:16px;
      }
      .h4{
        display:flex;
        align-items:center;
        font-size:24px;
        span{
          margin-bottom:0;
        }
      }
    }
    a{
      width: auto;
    }
  }
}
@media(max-width:1050px){
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
  }
  .slist{
    .card-body{
      display:flex;
      align-items:stretch;
      a{
        height:100%;
        display:flex;
        flex-wrap:wrap;
        &>div{
          width:100%;
          align-self:flex-end;
        }
      }
      .h6{
        font-size: 15px;
      }
      h4{
        font-size: 20px;
      }
    }
  }
  .etclist{
    &>div{
      width: 100%;
      justify-content:space-between;
    }
    .card{
      width:100%;
      padding:0 20px;
    }
    .card-body{
      h4{
        font-weight: bold;
        margin-bottom: 10px;
      }
      p{
        line-height:1.6;
      }
    }
    .card-footer{
      &>div{
        margin: 0 10px 0 0 !important;
        .h5{
          font-size:16px;
        }
        .h4{
          display:flex;
          align-items:center;
          font-size:20px;
          span{
            margin-bottom:0;
          }
        }
      }
      a{
        width: auto;
      }
    }
  }
}
@media(max-width:768px){
  .productListOrder{
    background:#f9f9f9;
  }
  .mainContant{
    display:flex;
    justify-content:space-between;
  }
  .list-group{
    width:22%;
    a{
      padding:10px;
      font-size:20px;
    }
  }
  .productList{
    width:75%;
  }
  .slist{
    justify-content:flex-start;
    &>div{
      width:40%;
      margin:calc((100% - 80%)/4);
    }
    .card-title img{
      width: 100%;
      height: 190px;
      &:hover::after{
        display:none;
      }
    }
    .cardA{
      display:flex;
      a:nth-Child(1){
        display:block;
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;
        i{
          display:none;
        }
      }
      a:nth-Child(2){
        display:none;
      }
    }
    .card-body{
      padding:10px;
      .h6{
        font-size: 15px;
      }
      h4{
        font-size: 20px;
      }
    }
    .card-footer{
      display:block;
    }
  }
  .etclist{
    .card{
      padding-right:10px;
      box-sizing:border-box;
    }
    .card-title{
      margin-bottom:0;
      height:120px;
      width:120px;
      position:relative;
      overflow:hidden;
      img{
        width:120px;
      }
      &:hover::after{
        display:none;
      }
    }
    .cardA{
      display:flex;
      a:nth-Child(1){
        display:block;
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;
        i{
          display:none;
        }
      }
      a:nth-Child(2){
        display:none;
      }
    }
    .card-body{
      padding:10px;
    }
    .card-footer > {
      width:32%;
      div {
        .h5{
          display:none;
        }
        .h4{
          display:block;
        }
      }
      a{
        width:150px;
      }
    }
  }
}
@media(max-width:600px){
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
  .arrange{
    display:none;
  }
  .productList, .slist, .etclist{
    width:90%;
    margin:0 auto;
    justify-content:center;
    &>div{
      width:100%;
      flex:unset;
    }
    .card{
      display:block;
      padding:20px 10px;
    }
    .card-title{
      width: auto;
      height: auto;
      img{
        width: 250px;
        height: 250px;
      }
    }
    .card-body{
      padding:10px;
      width:auto;
      h4{
        font-size: 26px;
      }
      .h6{
        font-size: 15px;
      }
      .h4{
        text-align:center;
      }
    }
    .card-footer{
      width:100%;
      text-align:center;
      &>a{
        width:90%;
        margin:0 auto;
        font-size:18px;
      }
    }
  }
}
</style>
