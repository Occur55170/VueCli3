export default {
  namespaced: true,
  state: {
    messages: []
  },
  actions: {
    updateMessage (context, message) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('UPDATEMESSAGE', { message, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit('REMOVEMESSAGE', i)
            this.dispatch('updateLoad', false)
          }
        })
      }, 1000)
    }
  },
  mutations: {
    UPDATEMESSAGE (state, payload) {
      state.messages.push(payload)
    },
    REMOVEMESSAGE (state, payload) {
      state.messages.splice(payload, 1)
    }
  },
  getters: {
    messages: (state) => state.messages
  }
}
