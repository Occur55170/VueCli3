<template>
<div>
  <div class="container storeBase py-5">
    <ul class="list-unstyled d-flex flex-wrap justify-content-between">
      <li>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.5218966146344!2d120.64849195080869!3d24.15342298431579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d96ce8d6897%3A0x6f4ee642d157f6a2!2zNDA45Y-w5Lit5biC5Y2X5bGv5Y2A5aSn5qWt6LevMTg56Jmf!5e0!3m2!1szh-TW!2stw!4v1639304535203!5m2!1szh-TW!2stw" width="100%" height="250" allowfullscreen="" loading="lazy"></iframe>
          <h3 class="text-center"><strong>幸福烘焙 台中大業店</strong></h3>
          <p class="phoneData"><a href="tel:04-23103996"><i class="fas fa-phone"></i>04-2310-3996</a></p>
          <p><i class="fas fa-print"></i> 04-2310-4158</p>
          <p><i class="fas fa-map-marker-alt"></i> 408台中市南屯區大業路189號</p>
          <p><i class="far fa-clock"></i> 10:00 - 22:00</p>
        </div>
      </li>
      <li>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.184620727538!2d120.64151425080888!3d24.165257184309894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d8ca511b4fd%3A0x4c1f419ebf75dd33!2z5bm456aP54OY54SZKOWPsOS4reaWsOWFieS4iei2iuS4rea4r-W6lyk!5e0!3m2!1szh-TW!2stw!4v1639306767616!5m2!1szh-TW!2stw" width="100%" height="250px" allowfullscreen="" loading="lazy"></iframe>
          <h3 class="text-center"><strong>幸福烘焙 台中新光店</strong></h3>
          <p class="phoneData"><a href="tel:04-22517831"><i class="fas fa-phone"></i>04-2251-7831</a></p>
          <p><i class="fas fa-print"></i> 04-2452-8669</p>
          <p><i class="fas fa-map-marker-alt"></i> 407台中市台灣大道三段301號B2</p>
          <p><i class="far fa-clock"></i> 週一至週五 11:00 - 22:00</p>
          <p><i class="far fa-clock"></i> 國定例假日 10:30 - 22:00</p>
        </div>
      </li>
      <li>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.024646219426!2d120.6855536508085!3d24.135772584324332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d3e815b8cf3%3A0xe0e91f87b8387969!2z5bm456aP54OY54SZKOaWsOaZguS7oyk!5e0!3m2!1szh-TW!2stw!4v1639306800575!5m2!1szh-TW!2stw" width="100%" height="250px" allowfullscreen="" loading="lazy"></iframe>
          <h3 class="text-center"><strong>幸福烘焙 台中大魯閣新時代店</strong></h3>
          <p class="phoneData"><a href="tel:04-22226289"><i class="fas fa-phone"></i>04-22226289</a></p>
          <p><i class="fas fa-map-marker-alt"></i> 401台中市東區復興路四段186號</p>
          <p><i class="far fa-clock"></i> 平日11:00~22:00</p>
          <p><i class="far fa-clock"></i> 假日10:30~22:00</p>
        </div>
      </li>
      <li>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1820.4918438940083!2d120.68618967592643!3d24.13721099608091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d98b0da30d3%3A0xf96be98888915b71!2z5bm456aP54OY54SZKOeBq-i7iuermeW6lyk!5e0!3m2!1szh-TW!2stw!4v1639306852751!5m2!1szh-TW!2stw" width="100%" height="250px" allowfullscreen="" loading="lazy"></iframe>
          <h3 class="text-center"><strong>幸福烘焙 台中車站店(鐵鹿大街商場)</strong></h3>
          <p class="phoneData"><a href="tel:04-35097348"><i class="fas fa-phone"></i>04-35097348</a></p>
          <p><i class="fas fa-map-marker-alt"></i> 台中市中區台灣大道一段1號1樓</p>
          <p><i class="far fa-clock"></i> 平日10:30~21:30</p>
          <p><i class="far fa-clock"></i> 假日10:30~21:30</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  created () {
    this.$emit('closeNavList')
    this.$emit('cartSw', true)
    this.$store.dispatch('cartsModules/updateCartA', true)
  }
}
</script>

<style lang="scss" scoped>
.storeBase{
  background:#f9f9f9;
  h3{
    color:#BB3D00;
    margin:10px 0 20px 0;
  }
  li{
    width:43%;
    margin:0 1%;
    padding:10px;
    .phoneData i{
      transform:rotateY(180deg);
    }
  }
  iframe{
    border:0;
  }
}
@media(max-width:600px){
  .storeBase{
    padding:50px 0 !important;
    h3{
      font-size:23px;
    }
    ul{
      width:90%;
      margin:0 auto;
    }
    li{
      width:100%;
    }
  }
}
</style>
