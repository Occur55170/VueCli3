(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65170ab2"],{"017a":function(t,a,e){"use strict";e.r(a);var s=function(){var t,a,e,s=this,r=s.$createElement,o=s._self._c||r;return o("div",[0==s.cart.carts.length?o("div",{staticClass:"py-5 mb-5 container"},[o("h2",{staticClass:"text-center font-weight-bold"},[s._v("您的購物車目前是空的")]),o("div",{staticClass:"alert alert-info p-3 px-5 col-6 mx-auto",attrs:{role:"alert"}},[s._v("\n      您可以前往"),o("a",{staticClass:"text-primary",attrs:{href:"#",type:"button"},on:{click:function(t){return t.preventDefault(),s.cancelOrder()}}},[s._v("產品列表")]),s._v("，以選購您想要的商品。\n    ")])]):s._e(),0!==s.cart.carts.length?o("div",{staticClass:"checkoutBG main-contant py-5",attrs:{id:"product1"}},[o("section",{staticClass:"stepList container mb-3"},[o("div",{staticClass:"alert alert-rounded mb-0",class:(t={},t["alert-success"]=1==s.step,t["alert-light"]=1!==s.step,t),attrs:{role:"alert"}},[s._v("\n          1.確認購物車\n        ")]),o("div",{staticClass:"alert alert-rounded mb-0",class:(a={},a["alert-success"]=2==s.step,a["alert-light"]=2!==s.step,a),attrs:{role:"alert"}},[s._v("\n          2.填寫訂購資訊\n        ")]),o("div",{staticClass:"alert alert-rounded mb-0",class:(e={},e["alert-success"]=3==s.step,e["alert-light"]=3!==s.step,e),attrs:{role:"alert"}},[s._v("\n          3.確認購物資訊\n        ")])]),1==s.step?o("section",{staticClass:"container justify-content-center bg-white p-4 step1Con"},[o("h2",{staticClass:"text-center w-100 font-weight-bold checkoutBGsss"},[s._v("1.購物車")]),o("table",{staticClass:"table my-3"},[s._m(0),o("tbody",[s._l(s.cart.carts,(function(t){return o("tr",{key:t.id,staticClass:"border-bottom"},[o("td",{staticClass:"align-middle text-center py-5"},[o("a",{staticClass:"text-muted h4",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),s.removeCart(t.id,!1)}}},[o("i",{staticClass:"fas fa-trash-alt"})])]),o("td",{staticClass:"align-middle"},[o("img",{staticClass:"prodImg img-thumbnail",attrs:{src:t.product.imageUrl,alt:t.product.title}}),s._v("\n                "+s._s(t.product.title))]),o("td",{staticClass:"align-middle text-right"},[s._v(s._s(t.qty)+" "+s._s(t.product.unit))]),o("td",{staticClass:"align-middle text-right"},[s._v(s._s(s._f("corrency")(t.product.price)))])])})),s.cart.final_total!==s.cart.total?o("tr",[o("td",{staticClass:"text-right border-top-0",attrs:{colspan:"3"}},[s._v("商品總額")]),o("td",{staticClass:"text-right border-top-0"},[o("strong",[s._v(s._s(s._f("corrency")(s.cart.total)))])])]):s._e(),s.cart.final_total!==s.cart.total?o("tr",[o("td",{staticClass:"text-right border-top-0",attrs:{colspan:"3"}},[s._v("優惠折扣")]),o("td",{staticClass:"text-right border-top-0"},[o("strong",[s._v(s._s(s._f("corrency")(s.cart.total-s.cart.final_total)))])])]):s._e(),o("tr",[o("td",{staticClass:"text-right border-top-0 text-danger",attrs:{colspan:"3"}},[s._v("總計")]),o("td",{staticClass:"text-right border-top-0"},[o("strong",[s._v(s._s(s._f("corrency")(s.cart.final_total)))])])])],2)]),o("div",{staticClass:"text-right"},[o("button",{staticClass:"btn mx-2 btn-outline-secondary",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),s.cancelOrder()}}},[s._v("繼續選購")]),o("button",{staticClass:"btn mx-2 text-white nextStep",attrs:{type:"button"},on:{click:function(t){t.preventDefault(),s.step++}}},[s._v("確認，下一步")])])]):s._e(),2==s.step?o("section",{staticClass:"container bg-white p-4 mt-5 step2Con"},[o("h2",{staticClass:"text-center w-100 font-weight-bold"},[s._v("2.填寫訂購資訊")]),o("validation-observer",{staticClass:"mb-3",scopedSlots:s._u([{key:"default",fn:function(t){var a=t.invalid;return[o("form",{staticClass:"col-12"},[o("div",{staticClass:"basicInfo mb-4 d-flex flex-wrap"},[o("h5",{staticClass:"font-weight-bold w-100"},[s._v("基本資料")]),o("validation-provider",{staticClass:"form-group nameInput",attrs:{rules:"required"},scopedSlots:s._u([{key:"default",fn:function(t){var a=t.errors,e=t.classes;return[o("label",{attrs:{for:"username"}},[s._v("收件人姓名")]),o("input",{directives:[{name:"model",rawName:"v-model",value:s.form.user.name,expression:"form.user.name"}],staticClass:"form-control",class:e,attrs:{type:"text",name:"姓名",id:"username",placeholder:"輸入姓名"},domProps:{value:s.form.user.name},on:{input:function(t){t.target.composing||s.$set(s.form.user,"name",t.target.value)}}}),o("span",{staticClass:"invalid-feedback"},[s._v(s._s(a[0]))])]}}],null,!0)}),o("validation-provider",{staticClass:"form-group emailInput",attrs:{rules:"required|email"},scopedSlots:s._u([{key:"default",fn:function(t){var a=t.errors,e=t.classes;return[o("label",{attrs:{for:"email"}},[s._v("收件人信箱")]),o("input",{directives:[{name:"model",rawName:"v-model",value:s.form.user.email,expression:"form.user.email"}],staticClass:"form-control",class:e,attrs:{type:"text",name:"信箱",id:"email",placeholder:"輸入信箱"},domProps:{value:s.form.user.email},on:{input:function(t){t.target.composing||s.$set(s.form.user,"email",t.target.value)}}}),o("span",{staticClass:"invalid-feedback"},[s._v(s._s(a[0]))])]}}],null,!0)}),o("validation-provider",{staticClass:"form-group phoneInput",attrs:{rules:"required"},scopedSlots:s._u([{key:"default",fn:function(t){var a=t.errors,e=t.classes;return[o("label",{attrs:{for:"tel"}},[s._v("電話")]),o("input",{directives:[{name:"model",rawName:"v-model.number",value:s.form.user.tel,expression:"form.user.tel",modifiers:{number:!0}}],staticClass:"form-control",class:e,attrs:{type:"text",id:"tel",name:"電話",placeholder:"電話",required:"",maxlength:"20"},domProps:{value:s.form.user.tel},on:{input:function(t){t.target.composing||s.$set(s.form.user,"tel",s._n(t.target.value))},blur:function(t){return s.$forceUpdate()}}}),o("span",{staticClass:"invalid-feedback"},[s._v(s._s(a[0]))])]}}],null,!0)}),o("div",{staticClass:"form-group addressInput"},[o("label",{staticClass:"w-100",attrs:{for:"city"}},[s._v("居住地")]),o("div",[o("select",{staticClass:"form-control",attrs:{name:"",id:"city",required:""}},[o("option",{attrs:{value:"縣市",disabled:"",selected:""}},[s._v("縣市")]),o("option",{attrs:{value:"台北市"}},[s._v("台北市")]),o("option",{attrs:{value:"台南市"}},[s._v("台南市")]),o("option",{attrs:{value:"高雄市"}},[s._v("高雄市")])]),o("validation-provider",{staticClass:"pr-0",attrs:{reles:"required"},scopedSlots:s._u([{key:"default",fn:function(t){var a=t.errors,e=t.classes;return[o("input",{directives:[{name:"model",rawName:"v-model",value:s.form.user.address,expression:"form.user.address"}],staticClass:"form-control",class:e,attrs:{type:"text",name:"地址",id:"inputAddress",placeholder:"請填寫地址",required:""},domProps:{value:s.form.user.address},on:{input:function(t){t.target.composing||s.$set(s.form.user,"address",t.target.value)}}}),o("span",{staticClass:"invalid-feedback"},[s._v(s._s(a[0]))])]}}],null,!0)})],1)])],1),o("div",{staticClass:"pay mb-4"},[o("h5",{staticClass:"font-weight-bold"},[s._v("付款方式")]),o("a",{staticClass:"payModeA text-decoration-none",class:{click:"信用卡"==s.payMode},attrs:{href:""},on:{click:function(t){t.preventDefault(),s.payMode="信用卡"}}},[s._v("信用卡")]),o("a",{staticClass:"payModeA text-decoration-none",class:{click:"代碼繳費"==s.payMode},attrs:{href:""},on:{click:function(t){t.preventDefault(),s.payMode="代碼繳費"}}},[s._v("代碼繳費")]),o("a",{staticClass:"payModeA text-decoration-none",class:{click:"現金轉帳"==s.payMode},attrs:{href:""},on:{click:function(t){t.preventDefault(),s.payMode="現金轉帳"}}},[s._v("現金轉帳")]),"信用卡"==s.payMode?o("form",{staticClass:"creaditFrom"},[o("div",{staticClass:"form-group d-flex flex-wrap"},[o("validation-provider",{staticClass:"col-12 mb-3",attrs:{rules:"required"},scopedSlots:s._u([{key:"default",fn:function(t){var a=t.errors,e=t.classes;return[o("label",{staticClass:"control-label",attrs:{for:"cardNumber"}},[s._v("卡號")]),o("div",{staticClass:"input-group"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:s.credit.cardNum,expression:"credit.cardNum",modifiers:{number:!0}}],staticClass:"form-control cardNumber",class:e,attrs:{type:"text",maxlength:"12",id:"cardNumber",name:"卡號",placeholder:"**** **** **** ****"},domProps:{value:s.credit.cardNum},on:{input:function(t){t.target.composing||s.$set(s.credit,"cardNum",s._n(t.target.value))},blur:function(t){return s.$forceUpdate()}}}),o("span",{staticClass:"invalid-feedback"},[s._v(s._s(a[0]))])])]}}],null,!0)}),o("validation-provider",{staticClass:"form-group col-6",attrs:{rules:"required"},scopedSlots:s._u([{key:"default",fn:function(t){var a=t.errors,e=t.classes;return[o("label",{staticClass:"control-label",attrs:{for:"expireDate"}},[s._v("卡片有效月年")]),o("input",{directives:[{name:"model",rawName:"v-model",value:s.credit.expireDate,expression:"credit.expireDate"}],staticClass:"form-control expireDate",class:e,attrs:{type:"text",id:"expireDate",name:"卡片有效月年",placeholder:"MM / YY"},domProps:{value:s.credit.expireDate},on:{input:function(t){t.target.composing||s.$set(s.credit,"expireDate",t.target.value)}}}),o("span",{staticClass:"invalid-feedback"},[s._v(s._s(a[0]))])]}}],null,!0)}),o("validation-provider",{staticClass:"form-group col-6",attrs:{rules:"required"},scopedSlots:s._u([{key:"default",fn:function(t){var a=t.errors,e=t.classes;return[o("label",{staticClass:"control-label",attrs:{for:"cvc"}},[s._v("卡片背面檢查碼")]),o("input",{directives:[{name:"model",rawName:"v-model",value:s.credit.cvc,expression:"credit.cvc"}],staticClass:"form-control cvc",class:e,attrs:{type:"text",id:"cvc",name:"卡片背面檢查碼",placeholder:"卡片背面檢查碼"},domProps:{value:s.credit.cvc},on:{input:function(t){t.target.composing||s.$set(s.credit,"cvc",t.target.value)}}}),o("span",{staticClass:"invalid-feedback"},[s._v(s._s(a[0]))])]}}],null,!0)})],1)]):s._e()]),o("div",{staticClass:"mb-4"},[o("h5",{staticClass:"font-weight-bold"},[s._v("使用優惠卷")]),o("div",{staticClass:"couponCon mt-3"},[o("input",{directives:[{name:"model",rawName:"v-model",value:s.couponCode,expression:"couponCode"}],staticClass:"m-2",attrs:{type:"text",placeholder:"請輸入優惠碼"},domProps:{value:s.couponCode},on:{input:function(t){t.target.composing||(s.couponCode=t.target.value)}}}),o("div",[o("button",{staticClass:"m-2 btn btn-outline-secondary",attrs:{type:"button"},on:{click:function(t){return s.addCoupon(s.couponCode)}}},[s._v("套用優惠碼")])])]),s.cart.final_total==s.cart.total?o("p",{staticClass:"CouponTip text-danger my-2 px-2 h6"},[s._v('現在輸入優惠碼"2022"，即可享有8折優惠喔!')]):s._e(),s.cart.final_total!==s.cart.total?o("p",{staticClass:"CouponTip text-success my-0 px-2 h6"},[s._v("已成功套用優惠卷")]):s._e()]),o("div",{staticClass:"remark input-group mb-4 mt-5 px-2"},[o("div",{staticClass:"input-group-prepend"},[o("label",{staticClass:"input-group-text",attrs:{for:"msg"}},[s._v("備註")])]),o("textarea",{staticClass:"form-control",attrs:{id:"msg","aria-label":"With textarea"}})]),o("div",{staticClass:"text-right"},[o("button",{staticClass:"btn mx-2 btn-outline-secondary",attrs:{type:"button"},on:{click:function(t){t.preventDefault(),s.step--}}},[s._v("上一步")]),o("button",{staticClass:"btn mx-2 text-white nextStep",attrs:{type:"submit",disabled:a},on:{click:function(t){t.preventDefault(),s.step++}}},[s._v("確認，下一步")])])])]}}],null,!1,2019841235)})],1):s._e(),3==s.step?o("div",{staticClass:"container mt-5 step3Con",attrs:{id:"productModal3"}},[o("section",{staticClass:"bg-white py-3 mx-auto"},[o("h2",{staticClass:"w-100 font-weight-bold text-center mb-3"},[s._v("確認購物資訊")]),o("div",{staticClass:"form-group col-12"},[o("h3",[s._v("訂單內容")]),o("table",{staticClass:"table"},[s._m(1),o("tbody",s._l(s.cart.carts,(function(t){return o("tr",{key:t.id},[o("td",{staticClass:"text-left"},[s._v(s._s(t.product.title))]),o("td",{staticClass:"text-center"},[s._v(s._s(t.qty)+" "+s._s(t.product.unit))]),o("td",{staticClass:"text-right"},[s._v(s._s(s._f("corrency")(t.product.price)))])])})),0),o("tfoot",[s.cart.final_total!==s.cart.total?o("tr",[o("td",{staticClass:"text-right border-top-0",attrs:{colspan:"2"}},[s._v("小計")]),o("td",{staticClass:"text-right border-top-0"},[s._v(s._s(s._f("corrency")(s.cart.total)))])]):s._e(),s.cart.final_total!==s.cart.total?o("tr",[o("td",{staticClass:"text-right border-top-0",attrs:{colspan:"2"}},[s._v("優惠折扣")]),o("td",{staticClass:"text-right border-top-0"},[s._v("-"+s._s(s._f("corrency")(s.cart.total-s.cart.final_total)))])]):s._e(),o("tr",[o("td",{staticClass:"text-right border-top-0 text-danger",attrs:{colspan:"2"}},[s._v("總計")]),o("td",{staticClass:"text-right border-top-0"},[s._v(s._s(s._f("corrency")(s.cart.final_total)))])])])]),o("h3",[s._v("賣家資料")]),o("table",{staticClass:"table"},[o("tbody",[o("tr",[o("td",[s._v("Email")]),o("td",[s._v(s._s(s.form.user.email))])]),o("tr",[o("td",[s._v("姓名:")]),o("td",[s._v(s._s(s.form.user.name))])]),o("tr",[o("td",[s._v("電話:")]),o("td",[s._v(s._s(s.form.user.tel))])]),o("tr",[o("td",[s._v("付款方式:")]),o("td",[s._v(s._s(s.payMode))])]),o("tr",[o("td",[s._v("地址:")]),o("td",[s._v(s._s(s.form.user.address))])])])]),o("div",{staticClass:"text-center"},[o("button",{staticClass:"btn mx-2 btn-secondary",attrs:{type:"button"},on:{click:function(t){t.preventDefault(),s.step--}}},[s._v("上一步")]),o("button",{staticClass:"btn mx-2 btn-primary",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),s.createOrder.apply(null,arguments)}}},[s._v("確定付款")])])])])]):s._e()]):s._e()])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th"),e("th",[t._v("商品名稱")]),e("th",{staticClass:"text-right"},[t._v("數量")]),e("th",{staticClass:"text-right"},[t._v("小計")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("td",{staticClass:"text-left"},[t._v("商品名稱")]),e("td",{staticClass:"text-center"},[t._v("數量")]),e("td",{staticClass:"text-right"},[t._v("金額")])])])}],o=(e("ac6a"),{data:function(){return{orderId:"",cart:{carts:[],final_total:""},form:{user:{name:"",email:"",tel:"",address:""},message:""},step:1,payMode:"",credit:{cardNum:"",expireDate:"",cvc:""},couponCode:"",CouponTip:"",preLen:0,adstartlen:0,addLen:0}},props:["filterCarts"],methods:{restartCoupon:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/coupon");t.$http.post(a,{data:{code:"cancel"}}).then((function(a){a.data.success&&(t.cart.final_total="",t.getCart())}))},getCart:function(){var t=this;t.$emit("LoadingModel",!0);var a="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart");t.$http.get(a).then((function(a){a.data.success&&(t.cart.total=a.data.data.total,t.cart.final_total=a.data.data.final_total,t.adstartlen=t.filterCarts.length,t.removeCart(a.data.data.carts,"get"))}))},removeCart:function(t,a){var e=this;if(e.$emit("LoadingModel",!0),e.preLen=e.cart.carts.length,"get"===a)t.forEach((function(a,s){var r="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart/").concat(a.id);e.$http.delete(r).then((function(a){console.log(a.data.success),a.data.success&&s+1===t.length&&e.addCart()}))}));else if("adjust"===a){var s="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart/").concat(t);console.log(t),e.$http.delete(s).then((function(t){t.data.success&&e.end()}))}else{var r="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart/").concat(t);console.log(t);var o=e.cart.carts.filter((function(a){return a.id===t}));e.$http.delete(r).then((function(t){t.data.success&&(console.log(o[0].product_id),e.end(o[0].product_id))}))}},addCart:function(t){var a=this;a.filterCarts.forEach((function(t){var e="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart");a.$http.post(e,{data:{product_id:t.product_id,qty:t.qty}}).then((function(t){t.data.success&&(console.log("調整新增資料完畢"),a.addLen=a.addLen+1,a.addLen===a.adstartlen&&a.end())}))}))},end:function(t){var a=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart");a.$http.get(e).then((function(e){if(e.data.success)if(e.data.data.carts.length!==a.preLen)a.cart=e.data.data,console.log(e.data.data),a.$emit("LoadingModel",!1);else{console.log(e.data.data.carts),console.log("pid的資料="+t);var s=e.data.data.carts.filter((function(a){return a.product_id===t}));console.log(s),a.removeCart(s[0].id,"adjust")}}))},cancelOrder:function(){this.$router.push("/ProductList/all")},createOrder:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/order");t.$http.post(a,{data:{user:t.form.user,message:t.form.message}}).then((function(a){a.data.success&&t.$router.push("/Pay/".concat(a.data.orderId))}))},addCoupon:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/coupon");t.$http.post(a,{data:{code:t.couponCode}}).then((function(a){if(a.data.success){t.$bus.$emit("message:push","已成功加入優惠卷");var e="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart");t.$http.get(e).then((function(a){a.data.success&&(t.cart=a.data.data)})),console.log(a.data.final_total)}else t.couponCode="",t.$bus.$emit("message:push",a.data.message)}))}},created:function(){this.$emit("LoadingModel",!0),localStorage.getItem("checkoutStep")?(this.restartCoupon(),localStorage.removeItem("checkoutStep")):this.$router.push("/")}}),c=o,n=(e("6f81"),e("2877")),i=Object(n["a"])(c,s,r,!1,null,"25601744",null);a["default"]=i.exports},"1c44":function(t,a,e){},"6f81":function(t,a,e){"use strict";e("1c44")}}]);
//# sourceMappingURL=chunk-65170ab2.5a58cba4.js.map