<template>
  <div>
    <loading :active.sync="isLoading"/>

    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark h3">{{ item.title }}</a>
            </h5>
            <p class="card-text h5 mb-4">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.origin_price| corrency }} 元</del>
            </div>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4">現在只要 {{ item.price| corrency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="productMore(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingCart===item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="singleMode" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ singleProduct.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="singleProduct.imageUrl" alt="" class="img-fluid">
            <blockquote class="blockquote">
              <p>{{ singleProduct.content }}</p>
              <footer class="blockquote-footer text-right">{{ singleProduct.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ singleProduct.origin_price | corrency }} 元</del>
              <div class="h5">現在只要 {{ singleProduct.price | corrency }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="singleProduct.qty">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ singleProduct.unit }}
              </option>
            </select>
            <div class="modal-footer">
              <div class="text-muted text-nowrap mr-3">
                小計<strong>{{ singleProduct.qty * singleProduct.price | corrency }}</strong>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addCart(singleProduct.id,singleProduct.qty)"><i class="fas fa-shopping-cart"></i>加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->

    <!--  加入購物車 -->
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th class="text-center">單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="!(cart.total==cart.final_total)">已套用優惠券</div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-center">{{ item.final_total | corrency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-center">{{ cart.total | corrency}}</td>
              </tr>
              <tr v-if="!(cart.total==cart.final_total)">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-center text-success">{{ cart.final_total | corrency}}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="cartCode">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="useCoupon">套用優惠碼</button>
              <button class="btn btn-outline-danger" type="button" @click="cancelCoupon">取消優惠碼</button>
            </div>
          </div>
      </div>
    </div>
    <!-- 加入購物車 -->

    <div class="my-5 row justify-content-center">
      <validation-observer class="col-md-6" v-slot="{ invalid }">
        <form @submit.prevent="createOrder">
          <div class="my-3">
            <validation-provider rules="required|email" v-slot="{ errors,classes }">
              <label for="email">Email</label>
              <input id="email" class="form-control" :class="classes" type="email" name="信箱" v-model="form.user.email" placeholder="請輸入 Email">
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="my-3">
            <validation-provider rules="required" v-slot="{ errors,classes }">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" :class="classes" name="姓名" id="username" v-model="form.user.name" placeholder="輸入姓名">
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="my-3">
            <validation-provider rules="required" v-slot="{ errors,classes }">
              <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" :class="classes" name="電話" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="my-3">
            <validation-provider rules="required" v-slot="{ errors,classes }">
              <label for="useraddress">收件人地址</label>
              <input type="text" class="form-control" :class="classes" name="地址" id="useraddress" v-model="form.user.address" placeholder="請輸入地址">
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="my-3">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'customerOrder',
  data () {
    return {
      products: {},
      singleProduct: {},
      cart: {},
      isLoading: false,
      cartCode: '',
      status: {
        loadingItem: '',
        loadingCart: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getProducts () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.isLoading = false
      })
    },
    productMore (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      vm.$http.get(api).then((response) => {
        $('#singleMode').modal('show')
        vm.singleProduct = response.data.product
        vm.singleProduct.qty = 1
        vm.status.loadingItem = ''
      })
    },
    addCart (id, qty = 1) {
      const vm = this
      vm.isLoading = true
      vm.status.loadingCart = id
      const cartDate = { 'product_id': id, 'qty': qty }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.post(api, { 'data': cartDate }).then((response) => {
        if (response.data.success) {
          $('#singleMode').modal('hide')
          vm.status.loadingCart = ''
          vm.getCart()
          vm.$bus.$emit('message:push', response.data.message, 'success')
        }
      })
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.cart = response.data.data
          vm.isLoading = false
        }
      })
    },
    removeCart (id) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.$http.delete(api).then((response) => {
        vm.getCart()
        vm.$bus.$emit('message:push', response.data.message, 'success')
      })
    },
    useCoupon () {
      const vm = this
      vm.isLoading = true
      let code = { 'code': vm.cartCode }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.$http.post(api, { 'data': code }).then((response) => {
        if (response.data.success) {
          vm.cart.final_total = response.data.data.final_total
          vm.$bus.$emit('message:push', response.data.message, 'success')
        }
        vm.isLoading = false
      })
    },
    cancelCoupon () {
      const vm = this
      vm.isLoading = true
      let code = { 'code': 'cancel' }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.$http.post(api, { 'data': code }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          vm.cart.final_total = response.data.data.final_total
          vm.$bus.$emit('message:push', '已經取消優惠卷', 'success')
        }
        vm.isLoading = false
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      vm.$http.post(api, { 'data': vm.form }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          console.log(response.data.orderId)
          vm.$router.push(`/adminCheckout/${response.data.orderId}`)
        }
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
