<template>
  <div class="content">
    <div class="banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">商品資訊</p>
    </div>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item text-secondary">首頁</li>
          <li class="breadcrumb-item text-secondary">商品列表</li>
          <li class="breadcrumb-item text-secondary">{{ product.category }}</li>
          <li class="breadcrumb-item text-success" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row justify-content-between mb-5">
        <div class="col-6 bg-light d-flex-center">
          <img
            :src="product.imgUrl"
            alt=""
            class="img-fluid img-transparent mb-3"
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-between">
            <h4 class="fw-bold">{{ product.title }}</h4>
            <i class="bi bi-bookmark-heart fs-4"></i>
          </div>
          <hr />
          <p>{{ product.description }}</p>
          <h6>保存方式：</h6>
          <p>{{ product.content }}</p>
          <div class="d-flex">
            <div class="input-group mb-3 mx-auto text-center w-50">
              <button
                type="button"
                class="input-group-text"
                :disabled="singleProduct.joined || singleProduct.num === 1"
                @click="singleProduct.num--"
              >
                <i class="bi bi-dash-lg"></i>
              </button>
              <p class="form-control m-0">{{ singleProduct.num }}</p>
              <button
                type="button"
                class="input-group-text"
                :disabled="singleProduct.joined"
                @click="singleProduct.num++"
              >
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
            <button
              type="button"
              class="btn rounded-0 d-block mx-auto fw-bold"
              :class="[
                !singleProduct.joined
                  ? 'btn-outline-success'
                  : ['btn-outline-secondary'],
              ]"
              :disabled="singleProduct.joined"
              @click="addToCart(singleProduct.id, singleProduct.num)"
            >
              <i
                class="bi bi-cart-plus-fill me-1"
                v-show="!singleProduct.joined"
              ></i
              >{{ !singleProduct.joined ? '加入購物車' : '已加入購物車' }}
            </button>
          </div>
        </div>
      </div>
      <hr class="border border-success border-3" />
      <h2 class="fw-bold mt-4 text-center mb-3">相關商品</h2>
      <Swiper
        :slides-per-view="4"
        :space-between="50"
        :loop="true"
        :loopFillGroupWithBlank="true"
        :autoplay="autoplay"
      >
        <SwiperSlide v-for="item in RelatedProducts" :key="item.id">
          <div @click="$router.push(`/detailed/${item.id}`)">
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
            >
              <img
                :src="item.imgUrl"
                class="img-transparent"
                :alt="item.title"
              />
              <p class="position-absolute text-white fw-bold fs-4">查看更多</p>
              <div class="position-absolute text-warning top-0 mt-1 ms-3 w-100">
                <i
                  class="bi"
                  :class="[
                    item.options.rating >= num ? 'bi-star-fill' : 'bi-star',
                  ]"
                  v-for="num in 5"
                  :key="num"
                ></i>
              </div>
            </div>
          </div>
          <a
            href="#"
            class="position-absolute top-0 end-0 mt-1 me-2"
            @click.prevent="item.bookmark = !item.bookmark"
          >
            <i
              class="bi fs-3"
              :class="[
                item.bookmark
                  ? ['text-success', 'bi-bookmark-heart-fill']
                  : ['text-secondary', 'bi-bookmark-heart'],
              ]"
            ></i>
          </a>
          <h5 class="card-title text-center fw-bold mt-3">{{ item.title }}</h5>
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
        </SwiperSlide>
      </Swiper>
    </div>
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
</template>
<script>
export default {
  data() {
    return {
      product: {},
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      allProducts: [],
      test: [],
      id: '',
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/product/${this.id}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
        }
        this.isLoading = false;
      });
    },
    getAllProducts() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      this.isLoading = true;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = Object.values(res.data.products);
            this.allProducts = this.allProducts.map((item) => ({
              ...item, num: 1, joined: false, bookmark: false,
            }));
            this.getCart();
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
        });
    },
    getCart() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.$bus.emit('cartsQuantity', res.data.data.carts.length);
            res.data.data.carts.forEach((cartsItem) => {
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
  },
  computed: {
    RelatedProducts() {
      const newArr = this.allProducts.filter((item) => item.category === this.product.category);
      return newArr;
    },
    singleProduct() {
      const newArr = this.allProducts.filter((item) => item.title === this.product.title);
      const data = newArr[0] ?? {};
      return data;
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getAllProducts();
    this.getProduct();
    this.$bus.on('products', (data) => {
      this.test = data; // 將data存到this.test
      console.log(this); // 查看this的test，確實有存到資料
    });
    console.log(this); // 查看this的test，資料卻遺失了，導致其他methods無法使用test的資料
  },
};
</script>

<style scoped lang="scss">
.swiper-slide img {
  width: 150px;
  height: 150px;
}

.img-content {
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.4) !important;
    p {
      display: block;
    }
    img {
      transition: 0.5s;
      filter: grayscale(50%);
      transform: scale(1.2, 1.2);
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

.banner {
  background-image: url('~@/assets/images/banner3.jpg');
  background-position: center;
  background-size: cover;
  height: 300px;
}
</style>
