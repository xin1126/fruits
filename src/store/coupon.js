export default {
  state: {
    couponNum: JSON.parse(localStorage.getItem('couponNum')) || {},
    discount: JSON.parse(localStorage.getItem('discount')) || { status: 0 },
  },
  actions: {
    updateCoupon({ commit }, num) {
      commit('updateCoupon', num);
    },
    removeCoupon({ commit }, num) {
      commit('removeCoupon', num);
    },
    updateDiscount({ commit }, status) {
      commit('updateDiscount', status);
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
    updateDiscount(state, status) {
      state.discount = status;
      localStorage.setItem('discount', JSON.stringify(state.discount));
    },
  },
  getters: {
    couponNum(state) {
      return state.couponNum;
    },
    discount(state) {
      return state.discount;
    },
  },
};
