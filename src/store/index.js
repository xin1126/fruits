import { createStore } from 'vuex';
import allProductsModules from './allProducts';
import bookmarkModules from './bookmark';
import cartModules from './cart';
import offsetWidthModules from './offsetWidth';
import couponModules from './coupon';
import viewModule from './view';
import storageCartModules from './storageCart';

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
      const { title } = state.allProductsModules;
      const { allProducts } = state.allProductsModules;
      const { storageCart } = state.storageCartModules;
      Object.entries(storageCart).forEach((cartsItem) => {
        allProducts.forEach((productsItem, index) => {
          if (cartsItem[0] === productsItem.id) {
            allProducts[index].joined = true;
            title[productsItem.title] = '已加入購物車，點擊繼續加購';
          }
        });
      });
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  modules: {
    allProductsModules,
    bookmarkModules,
    cartModules,
    offsetWidthModules,
    couponModules,
    viewModule,
    storageCartModules,
  },
});
