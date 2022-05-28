<template>
  <div class="Customer">
    <Loading :active.sync="isLoading"/>
    <header>
      <div class="indexContainer header">
        <RouterLink to="/" class="logo">
          <img src="@/assets/images/headLogo.png" alt="幸福烘焙logo">
        </RouterLink>
        <a href="#" class="navListA" @click.prevent="openNavList"><i class="fas fa-bars"></i></a>
        <ul class="navList">
          <li>
            <RouterLink to="/" class="active"><strong>首頁</strong></RouterLink>
          </li>
          <li>
            <RouterLink to="/ProductList/all">產品列表</RouterLink>
          </li>
          <li>
            <RouterLink to="/Search">查詢訂單</RouterLink>
          </li>
          <li>
            <RouterLink to="/StoreBase">門市據點</RouterLink>
          </li>
        </ul>
        <button type="button" class="cartA" id="btn" @click="openCartModal" v-show="cartA">
          <i class="fas fa-shopping-cart"></i>
          <span v-if="cart.carts.length !== 0">{{ cart.carts.length }}</span>
        </button>
      </div>
    </header>
    <main class="flex-grow-1 flex-shrink-1">
      <RouterView  @closeNavList="closeNavList" />
    </main>
    <footer class="bg-dark text-muted p-2 flex-grow-0 flex-shrink-0">
      <div class="footer indexContainer">
        <ul class="mb-0 pl-0">
          <li class="footerLogo">
            <img src="@/assets/images/logo.png" alt="幸福烘焙" class="mr-3">
            <p class="mb-0">台灣第一家泡芙專賣店，我們賣的是令人吃了幸福的泡芙。</p>
          </li>
          <li class="copyright align-self-center">
            <p class="text-center text-white">Copyright © 2022 by Occur</p>
          </li>
          <li class="shopContact">
            <a href="https://www.facebook.com/frenchkisspuff/" target="_blank" class="mx-2 text-white" title="Facebook"><i class="fab fa-facebook-square"></i></a>
            <a href="https://page.line.me/xat.0000188480.ubo?openQrModal=true" target="_blank" class="mx-2 text-white" title="Line"><i class="fab fa-line"></i></a>
            <a href="https://www.instagram.com/hengfookbakery/" target="_blank" class="mx-2 text-white" title="Instagrame"><i class="fab fa-instagram"></i></a>
          </li>
        </ul>
      </div>
    </footer>
    <div class="p-3 w-100 flex-grow-0 flex-shrink-0">
      <p class="text-center m-1">本網站僅個人練習使用．不做任何商業用途。商品圖片與內容均為<a href="https://www.frenchkiss.com.tw/">幸福烘焙</a>所有</p>
      <div class="d-flex justify-content-center mt-2">
        <a href="https://github.com/Occur55170/" title="github"><i class="fab fa-github"></i>GitHub</a>
        <a href="#" is="RouterLink" class="ml-3" to="/login"><i class="fas fa-wrench"></i>管理者模式</a>
      </div>
    </div>
    <Modal/>
    <AlertMSG/>
  </div>
</template>

<script>
import $ from 'jquery'
import AlertMSG from '@/components/AlertMSG.vue'
import Modal from '@/components/Modal.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Customer',
  methods: {
    openNavList () {
      $('.navList').slideToggle()
    },
    closeNavList () {
      if (document.body.offsetWidth < 600) {
        $('.navList').hide()
      }
    },
    openCartModal () {
      $('#cartMoadl').modal('show')
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['cart', 'cartA'])
  },
  components: {
    AlertMSG,
    Modal
  }
}
</script>

