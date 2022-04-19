<template>
  <form class="form-signin">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <label for="floatingInput">帳戶名稱</label>
      <input type="email" class="form-control" id="floatingInput" v-model="user.username" placeholder="name@example.com">
    </div>
    <br>
    <div class="form-floating">
      <label for="floatingPassword">密碼</label>
      <input type="password" class="form-control" id="floatingPassword" v-model="user.password" placeholder="Password">
    </div>
    <br>
    <button class="w-100 btn btn-lg btn-primary" type="submit" @click.prevent="signin" @enter="signin">Sign in</button>
    <AlertMessage></AlertMessage>
  </form>
</template>

<script>
import AlertMessage from './AlertMessage.vue'

export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const token = response.data.token
          const expired = response.data.expired
          document.cookie = `occToken=${token};expires=${new Date(expired)};`
          // vm.$bus.$emit('message:push', response.data.message, 'success')
          vm.$router.push('/admin/Products')
        } else {
          // vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    }
  },
  components: {
    AlertMessage
  }
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
