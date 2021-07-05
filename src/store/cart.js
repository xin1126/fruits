import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const Toast = Swal.mixin({
  toast: true,
  position: 'content',
  showConfirmButton: false,
  timer: 2500,
});

export default {
  state: {
    cart: {},
  },
  actions: {
    getCart({ commit }, status = true) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      commit('loading', status);
      axios.get(url)
        .then((res) => {
          if (res.data.success) {
            commit('cart', res.data.data);
          } else {
            Swal.fire(res.data.message);
          }
          commit('loading', false);
        })
        .catch(() => {
          commit('loading', false);
          Toast.fire({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
        });
    },
  },
  mutations: {
    cart(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    cart(state) {
      return state.cart;
    },
  },
};
