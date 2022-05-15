<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" :class="`alert-${item.success}`" v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    ...mapActions('backendModules', ['updateMessage', 'removeMessage', 'removeMessageWithTiming'])
  },
  computed: {
    ...mapGetters('backendModules', ['messages'])
  }
}
</script>

<style lang="scss" scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