<style lang="scss" scoped>
.vld-overlay.is-full-page{
  z-index:1070;
}
.Customer{
  min-height:100vh;
  display:flex;
  flex-flow: column;
  justify-content:space-between;
}
header{
  box-shadow: 0 0 20px -5px #626262;
  padding:10px 0;
  background:#fffbe7;
  position:fixed;
  top:0;
  left:0;
  z-index:997;
  width:100%;
  .header{
    display:flex;
    justify-content:flex-end;
    align-items:center;
  }
  .logo{
    flex-grow:2;
    img{
      width:230px;
    }
  }
  .navListA{
    display: none;
  }
  .navList{
    display:flex;
    list-style-type:none;
    padding:0 10px;
    margin-bottom:0;
    &>li:last-Child a{
      border-width:0;
    }
    a{
      display:inline-block;
      margin:0 20px;
      padding:0 5px;
      box-sizing:border-box;
      color:#706d63;
      font-weight:bold;
      font-size:18px;
      text-decoration:none;
      position:relative;
      &::after{
        content:'';
        transition:all .8s;
        background:#706d63;
        width:0;
        height:1px;
        position:absolute;
        bottom:0;
        left:45%;
      }
      &:hover::after{
        width:100%;
        left:0;
        background:#706d63;
      }
    }
  }
  .cartA{
    display:inline-block;
    padding:0 5px;
    box-sizing:border-box;
    color:#706d63;
    font-weight:bold;
    font-size:28px;
    text-decoration:none;
    position:relative;
    border:0;
    background:unset;
    display:flex;
    justify-content:center;
    align-items:center;
    & span{
      font-size:15px;
      position:absolute;
      bottom:-10%;
      right:-10%;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:99em;
      width:20px;
      height:20px;
      color:#fff;
      background:#dc3545;
    }
  }
}
main{
  margin:65px 0 0 0;
  width:100%;
}
footer{
  width:100%;
  ul{
    list-style-type:none;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .footerLogo{
    width:30%;
    img{
      max-width:80px;
    }
    p{
      display:none;
    }
  }
  .copyright{
    width:100%;
    box-sizing:border-box;
    padding:20px;
    p{
      margin-bottom:0;
      font-size:16px;
    }
  }
  .shopContact{
    width:30%;
    text-align: right;
    a{
      font-size:30px;
    }
  }
}

@media(max-width:768px){
  header{
    .navList{
      a{
        margin:0 10px;
      }
    }
  }
  main{
    margin:95px 0 0 0;
  }
  footer{
    .footer{
      padding:20px 0;
      ul{
        flex-wrap:wrap;
      }
    }
    .footerLogo{
      width:100%;
      margin-right:0 !important;
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      img{
        width:12%;
        max-width: 120px;
        margin-right:0 !important;
      }
      p{
        margin:20px auto !important;
        display:block;
        text-align:center;
        color:#fff;
        width:100%;
        font-size:18px;
      }
    }
    .copyright{
      width:100%;
      padding:10px 20px;
      p{
        font-size:15px;
      }
    }
    .shopContact{
      display:none;
    }
  }
}
@media(max-width:600px){
  header {
    box-shadow: 0 0 10px 4px #ccc;
    .header {
      padding:0 20px;
      justify-content:space-between;
    }
    .logo {
      order:2;
      flex-grow:0;
      img {
        width:75%;
        display:block;
        margin:0 auto;
      }
    }
    .navListA {
      order:1;
      display:block;
      font-size:36px;
      color:#333;
    }
    .navList {
      display: none;
      z-index: -1;
      position:absolute;
      top:100%;
      left:0;
      width:100%;
      background:#fff;
      flex-wrap:wrap;
      border-bottom:1px solid #999;
      li {
        width:100%;
        padding:10px;
        text-align:center;
        border-bottom:1px solid #ccc;
        &:last-Child {
          border:0;
        }
      }
    }
    .cartA {
      order:3;margin:0;
    }
  }
  main {
    margin:80px 0 0 0;
  }
  footer {
    .footerLogo {
      width:100%;
      margin-right:0 !important;
      img {
        width:20%;
      }
      p {
        font-size: 4.2vw;
      }
    }
    .copyright {
      width:100%;
      padding:0 0 20px 0;
      p {
        font-size:14px;
      }
    }
    .shopContact {
      display:none;
    }
  }
}
</style>
