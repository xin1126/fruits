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
    allProducts: [],
    num: {},
    title: {},
  },
  actions: {
    getAllProducts({ commit }, status = true) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      commit('loading', status);
      axios.get(url)
        .then((res) => {
          if (res.data.success) {
            commit('allProducts', Object.values(res.data.products).map((item) => ({
              ...item, joined: false, bookmark: false,
            })));
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
    updateProductNum({ commit }, data) {
      commit('updateNum', data);
    },
  },
  mutations: {
    updateNum(state, data) {
      const [id, num] = data;
      state.num[id] = num;
    },
    allProducts(state, payload) {
      state.allProducts = payload;
      state.allProducts.forEach((item) => {
        state.num[item.id] = 1;
        state.title[item.title] = '加入購物車';
      });
    },
  },
  getters: {
    allProducts(state) {
      return state.allProducts;
    },
    num(state) {
      return state.num;
    },
    title(state) {
      return state.title;
    },
  },
};
