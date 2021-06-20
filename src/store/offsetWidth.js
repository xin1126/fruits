export default {
  state: {
    offsetWidth: {},
  },
  actions: {
    initOffsetWidth({ commit }) {
      commit('initOffsetWidth');
    },
    updateOffsetWidth({ commit }) {
      commit('updateOffsetWidth');
    },
  },
  mutations: {
    initOffsetWidth(state) {
      state.offsetWidth.width = window.innerWidth;
    },
    updateOffsetWidth(state) {
      state.offsetWidth.width = document.body.offsetWidth;
      state.offsetWidth.list = state.offsetWidth.width < 992;
      state.offsetWidth.offset = -40;
      if (state.offsetWidth.width < 992 && state.offsetWidth.width >= 768) {
        state.offsetWidth.slidesView = 2;
      } else if (state.offsetWidth.width < 768) {
        state.offsetWidth.slidesView = 1;
        state.offsetWidth.offset = -30;
      } else {
        state.offsetWidth.slidesView = 4;
      }
    },
  },
  getters: {
    offsetWidthData(state) {
      return state.offsetWidth;
    },
    offsetWidth(state) {
      return state.offsetWidth.width;
    },
  },
};
