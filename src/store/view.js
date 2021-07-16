export default {
  state: {
    view: false,
  },
  actions: {
    updateView({ commit }, status) {
      commit('updateView', status);
    },
  },
  mutations: {
    updateView(state, status) {
      state.view = status;
    },
  },
  getters: {
    view(state) {
      return state.view;
    },
  },
};
