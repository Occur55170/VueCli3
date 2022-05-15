<template>
<div>
  <loading :active.sync="isLoading"/>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <RouterView/>
        <BackendMSG/>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import BackendMSG from '@/components/BackendMSG.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  methods: {
    checkSign () {
      const vm = this
      const api = `${process.env.APIPATH}/api/user/check`
      vm.$http.post(api).then((response) => {
        if (!(response.data.success)) {
          this.$router.push('/login')
        }
      })
    }
  },
  computed: {
    ...mapGetters('backendModules', ['isLoading'])
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)occToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
  },
  components: {
    Navbar,
    Sidebar,
    BackendMSG
  }
}
</script>
