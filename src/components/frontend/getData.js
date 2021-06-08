export function getAllProducts() {
  const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products/all`;
  this.isLoading = true;
  this.axios.get(url)
    .then((res) => {
      if (res.data.success) {
        this.allProducts = Object.values(res.data.products);
        this.allProducts = this.allProducts.map((item) => ({
          ...item, num: 1, joined: false, bookmark: false,
        }));
        this.collectionData.forEach((collectionItem) => {
          this.allProducts.forEach((productsItem, index) => {
            if (collectionItem.id === productsItem.id) {
              this.allProducts[index].bookmark = true;
            }
          });
        });
        this.category = new Set(Object.values(res.data.products).map((item) => item.category));
        this.getCart();
      } else {
        this.$swal({ title: res.data.message, icon: 'error' });
      }
    })
    .catch((error) => {
      this.$swal({ title: error.data.message, icon: 'error' });
    });
}

export function getCart() {
  const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
  const arr = this.categoryValue === 'total' ? 'products' : 'allProducts';
  this.axios.get(url)
    .then((res) => {
      if (res.data.success) {
        this.cart = res.data.data;
        this.$bus.emit('cartsQuantity', this.cart.carts.length);
        this.cart.carts.forEach((cartsItem) => {
          this[arr].forEach((productsItem, index) => {
            if (cartsItem.product.id === productsItem.id) {
              this[arr][index].joined = true;
              this[arr][index].num = 1;
            }
          });
        });
      } else {
        this.$swal({ title: res.data.message, icon: 'error' });
      }
      this.isLoading = false;
    })
    .catch((error) => {
      this.$swal({ title: error.data?.message, icon: 'error' });
      this.isLoading = false;
    });
}
