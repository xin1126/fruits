<template>
  <section class="content">
    <div class="banner d-flex-center text-white fs-2 mb-3">
      <p class="bg-translucent fw-bolder px-5 py-3">商品列表</p>
    </div>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-secondary">首頁</li>
          <li class="breadcrumb-item text-secondary">商品列表</li>
          <li class="breadcrumb-item text-success">全部商品</li>
        </ol>
      </nav>
      <ul class="d-flex-center fw-bold fs-5 border-none border-wave">
        <li class="pe-3 border-end border-secondary border-4">
          <a
            href="#"
            @click="categoryValue = 'total'"
            :class="[categoryValue === 'total' ? 'text-success' : 'text-dark']"
            >全部商品</a
          >
        </li>
        <li
          class="px-3 border-end border-secondary border-4"
          v-for="item in category"
          :key="item"
          :data-title="item"
        >
          <a
            href="#"
            @click="categoryValue = item"
            :class="[categoryValue === item ? 'text-success' : 'text-dark']"
            >{{ item }}</a
          >
        </li>
      </ul>
      <ul class="row row-cols-1 row-cols-md-4 g-4 p-0">
        <li class="col" v-for="item in categoryProducts" :key="item.id">
          <div class="card h-100 border-0">
            <div
              class="img-content position-relative d-flex-center bg-light cursor-pointer w-100 py-4"
            >
              <img
                :src="item.imgUrl"
                class="img-transparent"
                :alt="item.title"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title text-center fw-bold">{{ item.title }}</h5>
              <p class="text-align-justfy">{{ item.description }}</p>
              <div class="d-flex justify-content-center">
                <small
                  class="card-text text-decoration-line-through text-secondary mt-1 me-2"
                >
                  NT${{ item.origin_price }}
                </small>
                <p class="fw-bold">NT${{ item.price }}</p>
              </div>
              <button
                class="btn btn-outline-success rounded-0 d-block mx-auto fw-bold"
                @click="addToCart(item.id)"
              >
                <i class="bi bi-cart-plus-fill me-1"></i>加入購物車
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <loading v-model:active="isLoading">
      <div class="loadingio-spinner-spin-3mx4cy187my">
        <div class="ldio-vvip0fav2if">
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div>
      </div>
    </loading>
  </section>
</template>

<script>
export default {
  data() {
    return {
      categoryValue: 'total',
      pagination: {},
      cart: {},
      products: [],
      allProducts: [],
      category: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts(num = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products?page=${num}`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$router.push('/');
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.isLoading = false;
        });
    },
    getAllProducts() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = Object.values(res.data.products);
            this.category = new Set(Object.values(res.data.products).map((item) => item.category));
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
        });
    },
    addToCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      this.axios.post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: res.data.message, icon: 'success' });
            this.isLoading = false;
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.isLoading = false;
        });
    },
    getCart() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.$bus.emit('cartsQuantity', this.cart.carts.length);
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data?.message, icon: 'error' });
        });
    },
  },
  computed: {
    categoryProducts() {
      const newArr = this.categoryValue === 'total' ? this.products : this.allProducts.filter((item) => item.category === this.categoryValue);
      return newArr;
    },
  },
  mounted() {
    this.getProducts();
    this.getAllProducts();
    this.getCart();
  },
};
</script>

<style scoped lang="scss">
.border-none > li:last-child {
  border: none !important;
}
.banner {
  background-image: url('~@/assets/images/banner1.jpg');
  background-position: bottom;
  background-size: cover;
  padding-top: 70px;
  height: 300px;
}
.img-content {
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.4) !important;
  }
  img {
    width: 150px;
    height: 150px;
  }
}
</style>
