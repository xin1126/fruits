export default {
  state: {
    couponNum: JSON.parse(localStorage.getItem('couponNum')) || {},
  },
  actions: {
    updateCoupon({ commit }, num) {
      commit('updateCoupon', num);
    },
    removeCoupon({ commit }, num) {
      commit('removeCoupon', num);
    },
  },
  mutations: {
    updateCoupon(state, num) {
      state.couponNum[num] = state.couponNum[num] + 1 || 1;
      localStorage.setItem('couponNum', JSON.stringify(state.couponNum));
    },
    removeCoupon(state, num) {
      state.couponNum[num] -= 1;
      if (state.couponNum[num] === 0) {
        delete state.couponNum[num];
      }
      localStorage.setItem('couponNum', JSON.stringify(state.couponNum));
    },
  },
  getters: {
    couponNum(state) {
      return state.couponNum;
    },
  },
};
