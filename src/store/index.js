export default {
  state: {
    users: []
  },
  mutations: {
    users(state, users) {
      state.users = users;
    }
  },
  actions: {
    addUsers({ commit, state }, users) {
      state.users.unshift(...users);
    }
  },
  getters: {
    getUserById: state => id => {
      return state.users.find(user => user.id === id);
    }
  }
};
