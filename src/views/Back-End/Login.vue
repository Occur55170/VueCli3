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
      <input type="password" class="form-control" id="floatingPassword" v-model="user.password" placeholder="Password" autocomplete="off">
    </div>
    <br>
    <button type="submit" class="w-100 btn btn-lg btn-primary" @click.prevent="signin" @enter="signin">Sign in</button>
    <BackendMSG/>
  </form>
</template>

<script>
import BackendMSG from '@/components/BackendMSG.vue'

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
          let message = response.data.message
          let success = 'success'
          vm.$store.dispatch('backendModules/updateMessage', { message, success })
          vm.$router.push('/Admin/Products')
        } else {
          let message = response.data.message
          let success = 'danger'
          vm.$store.dispatch('backendModules/updateMessage', { message, success })
        }
      })
    }
  },
  components: {
    BackendMSG
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
