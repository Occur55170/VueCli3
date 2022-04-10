<template>
<div>
  <div class="index">
    <div class="text-center indexHead ">
      <a href="#" @click.prevent="goProduct('-MpVSEO-4Ea90UEKn03R')">
      </a>
        <div class="bg-or w-100">
        </div>
          <img src="@/assets/images/index/headerText.png" alt="季節限定" class="headerText">
          <img src="@/assets/images/index/newPro.jpg" alt="仙子水果泡芙" class="banner">
    </div>

    <div class="mt-5 serve indexContainer">
      <h2 class="text-center"><strong>我們的服務</strong></h2>
      <ul class="d-flex justify-content-around my-5 list-unstyled">
        <li class="text-center h5 col-4 border-dark">
          <p>
            <i class="fas fa-truck mb-3"></i>
            <br>
            專人配送服務，
            <br>
            讓您第一時間就能嚐到美味
          </p>
        </li>
        <li class="text-center h5 col-4 border-dark">
          <p>
            <i class="fas fa-seedling mb-3"></i>
            <br>
            食材新鮮純手工，
            <br>
            品嘗的每一口都是驚喜
          </p>
        </li>
        <li class="text-center h5 col-4">
          <p>
            <i class="fas fa-gift mb-3"></i>
            <br>
            特殊禮品包裝，
            <br>
            每個節慶都有幸福烘焙的陪伴
          </p>
        </li>
      </ul>
    </div>

    <div class="recommend indexContainer">
      <div>
        <h2 class="text-center mt-5 mb-3"><strong>熱門推薦區</strong></h2>
          <p class="text-center h5 text-white mb-5" style="line-height:1.6;">
            網路團購排名最推薦商品精選，不論是送禮送幸福，或是與好友品嚐美味點心
            <br>
            幸福烘焙都提供您最好的服務
          </p>
          <ul class="hotList">
            <li>
              <img src="@/assets/images/index/recommend-1.jpg" alt="脆皮MINI泡芙禮盒" class="w-100 mb-3">
              <p class="h5 text-center"><strong>脆皮MINI泡芙禮盒</strong></p>
              <p class="h6" style="line-height:1.6">幸福烘焙最熱賣三種脆皮泡芙一次滿足，脆皮奶油、脆皮巧克力、脆皮楓糖三種口味，九入裝</p>
              <a href="#" class="bg-or text-white text-center text-decoration-none d-block" @click.prevent="goProduct('-MpVFpW2xS0DpJTv8lU0')">手刀前往</a>
            </li>
            <li>
              <img src="@/assets/images/index/recommend-2.jpg" alt="經典禮盒" class="w-100 mb-3">
              <p class="h5 text-center"><strong>經典禮盒</strong></p>
              <p class="h6" style="line-height:1.6">超人氣泡芙經典禮盒，店內最熱銷人氣商品九種口味一次擁有，伴手禮最佳選擇</p>
              <a href="#" class="bg-or text-white text-center text-decoration-none d-block" @click.prevent="goProduct('-MpVXsRffaRW18T8woHc')">手刀前往</a>
            </li>
            <li>
              <img src="@/assets/images/index/recommend-3.jpg" alt="巴黎方塊泡芙禮盒" class="w-100 mb-3">
              <p class="h5 text-center"><strong>巴黎方塊泡芙禮盒</strong></p>
              <p class="h6" style="line-height:1.6">香榭道上的花漾磚紋，推砌出巴黎最幸福的光景，一格一格，收藏繽紛的法式甜蜜。</p>
              <a href="#" class="bg-or text-white text-center text-decoration-none d-block" @click.prevent="goProduct('-MpVYQk9FkOY8wZg_F1H')">手刀前往</a>
            </li>
          </ul>
      </div>
    </div>

    <div style="background:#F8F3E8;" class="py-5 indexContainer">
      <div class="mx-auto">
        <h1 class="text-center mb-5"><strong>幸福烘焙  用心製作</strong></h1>
        <ul class="list-unstyled d-flex flex-wrap justify-content-between stepList">
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-1.jpg" alt="嚴選食材" class="col-4">
            <div class="w-100">
              <h2>嚴選食材</h2>
              <p class="h5 font-weight-bold">新鮮水果、香草棒<br>鮮奶、進口鮮奶油、雞蛋</p>
              <span class="num">1</span>
            </div>
          </li>
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-2.jpg" alt="熬煮麵糊" class="col-4">
            <div class="w-100">
              <h2>熬煮麵糊</h2>
              <p class="h5 font-weight-bold">鮮奶熬煮<br>添加新鮮雞蛋</p>
              <span class="num">2</span>
            </div>
          </li>
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-3.jpg" alt="手工成型" class="col-4">
            <div class="w-100">
              <h2>手工成型</h2>
              <p class="h5 font-weight-bold">純手工擠壓成型</p>
              <span class="num">3</span>
            </div>
          </li>
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-4.jpg" alt="高溫烘烤" class="col-4">
            <div class="w-100">
              <h2>高溫烘烤</h2>
              <p class="h5 font-weight-bold">特製烤爐高溫烘烤</p>
              <span class="num">4</span>
            </div>
          </li>
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-5.jpg" alt="鮮奶熬煮製餡" class="col-4">
            <div class="w-100">
              <h2>鮮奶熬煮製餡</h2>
              <p class="h5 font-weight-bold">純鮮奶熬煮，添加香草棒<br>不含人工香精</p>
              <span class="num">5</span>
            </div>
          </li>
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-6.jpg" alt="添加鮮奶油" class="col-4">
            <div class="w-100">
              <h2>添加鮮奶油</h2>
              <p class="h5 font-weight-bold">法國進口鮮奶油調味<br>增加細緻口感</p>
              <span class="num">6</span>
            </div>
          </li>
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-7.jpg" alt="最後裝飾及灌餡" class="col-4">
            <div class="w-100">
              <h2>最後裝飾及灌餡</h2>
              <p class="h5 font-weight-bold">當日採買新鮮水果裝飾</p>
              <span class="num">7</span>
            </div>
          </li>
          <li class="my-3 bg-white p-3 d-flex align-items-center">
            <img src="@/assets/images/step/step-8.jpg" alt="產品上架" class="col-4">
            <div class="w-100">
              <h2>產品上架</h2>
              <p class="h5 font-weight-bold">隨時現烤出爐</p>
              <span class="num">8</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="pb-5 pt-0 contact indexContainer text-center">
      <h1 class="mb-2"><strong>想知道更多我們的訊息？</strong></h1>
      <p class="mb-4">輸入信箱，訂閱我們，隨時獲得第一手優惠訊息！</p>
      <div class="subscription">
        <label class="mb-0" for="c_email">* 信箱</label>
        <input type="text" class="form-control" placeholder="信箱" name="信箱" id="c_email" v-model="contact.email">
        <button>訂閱</button>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'customer-index',
      contact: {
        name: '',
        tel: '',
        email: '',
        sub: 'A.一般消費意見'
      }
    }
  },
  methods: {
    goProduct (pid) {
      this.$router.push(`/product/${pid}`)
    }
  },
  created () {
    this.$emit('closeNavList')
    this.$emit('cartSw', true)
  }
}
</script>

