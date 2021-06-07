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
          <li class="breadcrumb-item text-secondary">
            {{ singleProduct.category }}
          </li>
          <li class="breadcrumb-item text-success" aria-current="page">
            {{ singleProduct.title }}
          </li>
        </ol>
      </nav>
      <div class="row justify-content-between mb-5">
        <div class="col-6 bg-light d-flex-center">
          <img
            :src="singleProduct.imgUrl"
            alt=""
            class="img-fluid img-transparent mb-3"
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-between">
            <h4 class="fw-bold">{{ singleProduct.title }}</h4>
            <i class="bi bi-bookmark-heart fs-4"></i>
          </div>
          <hr />
          <p>{{ singleProduct.description }}</p>
          <h6>保存方式：</h6>
          <p>{{ singleProduct.content }}</p>
          <div class="d-flex justify-content-between">
            <AddToCart
              :item="singleProduct"
              @get-data="getCart"
              @is-loading="loading"
            />
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
        <SwiperSlide v-for="item in relatedProducts" :key="item.id">
          <ProductImg :item="item" />
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
import ProductImg from '@/components/frontend/ProductImg.vue';
import AddToCart from '@/components/frontend/AddToCart.vue';
import { getAllProducts, getCart } from '@/components/frontend/getData';

export default {
  data() {
    return {
      product: {},
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      allProducts: [],
      id: '',
      isLoading: false,
    };
  },
  components: {
    ProductImg,
    AddToCart,
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
    getAllProducts() { },
    tempCart() { },
    getCart() {
      this.tempCart();
    },
    loading(boolean) {
      this.isLoading = boolean;
    },
  },
  computed: {
    relatedProducts() {
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
    this.tempCart = getCart;
    this.getAllProducts = getAllProducts;
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getAllProducts();
    this.getProduct();
  },
};
</script>

<style scoped lang="scss">
.swiper-slide img {
  width: 150px;
  height: 150px;
}

.banner {
  background-image: url('~@/assets/images/banner3.jpg');
  background-position: center;
  background-size: cover;
  height: 300px;
}
</style>
