<template>
<div>
  <div class="mt-4">
    <loading :active.sync="isLoading" />
    <div class="text-right">
      <button class="btn btn-outline-secondary btn-sm" @click="openModal">新增優惠卷</button>
    </div>
    <table class="table mt-4 mx-auto col-12">
      <thead>
        <th width="15%">主題名稱</th>
        <th class="text-center" width="15%">折扣率</th>
        <th class="text-center" width="20%">折扣碼</th>
        <th class="text-center" width="20%">折扣截止日</th>
        <th class="text-center" width="10%">是否啟用</th>
        <th class="text-center" width="20%">編輯</th>
      </thead>
      <tbody>
        <tr v-for="item in Coupon" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-center">{{ item.percent }}%</td>
          <td class="text-center">{{ item.code }}</td>
          <td class="text-center">{{ item.due_date | dateDue }}</td>
          <td class="text-center">
            <span v-if="item.is_enable==1">是</span>
            <span v-else>否</span>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="removeCoupon(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal -->
    <div class="modal fade" id="CouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">主題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="modalItem.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-9">
                    <label for="price">折扣碼</label>
                    <input type="unit" class="form-control" id="unit" placeholder="請輸入折扣碼" v-model="modalItem.code">
                  </div>
                  <div class="form-group col-md-3">
                    <label for="category">折扣%數</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入%數" v-model="modalItem.percent">
                  </div>
                  <div class="form-group col-12">
                    <label for="origin_price">折扣截止日</label>
                    <div class="d-flex mb-3">
                      <input type="text" class="form-control col-2 mx-2" id="category" placeholder="年" v-model.number="modalItem.year">
                      <input type="text" class="form-control col-2 mx-2" id="category" placeholder="月" v-model.number="modalItem.month">
                      <input type="text" class="form-control col-2 mx-2" id="category" placeholder="日" v-model.number="modalItem.day">
                      <select name="" id="" class="px-3 mx-2" v-model="modalItem.hour">
                        <option value="00">00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                      </select>
                      <select name="" id="" class="px-3 mx-2" v-model="modalItem.min">
                        <option value="00">00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                      </select>
                      <select name="" id="" class="px-3 mx-2" v-model="modalItem.sec">
                        <option value="00">00</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enable" v-model="modalItem.is_enable" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enable">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="editCoupon()">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="cancalEditCoupon">取消</button>
            <button type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Coupon',
  data () {
    return {
      Coupon: {},
      modalItem: {
        title: '測試用',
        code: 'testcode',
        percent: '70',
        due_date: '-28800',
        is_enable: '1'
      },
      isLoading: false,
      isNew: true
    }
  },
  methods: {
    getCoupon (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          console.log(response.data)
          vm.Coupon = response.data.coupons
          vm.isLoading = false
        }
      })
    },
    openModal (isNew, item) {
      const vm = this
      vm.isNew = isNew
      $('#CouponModal').modal('show')
      if (isNew) {
        vm.modalItem = {}
        vm.modalItem.year = '1970'
        vm.modalItem.month = '01'
        vm.modalItem.day = '01'
        vm.modalItem.hour = '00'
        vm.modalItem.min = '00'
        vm.modalItem.sec = '00'
      } else {
        vm.isNew = false
        vm.modalItem = Object.assign({}, item)
        let timestamp = new Date(vm.modalItem.due_date * 1000)
        vm.modalItem.year = timestamp.getFullYear()
        vm.modalItem.month = timestamp.getMonth() + 1
        vm.modalItem.day = timestamp.getDate()
        vm.modalItem.hour = timestamp.getHours()
        vm.modalItem.min = timestamp.getMinutes()
        vm.modalItem.sec = timestamp.getSeconds()
      }
    },
    editCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let mode = 'post'
      let date = `${vm.modalItem.year}-${vm.modalItem.month}-${vm.modalItem.day} ${vm.modalItem.hour}:${vm.modalItem.min}:${vm.modalItem.sec} `
      vm.modalItem.due_date = new Date(date).getTime() / 1000
      if (!vm.isNew) {
        mode = 'put'
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.modalItem.id}`
      }
      vm.$http[mode](api, { 'data': vm.modalItem }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#CouponModal').modal('hide')
          vm.getCoupon()
          vm.isNew = true
        } else {
          $('#CouponModal').modal('hide')
          vm.isNew = true
        }
      })
    },
    cancalEditCoupon () {
      $('#CouponModal').modal('hide')
      this.isNew = true
      this.tempCoupon = {}
    },
    removeCoupon (id) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`
      vm.$http.delete(api).then((response) => {
        vm.getCoupon()
      })
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>
