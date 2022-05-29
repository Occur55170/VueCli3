<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: '幸福烘焙',
    titleTemplate: '%s | 幸福烘焙'
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
</style>