<style lang="scss" scoped>
.index{
  .indexHead{
    background-image: url(../../assets/images/index/index-1.jpg);
    position:relative;
    padding-bottom:40%;
    overflow:hidden;
    display:flex;
    justify-content:flex-end;
    &::before{
      content:'';
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:#fff;
      opacity:0.3;
    }
    &>div{
      height:300px;
      position:absolute;
      z-index:11;
      top:calc( (100% - 300px)/2 );
      left:0;
      opacity:0.5;
      display:flex;
      justify-content:flex-end;
      align-items:center;
    }
    .headerText{
      height:30%;
      margin-right:5vw;
      position:absolute;
      top:35%;
      right:0;
      z-index:20;
    }
    .banner{
      position:absolute;
      bottom:0;
      left:-20%;
      width:100%;
      clip-path: polygon(0% 0,50% 0, 90% 100%, 0% 100%);
      margin:0;
    }
  }
  .serve{
    i{
      font-size:50px;
    }
    p{
      line-height:1.3;
    }
  }
  .recommend{
    position:relative;
    background-image: url(../../assets/images/index/recommendbkg.jpg);
    background-position: 100% 100%;
    box-sizing:border-box;
    padding:20px 2% 80px 2%;
    h2{
      color:#EF8C1A;
    }
    .hotList{
      display:flex;
      justify-content:space-between;
      padding-left: 0;
      li{
        display:flex;
        width:30%;
        flex-flow:column;
        background:#fff;
        box-sizing:border-box;
        padding:20px;
      }
      .h6{
        flex-grow:2;
      }
      a{
        width:80%;
        padding:8px 16px;
        margin:30px auto 10px auto;
        font-size:18px;
        font-weight:bold;
        border-radius:50px;
      }
    }
  }
  .stepList{
    box-sizing:border-box;
    padding-bottom:100px;
    & li{
      position:relative;
      overflow:hidden;
      width:48%;
    }
    & h2{
      color:orange;
      font-weight:bold;
    }
    .num{
      position:absolute;
      bottom:-20px;
      right:20px;
      margin-bottom:0;
      color:#333;
      font-weight:bold;
      font-size:80px;
      opacity:0.3;
    }
  }
  .contact{
    background:#F0DBD1;
    position:relative;
    &::before{
      content:'';
      position:absolute;
      top:0;
      left:0;
      border-top-left-radius:99%;
      border-top-right-radius:99%;
      height:100px;
      width:100%;
      background:#F0DBD1;
      transform:translateY(-100%);
    }
    &>p{
      font-size:18px;
      margin-bottom:.8rem;
    }
    .subscription{
      max-width:800px;
      margin:0 auto;
      display:flex;
      align-items:center;
      justify-content:space-between;
      position:relative;
      width:100%;
      label{
        font-size:18px;
        width:15%;
        text-align:right;
        box-sizing:border-box;
        padding:5px 10px;
      }
      input{
        margin-right:2%;
        font-size: 16px;
        padding:5px 10px;
      }
      button{
        width:10%;
        border:0;
        background:#000;
        color:#fff;
        border-radius:10px;
        padding:10px;
        margin:10px;
        box-sizing:border-box;
      }
    }
  }
}
@media(max-width:1000px) {
  .index {
    .indexHead {
      padding-bottom:50%;
      &>div {
        height:50%;
        position:absolute;
        top:calc( (100% - 50%)/2 );
        left:0;
      }
      .headerText  {
          height:40%;
          margin-right: 5vw;
          position: absolute;
          top: 30%;
          right: 0;
          z-index: 20;
      }
    }
    .serve {
      box-sizing:border-box;
      padding:0 2%;
    }
    .recommend {
      box-sizing:border-box;
      padding:20px 2% 80px 2%;
      .hotList li {width:32%;}
    }
    .stepList {
      box-sizing:border-box;
      padding:20px 2% 80px 2%;
      .num {
        font-size:60px;
        bottom:-10px;
        right:10px;
      }
    }
    .contact{
      box-sizing:border-box;
      padding:20px 2% 80px 2%;
    }
  }
}
@media(max-width:768px){
  .index{
    .indexHead{
      position:relative;
      &::before{
        content:'';
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#fff;
        opacity:0.3;
      }
      &>div{
        height:50%;
        top: calc( (100% - 50%)/2);
      }
      .headerText{
        height:40%;
        top:30%;
      }
    }
    .recommend{
      .reBottom{
        ul{
          li{
            width:32%;
            img{
              flex-shrink:10;
            }
            .h5{
              flex-grow:1;
              flex-shrink:10;
            }
            .h6{
              flex-grow:1;
            }
          }
        }
      }

    }
    .stepList {
      padding-top:0;
      margin: 0;
      & li {
        position:relative;
        overflow:hidden;
      }
      & h2 {
        color:orange;
        font-weight:bold;
        font-size:26px;
      }
      & .h5 {
        font-size:17px;
      }
      img {
        padding:0;
        margin-right:10px;
      }
      .num {
        position:absolute;
        bottom:2px;
        right:10px;
        margin-bottom:0;
        color:#333;
        font-weight:bold;
        font-size:40px;
        opacity:0.2;
      }
    }
    .contact {
      .subscription {
        label {
          width: 12%;
        }
      }
    }
  }
}
@media(max-width:600px){
  .index{
    .indexHead{
      background-image: url(../../assets/images/index/index-1.jpg);
      position:relative;
      padding:0 0 10% 0;
      flex-wrap:wrap;
      &::before{
        display:none;
      }
      &>div{
        display:none;
      }
      .banner{
        position:unset;
        order:0;
        clip-path:unset;
      }
      .headerText{
        order:1;
        position:unset;
        width:80%;
        height:auto;
        margin:20px auto;
      }
    }
    .serve{
      ul{
        flex-wrap:wrap;
        li{
          width:100%;
          max-width:100%;
          flex:unset;
          margin-bottom:30px;
          i{
            display:block;
            margin-bottom:0 !important;
          }
        }
      }
    }
    .recommend{
      ul.hotList{
        flex-wrap: wrap;
        li{
          width: 90%;
          margin:20px auto;
          img{
            flex-shrink:10;
          }
          .h5{
            flex-grow:1;
            flex-shrink:10;
          }
          .h6{
            flex-grow:1;
          }
        }
        a{
          margin-top:20px;
        }
      }
    }
    .stepList{
      & li{
        position:relative;
        overflow:hidden;
        width:100%;
      }
      & h2{
        color:orange;
        font-weight:bold;
        font-size:26px;
      }
      & .h5{
        font-size:17px;
      }
      img{
        padding:0;
        margin-right:10px;
      }
      .num{
        position:absolute;
        top:-15px;
        right:5px;
        margin-bottom:0;
        color:#333;
        font-weight:bold;
        font-size:50px;
        opacity:0.2;
      }
    }
    .contact{
      h1{
        font-size:7vw;
      }
      p{
        font-size:4vw;
      }
      .subscription{
        flex-wrap:wrap;
        label{
          font-size:18px;
          width:17%;
          text-align:right;
          box-sizing:border-box;
          padding:5px ;
        }
        input{
          width:83%;
          margin-right:0;
        }
        button{
          width:auto;
          border:0;
          background:#000;
          color:#fff;
          border-radius:10px;
          padding:6px 15px;
          margin:20px auto 0 auto;
          box-sizing:border-box;
        }
      }
    }
  }
}
</style>
