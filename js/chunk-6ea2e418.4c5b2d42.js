(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ea2e418"],{"23d2":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"productContent"},[s("nav",{attrs:{"aria-label":"breadcrumb",role:"navigation"}},[s("ol",{staticClass:"breadcrumb bg-transparent pl-0"},[s("li",{staticClass:"breadcrumb-item"},[s("router-link",{attrs:{to:"/ProductList/all"}},[t._v("產品列表")])],1),s("li",{staticClass:"breadcrumb-item"},[s("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.proCate(t.product.category)}}},[t._v(t._s(t.product.category))])]),s("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[t._v(t._s(t.product.title))])])]),s("div",{staticClass:"d-flex flex-wrap align-items-start"},[s("img",{staticClass:"proImg",attrs:{src:t.product.imageUrl,alt:t.product.title}}),s("div",{staticClass:"proCon"},[s("h1",[t._v(t._s(t.product.title))]),s("h4",{staticClass:"card-text"},[t._v(t._s(t.product.description))]),s("div",{staticClass:"priceCon"},[s("p",{staticClass:"SellPrice"},[t._v("售價"+t._s(t._f("corrency")(t.product.origin_price)))]),s("p",{staticClass:"webPrice"},[t._v("網路價"),s("span",[t._v(t._s(t._f("corrency")(t.product.price)))])])]),0!==t.product.is_enable?s("div",{staticClass:"qtyCon"},[s("button",{staticClass:"btn mb-0",attrs:{disabled:t.qty<2},on:{click:function(a){a.preventDefault(),t.qty--}}},[s("i",{staticClass:"fas fa-minus"})]),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.qty,expression:"qty",modifiers:{number:!0}}],staticClass:"text-center",attrs:{type:"number"},domProps:{value:t.qty},on:{blur:[function(a){return t.qtyblur()},function(a){return t.$forceUpdate()}],input:function(a){a.target.composing||(t.qty=t._n(a.target.value))}}}),s("button",{staticClass:"btn mb-0",on:{click:function(a){a.preventDefault(),t.qty++}}},[s("i",{staticClass:"fas fa-plus"})])]):t._e(),s("div",{staticClass:"d-flex align-items-center justify-content-between"},[s("button",{staticClass:"btn bg-or text-white",attrs:{disabled:0==t.product.is_enable},on:{click:function(a){return t.addCart(t.product.id,t.qty)}}},[0!==t.product.is_enable?s("span",[s("i",{staticClass:"fa fa-cart-plus",attrs:{"aria-hidden":"true"}}),t._v(" 加入購物車")]):t._e(),0==t.product.is_enable?s("span",[t._v("缺貨中")]):t._e()]),t._m(0)])]),s("div",{staticClass:"alert alert-secondary mt-4 w-100 instruction",attrs:{role:"alert"}},[s("h2",{staticClass:"text-center"},[t._v("購物說明")]),s("p",{staticClass:"productDesc",attrs:{id:"productDesc"}},[t._v("\n        "+t._s(t.product.content)+"\n        ")])])])])])},c=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"text-muted text-right"},[s("i",{staticClass:"h3 mx-1 fab fa-cc-visa"}),s("i",{staticClass:"h3 mx-1 fab fa-cc-jcb"}),s("i",{staticClass:"h3 mx-1 fab fa-cc-paypal"})])}],i=s("1157"),r=s.n(i),n={data:function(){return{pid:"",product:{},qty:1}},methods:{getProduct:function(){var t=this;t.$emit("LoadingModel",!0);var a="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/product/").concat(t.pid);t.$http.get(a).then((function(a){t.$emit("LoadingModel",!1),a.data.success&&(t.product=a.data.product,t.textFilt(),t.$emit("LoadingModel",!1))}))},proCate:function(t){this.$router.push("/ProductList/".concat(t))},goOrder:function(){var t=this;t.$router.push("/Checkout")},textFilt:function(){for(var t=this,a=t.product.content,s=[],e=0;a.length>e;e++)"♥"===a[e]&&0!==e&&s.push("<br>"),s.push(a[e]);r()("#productDesc").html(s.join(""))},addCart:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,s=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("occur","/cart");s.$emit("LoadingModel",!0),s.$http.post(e,{data:{product_id:t,qty:a}}).then((function(t){s.$emit("getcart","已成功將商品加入購物車")}))},qtyblur:function(){var t=this;(t.qty<1||!1===t.qty)&&(t.qty=1)}},created:function(){this.$emit("closeNavList"),this.pid=this.$route.params.id,this.getProduct()}},o=n,u=(s("a5cc"),s("2877")),l=Object(u["a"])(o,e,c,!1,null,"594215d2",null);a["default"]=l.exports},"994f":function(t,a,s){},a5cc:function(t,a,s){"use strict";s("994f")}}]);
//# sourceMappingURL=chunk-6ea2e418.4c5b2d42.js.map