<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <RouterLink class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/Admin">後台管理</RouterLink>
    <button type="button" class="navbar-toggler position-absolute d-md-none collapsed" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3" href="#" @click.prevent="signOut">登出</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signOut () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          let message = response.data.message
          let success = 'success'
          vm.$store.dispatch('backendModules/updateMessage', { message, success })
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
