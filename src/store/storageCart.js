export default {
  state: {
    storageCart: JSON.parse(localStorage.getItem('cart')) || {},
    repeat: false,
  },
  actions: {
    updateCart({ commit }, pucduct) {
      commit('updateCart', pucduct);
    },
    deleteCart({ commit }, id) {
      commit('deleteCart', id);
    },
    deleteAllCart({ commit }) {
      commit('deleteAllCart');
    },
  },
  mutations: {
    updateCart(state, pucduct) {
      const { id, qty } = pucduct;
      if (Object.keys(state.storageCart).length === 0) {
        state.storageCart[id] = qty;
        state.repeat = false;
      } else {
        const arrId = Object.entries(state.storageCart).map((item) => item[0]);
        const indexId = arrId.indexOf(id);
        const target = state.storageCart[arrId[indexId]];
        if (indexId < 0) {
          state.storageCart[id] = qty;
          state.repeat = false;
        } else {
          state.storageCart[arrId[indexId]] = target + qty;
          state.repeat = true;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.storageCart));
    },
    deleteCart(state, id) {
      delete state.storageCart[id];
      localStorage.setItem('cart', JSON.stringify(state.storageCart));
    },
    deleteAllCart(state) {
      state.storageCart = {};
      localStorage.setItem('cart', JSON.stringify(state.storageCart));
    },
  },
  getters: {
    storageCart(state) {
      return state.storageCart;
    },
    repeat(state) {
      return state.repeat;
    },
  },
};
