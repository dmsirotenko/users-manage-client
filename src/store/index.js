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
    },
    deleteUser({ commit, state }, id) {
      let index = state.users.findIndex(user => user.id === id);

      state.users.splice(index, 1);
    }
  },
  getters: {
    getUserById: state => id => {
      return state.users.find(user => user.id === id);
    }
  }
};
