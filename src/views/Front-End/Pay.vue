<template>
  <div>
    <div class="pay">
      <h1 class="text-center mb-3 text-secondary font-weight-bold">結帳成功</h1>
      <p class="instruct">來店時需出示證件，確認身分後即可取餐</p>
      <table class="table table-sm">
        <thead>
          <tr>
            <th class="col-2"></th>
            <th class="col-6">商品名稱</th>
            <th class="col-2">數量</th>
            <th class="col-2">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,key) in order.products" :key="key">
            <td class="align-middle">
              <img :src="item.product.imageUrl" class="img-fluid img-thumbnail" :alt="item.product.title">
            </td>
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total | corrency }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">金額</td>
            <td class="text-right">
              {{ order.total | corrency }}
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">運費</td>
            <td class="text-right">
              $60
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-right h3">總計</td>
            <td class="text-right h3">
              <strong>{{ order.total+60 | corrency }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="coustomer">
        <h2 class="text-left mt-5 font-weight-bold">買家資料</h2>
        <p>
          <span>訂單編號:</span>
          <span>{{ orderId }}</span>
        </p>
        <p>
          <span>姓名:</span>
          <span>{{ order.user.name }}</span>
        </p>
        <p>
          <span>Email:</span>
          <span>{{ order.user.email }}</span>
        </p>
        <p>
          <span>電話:</span>
          <span>{{ order.user.tel }}</span>
        </p>
        <p>
          <span>地址:</span>
          <span>{{ order.user.address }}</span>
        </p>
        <p>
          <span>時間:</span>
          <span>{{ order.create_at | dateDue }}</span>
        </p>
      </div>
      <div class="text-center h2 mt-3">
        <RouterLink to="/ProductList/all" class="btn btn-outline-secondary">返回產品列表頁</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  methods: {
    getOrder () {
      const vm = this
      vm.$store.dispatch('updateLoad', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.searchOrder()
        }
      })
    },
    searchOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.order = response.data.order
          vm.$store.dispatch('cartsModules/initCart')
          vm.$store.dispatch('updateLoad', false)
        }
      })
    }
  },
  created () {
    this.$emit('closeNavList')
    this.orderId = this.$route.params.id
    this.getOrder()
  }
}
</script>

<style lang="scss" scoped>
.pay{
  max-width:900px;
  margin:0 auto;
  padding: 30px 5%;
  .instruct{
    text-align: center;
    font-size:18px;
  }
  table{
    font-size:18px;
  }
  .coustomer{
    font-size:18px;
    h2{margin-bottom:20px;}
  }
}
@media(max-width:768px){
  .pay{
    table{
      font-size:16px;
    }
    .coustomer{
      font-size:16px;
      h2{margin-bottom:20px;}
    }
  }
}
@media(max-width:600px){
  h2{
    margin-top: 30px !important;
  }
}
</style>
