<template>
<div>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <sidebar/>
      <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
        <alert/>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from './Navbar'
import sidebar from './Sidebar'
import alert from './AlertMessage'

export default {
  name: 'dashboard',
  methods: {
    checkSign () {
      const vm = this
      const api = `${process.env.APIPATH}/api/user/check`
      vm.$http.post(api).then((response) => {
        if (!(response.data.success)) {
          this.$router.push(`/login`)
        }
      })
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)occToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
  },
  components: {
    Navbar,
    sidebar,
    alert
  }
}
</script>
