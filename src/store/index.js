import { createStore } from 'vuex';
import allProductsModules from './allProducts';
import bookmarkModules from './bookmark';
import cartModules from './cart';

export default createStore({
  strict: true,
  state: {
    isLoading: false,
  },
  actions: {
    updateLoading({ commit }, id) {
      commit('loading', id);
    },
    data({ commit }) {
      commit('data');
    },
  },
  mutations: {
    loading(state, status) {
      state.isLoading = status;
    },
    data(state) {
      const { allProducts } = state.allProductsModules;
      const { cart } = state.cartModules;
      cart.carts.forEach((cartsItem) => {
        allProducts.forEach((productsItem, index) => {
          if (cartsItem.product.id === productsItem.id) {
            allProducts[index].joined = true;
            allProducts[index].num = 1;
          }
        });
      });
    },
  },
  modules: {
    allProductsModules,
    bookmarkModules,
    cartModules,
  },
});
