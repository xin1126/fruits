export default {
  state: {
    collectionData: JSON.parse(localStorage.getItem('listData')) || [],
  },
  actions: {
    initBookmark({ commit }, id) {
      commit('initBookmark', id);
    },
    updateBookmark({ commit }, status) {
      commit('updateBookmark', status);
    },
    updateCollectionData({ commit }) {
      commit('updateCollection');
    },
  },
  mutations: {
    initBookmark(state, id) {
      const { allProducts } = this.state.allProductsModules;
      state.collectionData.forEach(((item) => {
        if (item.id === id) {
          allProducts[(allProducts.map((key) => key.id)).indexOf(id)].bookmark = true;
        }
      }));
    },
    updateBookmark(state, status) {
      const [id, favorites] = status;
      if (favorites) {
        state.collectionData = state.collectionData.filter((item) => item.id !== id);
        localStorage.setItem('listData', JSON.stringify(state.collectionData));
        return;
      }
      const { allProducts } = this.state.allProductsModules;
      const data = allProducts.filter((item) => item.id === id)[0];
      allProducts.forEach((item, index) => {
        if (item.id === id) {
          allProducts[index].bookmark = !allProducts[index].bookmark;
        }
      });
      if (data.bookmark) {
        state.collectionData.push(data);
      } else {
        state.collectionData = state.collectionData.filter((item) => item.id !== id);
      }
      localStorage.setItem('listData', JSON.stringify(state.collectionData));
    },
    updateCollection(state) {
      const { cart } = this.state.cartModules;
      state.collectionData.forEach((item, index) => {
        state.collectionData[index].joined = false;
      });
      cart.carts.forEach((cartsItem) => {
        state.collectionData.forEach((collectionDItem, index) => {
          if (cartsItem.product.id === collectionDItem.id) {
            state.collectionData[index].joined = true;
          }
        });
      });
      localStorage.setItem('listData', JSON.stringify(state.collectionData));
    },
  },
  getters: {
    collectionData(state) {
      return state.collectionData;
    },
  },
};
