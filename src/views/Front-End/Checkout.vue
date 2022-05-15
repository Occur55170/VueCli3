<template>
  <div>
    <div class="py-5 mb-5 container" v-if="cart.carts.length==0">
      <h2 class="text-center font-weight-bold">您的購物車目前是空的</h2>
      <div class="alert alert-info p-3 px-5 col-6 mx-auto" role="alert">
        您可以前往<a href="#" class="text-primary" @click.prevent="cancelOrder">產品列表</a>，以選購您想要的商品。
      </div>
    </div>
    <div class="checkoutBG main-contant py-5" id="product1" v-if="cart.carts.length!==0">
      <!-- 步驟 -->
      <section class="stepList container mb-3">
          <div class="alert alert-rounded mb-0" role="alert" :class="{['alert-success']:step==1,['alert-light']:step!==1}">
            1.確認購物車
          </div>
          <div class="alert alert-rounded mb-0" role="alert" :class="{['alert-success']:step==2,['alert-light']:step!==2}">
            2.填寫訂購資訊
          </div>
          <div class="alert alert-rounded mb-0" role="alert" :class="{['alert-success']:step==3,['alert-light']:step!==3}">
            3.確認購物資訊
          </div>
      </section>
      <!-- 步驟 -->
      <!-- 1.購物車 -->
      <section class="container justify-content-center bg-white p-4 step1Con" v-if="step==1">
        <h2 class="text-center w-100 font-weight-bold checkoutBGsss">1.購物車</h2>
        <table class="table my-3">
          <thead>
            <tr>
              <th></th>
              <th>商品名稱</th>
              <th class="text-right">金額</th>
              <th class="text-right">數量</th>
              <th class="text-right">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id" class="border-bottom">
              <td class="align-middle text-center py-5">
                <a href="#" class="text-muted h4" @click.prevent="removeCart(item.product.id, false)">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </td>
              <td class="align-middle">
                <img :src="item.product.imageUrl" class="prodImg img-thumbnail" :alt="item.product.title">
                  {{ item.product.title }}
              </td>
              <td class="align-middle text-right">{{ item.product.price|corrency }}</td>
              <td class="align-middle text-right">{{ item.qty }} {{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total|corrency }}</td>
            </tr>
            <tr v-if="cart.final_total==cart.total">
              <td colspan="4" class="text-right border-top-0">訂單金額</td>
              <td class="text-right border-top-0">
                <strong>{{ cart.total|corrency }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <button type="button" class="btn mx-2 btn-outline-secondary" @click.prevent="cancelOrder">繼續選購</button>
          <button type="button" class="btn mx-2 text-white nextStep" @click.prevent=" step++ ">確認，下一步</button>
        </div>
      </section>
      <!-- 1.購物車 -->
      <!-- 2.填寫訂購資訊 -->
      <section class="container bg-white p-4 mt-5 step2Con" v-if="step==2">
        <h2 class="text-center w-100 font-weight-bold">2.填寫訂購資訊</h2>
        <validation-observer class="mb-3" v-slot="{ invalid }">
          <form class="col-12">
            <div class="basicInfo mb-4 d-flex flex-wrap">
              <h5 class="font-weight-bold w-100">基本資料</h5>
              <validation-provider rules="required" v-slot="{ errors,classes }" class="form-group nameInput">
                <label for="username">收件人姓名</label>
                <input type="text" class="form-control" :class="classes" name="姓名" id="username" v-model="form.user.name" placeholder="輸入姓名">
                <span class="invalid-feedback">{{  errors[0]  }}</span>
              </validation-provider>
              <validation-provider rules="required|email" v-slot="{ errors,classes }" class="form-group emailInput">
                <label for="email">收件人信箱</label>
                <input type="text" class="form-control" :class="classes" name="信箱" id="email" v-model="form.user.email" placeholder="輸入信箱">
                <span class="invalid-feedback">{{  errors[0]  }}</span>
              </validation-provider>
              <validation-provider rules="required" v-slot="{errors,classes}" class="form-group phoneInput">
                <label for="tel">電話</label>
                <input type="text" class="form-control" id="tel" :class="classes" name="電話" v-model.number="form.user.tel" placeholder="電話" required maxlength="20">
                <span class="invalid-feedback">{{  errors[0]  }}</span>
              </validation-provider>
              <div class="form-group addressInput">
                <label for="city" class="w-100">居住地</label>
                <div>
                  <select name="city" id="city" class="form-control" required>
                    <option value="縣市" disabled selected>縣市</option>
                    <option value="台北市">台北市</option>
                    <option value="台南市">台南市</option>
                    <option value="高雄市">高雄市</option>
                  </select>
                  <validation-provider reles="required" v-slot="{errors,classes}" class="pr-0">
                    <input type="text" class="form-control" :class="classes" name="地址" id="inputAddress" v-model="form.user.address" placeholder="請填寫地址" required>
                    <span class="invalid-feedback">{{  errors[0]  }}</span>
                  </validation-provider>
                </div>
              </div>
            </div>
            <div class="pay mb-4">
              <h5 class="font-weight-bold">付款方式</h5>
              <a href="#" @click.prevent="payMode='信用卡'" class="payModeA text-decoration-none" :class="{'click':payMode=='信用卡'}">信用卡</a>
              <a href="#" @click.prevent="payMode='代碼繳費'" class="payModeA text-decoration-none" :class="{'click':payMode=='代碼繳費'}">代碼繳費</a>
              <a href="#" @click.prevent="payMode='現金轉帳'" class="payModeA text-decoration-none" :class="{'click':payMode=='現金轉帳'}">現金轉帳</a>
              <form class="creaditFrom" v-if="payMode=='信用卡'">
                <div class="form-group d-flex flex-wrap">
                <validation-provider rules="required" v-slot="{ errors,classes }" class="col-12 mb-3">
                  <label for="cardNumber" class="control-label">卡號</label>
                  <div class="input-group">
                    <input type="text" maxlength="12" id="cardNumber" name="卡號" v-model.number="credit.cardNum" :class="classes" class="form-control cardNumber" placeholder="**** **** **** ****">
                    <span class="invalid-feedback">{{  errors[0]  }}</span>
                  </div>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors,classes }" class="form-group col-6">
                  <label for="expireDate" class="control-label">卡片有效月年</label>
                  <input type="text" id="expireDate" name="卡片有效月年" v-model="credit.expireDate" :class="classes"  class="form-control expireDate" placeholder="MM / YY">
                  <span class="invalid-feedback">{{  errors[0]  }}</span>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors,classes }" class="form-group col-6">
                  <label for="cvc" class="control-label">卡片背面檢查碼</label>
                  <input type="text" id="cvc" name="卡片背面檢查碼" v-model="credit.cvc" :class="classes"  class="form-control cvc" placeholder="卡片背面檢查碼">
                  <span class="invalid-feedback">{{  errors[0]  }}</span>
                </validation-provider>
                </div>
              </form>
            </div>
            <div class="mb-4">
              <h5 class="font-weight-bold">使用優惠卷</h5>
              <div class="couponCon mt-3">
                <input type="text" class="m-2" placeholder="請輸入優惠碼" v-model="couponCode">
                <div>
                  <button type="button" class="m-2 btn btn-outline-secondary" @click="addCoupon(couponCode)">套用優惠碼</button>
                </div>
              </div>
              <p v-if="cart.final_total==cart.total" class="CouponTip text-danger my-2 px-2 h6">現在輸入優惠碼"2022"，即可享有8折優惠喔!</p>
              <p v-if="cart.final_total!==cart.total" class="CouponTip text-success my-0 px-2 h6">已成功套用優惠卷</p>
            </div>
            <div class="remark input-group mb-4 mt-5 px-2">
              <div class="input-group-prepend">
                <label for="msg" class="input-group-text">備註</label>
              </div>
              <textarea id="msg" aria-label="With textarea" class="form-control"></textarea>
            </div>
            <div class="text-right">
              <button type="button" class="btn mx-2 btn-outline-secondary" @click.prevent="step--">上一步</button>
              <button type="submit" class="btn mx-2 text-white nextStep" @click.prevent="step++" :disabled="invalid">確認，下一步</button>
            </div>
          </form>
        </validation-observer>
      </section>
      <!-- 2.填寫訂購資訊 -->
      <!-- 3.確認購物資訊 -->
      <div class="container mt-5 step3Con" id="productModal3" v-if="step==3">
        <section class="bg-white py-3 mx-auto">
          <h2 class="w-100 font-weight-bold text-center mb-3">確認購物資訊</h2>
          <div class="form-group col-12">
            <h3>訂單內容</h3>
            <table class="table">
              <thead>
                <tr>
                  <td class="text-left">商品名稱</td>
                  <td class="text-center">單價</td>
                  <td class="text-center">數量</td>
                  <td class="text-right">金額</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="text-left">{{ item.product.title }}</td>
                  <td class="text-left">{{ item.product.price }}</td>
                  <td class="text-center">{{ item.qty }} {{ item.product.unit }}</td>
                  <td class="text-right">{{ item.product.price * item.qty|corrency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="cart.final_total!==cart.total">
                  <td colspan="3" class="text-right border-top-0">小計</td>
                  <td class="text-right border-top-0">{{ cart.total|corrency }}</td>
                </tr>
                <tr v-if="cart.final_total!==cart.total">
                  <td colspan="3" class="text-right border-top-0">優惠折扣</td>
                  <td class="text-right border-top-0">-{{ cart.total-cart.final_total|corrency }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right border-top-0 text-danger">總計</td>
                  <td class="text-right border-top-0">{{ cart.final_total|corrency }}</td>
                </tr>
              </tfoot>
            </table>
            <h3>賣家資料</h3>
            <table class="table">
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{{ form.user.email }}</td>
                </tr>
                <tr>
                  <td>姓名:</td>
                  <td>{{ form.user.name }}</td>
                </tr>
                <tr>
                  <td>電話:</td>
                  <td>{{ form.user.tel }}</td>
                </tr>
                <tr>
                  <td>付款方式:</td>
                  <td>{{ payMode }}</td>
                </tr>
                <tr>
                  <td>地址:</td>
                  <td>{{ form.user.address }}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-center">
              <button type="button" class="btn mx-2 btn-secondary" @click.prevent="step--">上一步</button>
              <button type="submit" class="btn mx-2 btn-primary" @click.prevent="createOrder">確定付款</button>
            </div>
          </div>
        </section>
      </div>
      <!-- 3.確認購物資訊 -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      payMode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      credit: {
        cardNum: '',
        expireDate: '',
        cvc: ''
      },
      step: 1,
      couponCode: '',
      CouponTip: ''
    }
  },
  methods: {
    cancelOrder () {
      this.$router.push('/ProductList/all')
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.$http.post(api, { 'data': { 'user': vm.form.user, 'message': vm.form.message } }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/Pay/${response.data.orderId}`)
        }
      })
    },
    addCoupon (couponCode) {
      this.$store.dispatch('addCoupon', couponCode)
    },
    removeCart (pid) {
      this.$store.dispatch('cartsModules/UpdateRemoveCart', pid)
    },
    ...mapActions('cartsModules', ['cleartCart'])
  },
  computed: {
    ...mapGetters('cartsModules', ['cart'])
  },
  created () {
    this.$store.dispatch('updateLoad', true)
    this.$emit('closeNavList')
    this.$store.dispatch('cartsModules/updateCartA', true)
    this.$store.dispatch('cartsModules/updateCartA', false).then(() => {
      if (!(localStorage.getItem('checkoutStep'))) {
        this.$router.push('/')
      } else {
        this.cleartCart()
        localStorage.removeItem('checkoutStep')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.checkoutBG {
  background:#f1f1f1;
  h2 {
    margin-bottom:50px;
  }
  .stepList {
    display:flex;
    justify-content:center;
    &>div {
      margin:0 10px;
      font-size:18px;
    }
  }
  .nextStep {
    background:#f28200;
  }
  .step1Con {
    table {
      font-size:18px;
      thead {
        th:nth-Child(1) {
          width:10%;
        }
        th:nth-Child(2) {
          width:40%;
        }
        th:nth-Child(3) {
          width:15%;
        }
        th:nth-Child(4) {
          width:20%;
        }
        th:nth-Child(5) {
          width:20%;
        }
      }
    }
    .prodImg {
      width:100px;
      margin: 0 20px 0 0;
    }
  }
  .step2Con {
    width:900px;
    .basicInfo {
      &>span {
        padding:10px 10px 0 10px;
        width:50%;
        margin-bottom:10px;
      }
    }
    .addressInput {
      width:100%;
      padding:10px 10px 0 10px;
      &>div {
        display:flex;
      }
      select {
        width:20%;
        margin-right:2%;
      }
      span {
        width:100%;
      }
    }
    .payModeA {
      color: #6c757d;
      padding:8px 15px;
      display:inline-block;
      margin: 10px;
      border-color: #6c757d;
      border:1px solid #6c757d;
      border-radius:10px;
      box-sizing:border-box;
      overflow:hidden;
      &::before {
        content:'\f111';
        font-family:"Font Awesome 5 Free";
        border-radius:99em;
        margin-right:5px;
        opacity: 1;
      }
      &.click::before {
        content:'\f058';
        font-family:"Font Awesome 5 Free";
        border-radius:99em;
        color:#6c757d;
        opacity: 1;
      }
      &:hover {
        outline: 2px solid #ff6855;
        border-color: transparent;
        box-sizing:border-box;
      }
    }
    .creaditFrom {
      .NumiCon {
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        background:#E0E0E0;
        padding:8px;
        box-sizing:border-box;
        font-size:20px;
      }
    }
    .couponCon {
      display:flex;
      width:80%;
      input {
        padding:0 10px;
        width:70%;
      }
      &>div {
        width:30%;
        width:auto;
        display:flex;
      }
    }
    .remark {
      width:75%;
    }
  }
  .step3Con {
    width:900px;
    section {
      padding:0 5%;
    }
    table {
      font-size:16px;
      tfoot {
        border-top:1px solid #999;
        td {padding:8px 10px;}
        &>tr:last-Child {font-size:24px;font-weight:bold;}
      }
    }
  }
}
@media(max-width:1024px) {
  .checkoutBG {
    .step2Con {
      .couponCon {
        display:flex;
        width:100%;
        input {
          padding:0 10px;
          width:66%;
        }
        &>div {
          width:32%;
          button {
            margin:5px !important;
            padding:5px;
          }
        }
      }
    }
  }
}
@media(max-width:600px) {
  .checkoutBG {
    .stepList {
      padding: 0 10px;
      &>div {
        padding:10px;
        margin: 0 3px;
        font-size: 14px;
      }
    }
    .step1Con {
      table {
        font-size: 16px;
        thead {
          th:nth-Child(1) {
            width:8%;
          }
          th:nth-Child(2) {
            width:50%;
          }
          th:nth-Child(3) {
            width:20%;
          }
          th:nth-Child(4) {
            width:20%;
          }
        }
      }
      .prodImg{display:none;}
    }
    .step2Con {
      width:100%;
      .basicInfo {
        &>span {
          width:100%;
        }
      }
      .addressInput {
        &>div {
          flex-wrap:wrap;
        }
        select {
          width:50%;
          margin-bottom:10px;
        }
        span {
          width:100%;
        }
      }
      .pay {
        display:flex;
        flex-wrap:wrap;
        h5 {
          width:100%;
        }
        .payModeA {
          width:auto;
          margin: 10px 5px;
          padding: 4px 8px;
        }
      }
      .couponCon {
        input {
          padding:5px 10px;
          font-size:16px;
          width:100%;
          margin:0 !important;
        }
        &>div {
          width:50%;
          button {
            background:#6c757d;
            color:#fff;
            font-size:14px;
          }
        }
        &>p {
          font-size:16px;
        }
      }
      .remark {
        width:100%;
        margin:20px 0 30px 0!important;
      }
    }
    .step3Con {
      width:100%;
    }
  }
}
</style>
