<template>
<div>
  <div class="search py-5 ">
    <div class="productListBN jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
      <div class="container">
        <h1 class="display-3 font-weight-bold text-white text-center">{{msg }}</h1>
      </div>
    </div>
    <div class="searchList pb-2 text-center container">
      <input type="text" v-model="orderId"  placeholder="請輸入訂單編號">
      <a href="#" class="btn bg-or" @click.prevent="searchOrder">查詢</a>
    </div>
    <div class="orderData" v-if="order.user.name">
      <h2 class="font-weight-bold">訂單資訊</h2>
      <div class="con">
        <p><span class="font-weight-bold">編號:</span> {{ order.id }}</p>
        <p><span class="font-weight-bold">訂單時間:</span> {{ order.paid_date | dateDue }}</p>
        <p><span class="font-weight-bold">訂單金額:</span> {{ order.total | corrency }}</p>
        <p><span class="font-weight-bold">付款狀態: </span>
          <span v-if="order.is_paid">已付款</span>
          <span v-if="!order.is_paid">尚未付款</span>
        </p>
        <hr>
        <p><span class="font-weight-bold">訂購姓名:</span> {{ order.user.name }}</p>
        <p><span class="font-weight-bold">訂購電話:</span> {{ order.user.tel }}</p>
        <p><span class="font-weight-bold">訂購地址:</span> {{ order.user.address }}</p>
        <p><span class="font-weight-bold">訂購信箱:</span> {{ order.user.email }}</p>
      </div>
      <h2 class="font-weight-bold">訂購產品</h2>
      <div class="con">
        <table>
          <thead>
            <tr>
              <td>產品名稱</td>
              <td>單價</td>
              <td>數量</td>
              <td>小計</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="title">{{ item.product.title }}</td>
              <td class="price">{{ item.product.price | corrency }}</td>
              <td class="qty">{{ item.qty }} {{ item.product.unit }}</td>
              <td class="total">{{ item.final_total | corrency }}</td>
              <div>
                  {{ item.product.coupon }}
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  metaInfo: {
    title: '訂單查詢'
  },
  data () {
    return {
      msg: '查詢訂單狀態',
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  methods: {
    searchOrder () {
      const vm = this
      if (vm.orderId !== '') {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.orderId}`
        vm.$http.get(api).then((response) => {
          if (response.data.order) {
            vm.order = response.data.order
          } else {
            this.$store.dispatch('alertModules/updateMessage', '查無此訂單，請重新操作')
          }
        })
      } else {
        this.$store.dispatch('alertModules/updateMessage', '請輸入訂單編號')
      }
    }
  },
  created () {
    this.$emit('closeNavList')
    this.$emit('cartSw', true)
    this.$store.dispatch('cartsModules/updateCartA', true)
  }
}
</script>

<style lang="scss" scoped>
.productListBN{
  background-image: url(~@/assets/images/productListBN.jpg);
  background-position:center 20%;
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
.search{
  width:900px;
  margin:0 auto;
  h1{
    width:100%;
  }
  table{
    width: 100%;
    thead{
      color: #4a5158;
      font-weight: bold;
      margin-top:20px;
      font-size:24px;
      td{
        padding:10px;
      }
    }
    tbody{
      background-color: #efefef;
      font-size:16px;
      line-height:2;
      tr{
        border-bottom:3px solid #fff;
      }
      td{
        padding:10px;
      }
    }
  }
}
.searchList{
  display:flex;
  justify-content:center;
  input{
    font-size:20px;
    padding:5px 10px;
    color: #333;
    border: 1px solid #CCC;
    border-radius: 5px;
    background-color: #f9f9f9;
    margin-right:5px;
  }
  a{
    font-size:20px;
    color: #FFFFFF;
    box-sizing:border-box;
    padding:5px 15px;
    border-radius: 5px;
    text-align: center;
    text-decoration:none;
  }
}
.orderData{
  h2{
    margin-top:20px;
    font-size:24px;
  }
  .con{
    border: 1px solid #999;
    box-sizing: border-box;
    padding:8px 15px;
    p{
      font-size:17px;
      margin-bottom:0px;
      line-height:2;
    }
  }
}

@media(max-width:768px){
  .search{
    width:98%;
    .jumbotron{
      padding:20px;
    }
  }
}

@media(max-width:600px){
  .productListBN{
    .display-3{
      font-size:28px;
    }
  }
  .search{
    width:98%;
    .jumbotron{
      padding:20px;
    }
  }
}
</style>
