import { createStore } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default createStore({
  state: {
    isLoading: false,
    allProducts: [],
    category: [],
    cart: {},
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getAllProducts(context) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(url)
        .then((res) => {
          if (res.data.success) {
            context.commit('ALLPRODUCTS', Object.values(res.data.products).map((item) => ({
              ...item, num: 1, joined: false, bookmark: false,
            })));
            context.commit('CATEGORY', new Set(Object.values(res.data.products).map((item) => item.category)));
          } else {
            context.commit('LOADING', false);
            Swal.fire(res.data.message);
          }
        })
        .catch(() => {
          context.commit('LOADING', false);
          Swal.fire('請求API失敗');
        });
    },
    getCart(context) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      axios.get(url)
        .then((res) => {
          if (res.data.success) {
            context.commit('CART', res.data.data);
          } else {
            context.commit('LOADING', false);
            Swal.fire(res.data.message);
          }
        })
        .catch(() => {
          context.commit('LOADING', false);
          Swal.fire('請求API失敗');
        });
    },
    data(context) {
      context.commit('DATA');
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    CATEGORY(state, payload) {
      state.category = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    DATA(state) {
      state.cart.carts.forEach((cartsItem) => {
        state.allProducts.forEach((productsItem, index) => {
          if (cartsItem.product.id === productsItem.id) {
            state.allProducts[index].joined = true;
            state.allProducts[index].num = 1;
          }
        });
      });
    },
  },
  modules: {},
});
