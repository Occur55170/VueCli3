export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
    messages: []
  },
  actions: {
    updateload (context, status) {
      context.commit('LOAD', status)
    },
    updateMessage (context, { message, success }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('MESSAGE', { message, success, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessage (context, num) {
      context.commit('REMOVEMESSAGE', num)
    },
    removeMessageWithTiming (context, timestamp) {
      context.commit('REMOVEMESSAGEWITHTIME', timestamp)
    }
  },
  mutations: {
    LOAD (state, status) {
      state.isLoading = status
    },
    MESSAGE (state, status) {
      state.messages.push(status)
    },
    REMOVEMESSAGEWITHTIME (state, status) {
      setTimeout(() => {
        state.messages.forEach((item, i) => {
          if (item.timestamp === status) {
            state.messages.splice(i, 1)
          }
        })
      }, 5000)
    },
    REMOVEMESSAGE (state, num) {
      state.messages.splice(num, 1)
    }
  },
  getters: {
    isLoading: state => state.isLoading,
    messages: state => state.messages
  }
}
