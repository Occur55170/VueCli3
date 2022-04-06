<template>
  <div>
    <div class="message-alert">
      <div class="alert" v-for="(item, i) in messages" :key="i">
        <i class="fas fa-exclamation-circle"></i>
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMSG',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 1000)
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message) => {
      vm.updateMessage(message)
    })
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  z-index: 9999;
  max-width:280px;
  width:50%;
  top:40%;
  right:calc((100% - 300px)/2);
  padding:20px;
  text-align:center;
  background:#fff;
  border-radius:10px;
  box-shadow:0 0 4px rgb(0, 0, 0);
  display:flex;
  align-items:center;
  font-size:16px;
  animation:tada .3s linear;
  animation-fill-mode:both;
  @keyframes tada {
    0%{opacity:0;}
    100%{opacity:1;}
  }
  & i {
    margin-right:10px;
    font-size:30px;
    color:#f28200;
  }
}
@media(max-width:600px){
  .alert {
    top:unset;
    bottom: 45%;
    right:unset;
    left:10%;
    width:100%;
    max-width:80%;

  }
}
</style>
