<template>
  <div>
    <table class="table">
      <thead>
        <th width="5%">訂單編號</th>
        <th width="30%">購買內容</th>
        <th width="25%">買家資料</th>
        <th width="10%">應付金額</th>
        <th width="10%">備註</th>
        <th width="5%">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="order in orderList" :key="order.id">
          <td>{{ order.id }}</td>
          <td>
            <!-- 訂單中個別商品資訊 -->
            <div v-for="item in order.products" :key="item.id">
              <p>"{{ item.product.category }}" {{ item.product.title }} {{ item.qty }} {{ item.product.unit }}</p>
            </div>
            <!-- 訂單中個別商品資訊 -->
          </td>
          <td>
            <div>
              <p>姓名: {{ order.user.name }}</p>
              <p>電話: {{ order.user.tel }}</p>
              <p>地址: {{ order.user.address }}</p>
              <p>email: {{ order.user.email }}</p>
              <p>訂單時間: {{ order.create_at | dateDue }}</p>
            </div>
          </td>
          <td>{{ order.total | corrency }}</td>
          <td>{{ order.message }}</td>
          <td>
            <span class="text-success" v-if="order.is_paid">已經付款</span>
            <span class="text-danger" v-else>尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'orderList',
  data () {
    return {
      orderList: [],
      pagination: {}
    }
  },
  methods: {
    getOrderList (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$http.get(api).then((response) => {
        console.log(response.data)
        vm.pagination = response.data.pagination
        vm.orderList = response.data.orders
      })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>
