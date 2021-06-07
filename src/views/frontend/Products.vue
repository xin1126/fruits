<template>
  <section class="content">
    <div class="banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">商品列表</p>
    </div>
    <button type="button" @click="fn">測試</button>
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
            <ProductImg :item="item" @bookmark-data="bookmark" />
            <AddToCart :item="item" @get-data="getCart" @is-loading="loading" />
          </div>
        </li>
      </ul>
      <hr class="border border-success border-3" />
      <h3 class="text-center fw-bold mb-3">五星好評熱門商品</h3>
      <Swiper
        :slides-per-view="4"
        :space-between="50"
        :loop="true"
        :loopFillGroupWithBlank="true"
        :autoplay="autoplay"
      >
        <SwiperSlide v-for="item in fiveStarsProducts" :key="item.id">
          <ProductImg :item="item" />
        </SwiperSlide>
      </Swiper>
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
import ProductImg from '@/components/frontend/ProductImg.vue';
import AddToCart from '@/components/frontend/AddToCart.vue';
import { getAllProducts, getCart } from '@/components/frontend/getData';

export default {
  data() {
    return {
      categoryValue: 'total',
      cart: {},
      allProducts: [],
      category: [],
      collectionData: JSON.parse(localStorage.getItem('listData')) || [],
      isLoading: false,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    };
  },
  components: {
    ProductImg,
    AddToCart,
  },
  methods: {
    getAllProducts() { },
    tempCart() { },
    getCart() {
      this.tempCart();
    },
    loading(boolean) {
      this.isLoading = boolean;
    },
    bookmark(bool, id) {
      if (bool) {
        const newArr = this.allProducts.filter((item) => item.id === id);
        this.collectionData.push(newArr[0]);
      } else {
        this.collectionData = this.collectionData.filter((item) => item.id !== id);
      }
      localStorage.setItem('listData', JSON.stringify(this.collectionData));
    },
  },
  computed: {
    categoryProducts() {
      const newArr = this.categoryValue === 'total' ? this.allProducts : this.allProducts.filter((item) => item.category === this.categoryValue);
      return newArr;
    },
    fiveStarsProducts() {
      const newArr = this.allProducts.filter((item) => item.options.rating === '5');
      return newArr;
    },
  },
  created() {
    this.tempCart = getCart;
    this.getAllProducts = getAllProducts;
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>

<style scoped lang="scss">
.swiper-slide img {
  width: 150px;
  height: 150px;
}
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
</style>
