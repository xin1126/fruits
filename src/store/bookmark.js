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
    updateBookmark(state, id) {
      const { allProducts } = this.state.allProductsModules;
      allProducts.forEach((item, index) => {
        if (item.id === id) {
          allProducts[index].bookmark = !allProducts[index].bookmark;
        }
      });
      if ((allProducts.filter((item) => item.id === id))[0].bookmark) {
        const newArr = allProducts.filter((item) => item.id === id);
        state.collectionData.push(newArr[0]);
      } else {
        state.collectionData = state.collectionData.filter((item) => item.id !== id);
      }
      localStorage.setItem('listData', JSON.stringify(state.collectionData));
    },
  },
};
