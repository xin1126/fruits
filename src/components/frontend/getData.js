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
  this.axios.get(url)
    .then((res) => {
      if (res.data.success) {
        this.cart = res.data.data;
        this.$bus.emit('cartsQuantity', this.cart.carts.length);
        this.cart.carts.forEach((cartsItem) => {
          this.allProducts.forEach((productsItem, index) => {
            if (cartsItem.product.id === productsItem.id) {
              this.allProducts[index].joined = true;
              this.allProducts[index].num = 1;
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
