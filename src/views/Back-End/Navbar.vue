<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/admin">後台管理</router-link>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">-->
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
  data () {
    return {
      ms: 'Navbar'
    }
  },
  methods: {
    signOut () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.$http.post(api).then((response) => {
        console.log(response.data)
        vm.$router.push('/login')
      })
    }
  }
}
</script>
