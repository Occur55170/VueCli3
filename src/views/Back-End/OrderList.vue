<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right">
    </div>
    <table class="table mt-4">
      <thead>
        <th width="20%">訂單編號</th>
        <th width="30%">購買內容</th>
        <th width="25%">買家資料</th>
        <th width="10%">應付金額</th>
        <th width="10%">修改訂單</th>
        <th width="5%">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="order in orderList" :key="order.id">
          <td>{{ order.id }}</td>
          <td>
            <div v-for="item in order.products" :key="item.id">
              <p>"{{ item.product.category }}" {{ item.product.title }} {{ item.qty }} {{ item.product.unit }}</p>
            </div>
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
          <td><button class="btn btn-primary" @click="editModal(order)">編輯</button></td>
          <td>
            <span class="text-success" v-if="order.is_paid">已經付款</span>
            <span class="text-danger" v-else>尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="oederModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-10 mx-auto my-2">
                <div class="form-group">
                  <label for="title">付款方式</label>
                  <input type="text" class="form-control" id="title" placeholder="付款方式" v-model="order.create_at">
                </div>
                <div class="form-group">
                  <label for="title">訂單編號</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="order.id">
                </div>
                <div class="form-group">
                  <label for="title">是否付款</label>
                  {{ order.is_paid }}
                  <!-- <input type="radio" name="location" v-modal="aaa" value="true" id="modePaidY"><label for="modePaidY">是</label>
                  <input type="radio" name="location" v-modal="aaa" value="false"  id="modePaidN"><label for="modePaidN">否</label> -->
                </div>
                <div class="form-group">
                  <label for="title">付款日期</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="order.paid_date">
                </div>
                <div class="form-group">
                  <label for="title">總額</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="order.total">
                </div>
                <div class="form-group row mt-3">
                  <div class="col-6 mb-3">
                    <label for="">買家姓名</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入姓名" v-model="order.user.name">
                  </div>
                  <div class="col-6 mb-3">
                    <label for="">買家電話</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入電話" v-model="order.user.tel">
                  </div>
                  <div class="col-6 mb-3">
                    <label for="">買家信箱</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入信箱" v-model="order.user.email">
                  </div>
                  <div class="col-6 mb-3">
                    <label for="">買家地址</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入地址" v-model="order.user.address">
                  </div>
                </div>
                <div class="form-group">
                  <ul class="mt-5">
                    <p>訂單商品 :</p>
                    <li v-for="(item, key) in order.products" :key="key">
                        {{ item.product.title }} 數量：{{ item.qty }}
                        {{ item.product.unit }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder(order.id)">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  name: 'orderList',
  data () {
    return {
      aaa: true,
      orderList: [],
      pagination: {},
      order: {
        user: {}
      },
      isLoading: false
    }
  },
  methods: {
    getOrderList (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$http.get(api).then((response) => {
        console.log(response.data)
        vm.pagination = response.data.pagination
        vm.orderList = response.data.orders
        vm.isLoading = false
      })
    },
    editModal (editOrder) {
      this.order = Object.assign({}, editOrder)
      $('#oederModal').modal('show')
    },
    updateOrder (oid) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${oid}`
      vm.$http.put(api, { data: vm.order }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'success')
          vm.isLoading = false
          $('#oederModal').modal('hide')
        }
      })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>
