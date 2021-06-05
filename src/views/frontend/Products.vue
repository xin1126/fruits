<template>
  <section class="content">
    <div class="banner d-flex-center text-white fs-2 mb-4">
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
            @click.prevent="categoryValue = 'total'"
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
            @click.prevent="categoryValue = item"
            :class="[categoryValue === item ? 'text-success' : 'text-dark']"
            >{{ item }}</a
          >
        </li>
      </ul>
      <ul class="row row-cols-1 row-cols-md-4 g-4 p-0">
        <li class="col" v-for="item in categoryProducts" :key="item.id">
          <div class="card h-100 border-0">
            <div
              class="
                img-content
                position-relative
                d-flex-center
                bg-light
                cursor-pointer
                w-100
                py-4
              "
              @click="$router.push(`/frontend/detailed/${item.id}`)"
            >
              <img
                :src="item.imgUrl"
                class="img-transparent"
                :alt="item.title"
              />
              <p class="position-absolute text-white fw-bold fs-4">查看更多</p>
            </div>
            <div class="card-body">
              <h5 class="card-title text-center fw-bold">{{ item.title }}</h5>
              <div class="d-flex justify-content-center">
                <small
                  class="
                    card-text
                    text-decoration-line-through text-secondary
                    mt-1
                    me-2
                  "
                >
                  原價:NT${{ item.origin_price }}
                </small>
                <p class="fw-bold">售價:NT${{ item.price }}</p>
              </div>
              <div class="input-group mb-3 mx-auto text-center w-75">
                <button
                  type="button"
                  class="input-group-text"
                  :disabled="item.joined || item.num === 1"
                  @click="item.num--"
                >
                  <i class="bi bi-dash-lg"></i>
                </button>
                <p class="form-control m-0">{{ item.num }}</p>
                <button
                  type="button"
                  class="input-group-text"
                  :disabled="item.joined"
                  @click="item.num++"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
              <button
                type="button"
                class="btn rounded-0 d-block mx-auto fw-bold"
                :class="[
                  !item.joined
                    ? 'btn-outline-success'
                    : ['btn-outline-secondary'],
                ]"
                :disabled="item.joined"
                @click="addToCart(item.id, item.num)"
              >
                <i class="bi bi-cart-plus-fill me-1" v-show="!item.joined"></i
                >{{ !item.joined ? '加入購物車' : '已加入購物車' }}
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
      cart: {},
      allProducts: [],
      category: [],
      isLoading: false,
    };
  },
  methods: {
    getAllProducts() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = Object.values(res.data.products);
            this.allProducts = this.allProducts.map((item) => ({ ...item, num: 1, joined: false }));
            this.category = new Set(Object.values(res.data.products).map((item) => item.category));
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
        });
    },
    addToCart(id, qty) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      this.axios.post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: `${res.data.data.product.title}加入購物車`, icon: 'success' });
            this.allProducts.forEach((item, index) => {
              if (item.id === id) {
                this.allProducts[index].num = 1;
              }
            });
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
      this.isLoading = true;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.$bus.emit('cartsQuantity', this.cart.carts.length);
            this.cart.carts.forEach((cartsItem) => {
              this.allProducts.forEach((productsItem, index) => {
                if (cartsItem.product.id === productsItem.id) {
                  this.allProducts[index].joined = true;
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
    },
  },
  computed: {
    categoryProducts() {
      const newArr = this.categoryValue === 'total' ? this.allProducts : this.allProducts.filter((item) => item.category === this.categoryValue);
      return newArr;
    },
  },
  mounted() {
    this.getAllProducts();
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
    p {
      display: block;
    }
  }
  img {
    width: 150px;
    height: 150px;
  }
  p {
    display: none;
  }
}
</style>
