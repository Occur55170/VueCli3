<template>
<div>
  <loading :active.sync="isLoading" />
  <div class="text-right">
    <button type="button" class="btn btn-primary mt-4" @click="editModal(true)">建立新產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <th width="10%">分類</th>
      <th width="50%">產品名稱</th>
      <th width="10%">原價</th>
      <th width="10%">售價</th>
      <th width="10%">是否啟用</th>
      <th width="10%">編輯</th>
    </thead>
    <tbody>
      <tr v-for='(item,key) in products' :key="key">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.origin_price | corrency }}</td>
        <td>{{ item.price | corrency }}</td>
        <td>
          <span v-if="item.is_enable">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <button type="button" class="btn btn-outline-primary btn-sm" @click="editModal(false,item)">編輯</button>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="delProduct(item.id)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination :pagination="pagination" @changePage="getProducts"></pagination>
  <!-- Modal -->
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
              </div>
              <div class="form-group">
                <label for="customFile">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileLoading"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="files" @change="updateImage">
              </div>
              <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                </div>
              </div>
              <hr>
              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled" :true-value="1" :false-value="0" v-model="tempProduct.is_enable">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
</div>
</template>

<script>
import $ from 'jquery'
import Pagination from './Pagination'

export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      status: {
        fileLoading: false
      }
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      vm.$store.dispatch('backendModules/updateload', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      this.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.$store.dispatch('backendModules/updateload', false)
        vm.pagination = response.data.pagination
      })
    },
    editModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({ ...item })
        this.isNew = false
      };
      $('#productModal').modal('show')
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethods = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethods = 'put'
      };
      this.$http[httpMethods](api, { 'data': vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#productModal').modal('hide')
          let message = '新增成功'
          let success = 'success'
          vm.$store.dispatch('backendModules/updateMessage', { message, success })
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          let message = '新增失敗'
          let success = 'danger'
          vm.$store.dispatch('backendModules/updateMessage', { message, success })
        };
      })
    },
    delProduct (productId) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${productId}`
      this.$http.delete(api).then((response) => {
        let message = response.data.message
        let success = 'success'
        vm.$store.dispatch('backendModules/updateMessage', { message, success })
        vm.getProducts()
      })
    },
    updateImage () {
      const vm = this
      vm.status.fileLoading = true
      const imgData = vm.$refs.files.files[0]
      const imgForm = new FormData()
      imgForm.append('file-to-upload', imgData)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.$http.post(api, imgForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        vm.status.fileLoading = false
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          let message = '圖片上傳成功'
          let success = 'success'
          vm.$store.dispatch('backendModules/updateMessage', { message, success })
        } else {
          let message = response.data.message
          let success = 'danger'
          vm.$store.dispatch('backendModules/updateMessage', { message, success })
        }
      })
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    Pagination
  }
}
</script>
