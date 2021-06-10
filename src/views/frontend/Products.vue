<template>
  <section class="content">
    <div class="banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">商品列表</p>
    </div>
    <div class="container">
      <nav aria-label="breadcrumb" id="topProduct">
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-gray">商品列表</li>
          <li class="breadcrumb-item text-secondary">全部商品</li>
        </ol>
      </nav>
      <ul class="d-flex-center fw-bold fs-5 border-none border-wave">
        <li class="pe-3 border-end border-gray border-4">
          <a
            href="#"
            @click.prevent="categoryCutover('total')"
            :class="[
              categoryValue === 'total' ? 'text-secondary' : 'text-dark',
            ]"
            >全部商品</a
          >
        </li>
        <li
          class="px-3 border-end border-gray border-4"
          v-for="item in category"
          :key="item"
          :data-title="item"
        >
          <a
            href="#"
            @click.prevent="categoryCutover(item)"
            :class="[categoryValue === item ? 'text-secondary' : 'text-dark']"
            >{{ item }}</a
          >
        </li>
      </ul>
      <ul class="row row-cols-1 row-cols-md-4 g-4 p-0">
        <li
          class="col"
          v-for="item in categoryProducts"
          :key="item.id"
          :class="{ animate__animated: animate, animate__fadeIn: animate }"
        >
          <div class="card h-100 border-0">
            <ProductImg :item="item" @bookmark-data="bookmark" />
            <AddToCart :item="item" @get-data="getCart" @is-loading="loading" />
          </div>
        </li>
      </ul>
      <Pagination
        :category="categoryValue"
        :pagination="pagination"
        @page="pageData"
      />
      <hr class="border border-primary border-3" />
      <h3 class="text-center text-secondary fw-bold mb-3">促銷商品</h3>
      <Swiper
        :slides-per-view="4"
        :space-between="50"
        :loop="true"
        :loopFillGroupWithBlank="true"
        :autoplay="autoplay"
      >
        <SwiperSlide v-for="item in fiveStarsProducts" :key="item.id">
          <ProductImg :item="item" @bookmark-data="bookmark" />
        </SwiperSlide>
      </Swiper>
    </div>
    <Loading :active="isLoading">
      <img src="https://i.imgur.com/lTfnxVN.gif" alt="loading" />
    </Loading>
  </section>
</template>

<script>
import ProductImg from '@/components/frontend/ProductImg.vue';
import AddToCart from '@/components/frontend/AddToCart.vue';
import Pagination from '@/components/Pagination.vue';
import { getAllProducts, getCart } from '@/components/frontend/getData';

export default {
  data() {
    return {
      categoryValue: 'total',
      allProducts: [],
      category: [],
      products: [],
      collectionData: JSON.parse(localStorage.getItem('listData')) || [],
      cart: {},
      pagination: {},
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      isLoading: false,
      animate: false,
    };
  },
  components: {
    ProductImg,
    AddToCart,
    Pagination,
  },
  methods: {
    categoryCutover(item) {
      this.categoryValue = item;
      this.animate = true;
    },
    pageData(num) {
      const min = (num * 12) - 12 + 1;
      const max = (num * 12);
      this.pagination.has_pre = num !== 1;
      this.pagination.has_next = num !== this.pagination.total_pages;
      this.pagination.current_page = num;
      this.products = this.allProducts.filter((i, index) => index + 1 >= min && index + 1 <= max);
    },
    getAllProducts() {
      this.getAllProducts = getAllProducts;
      this.getAllProducts();
    },
    tempCart() {
      this.tempCart = getCart;
    },
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
      const newArr = this.categoryValue === 'total' ? this.products : this.allProducts.filter((item) => item.category === this.categoryValue);
      return newArr;
    },
    fiveStarsProducts() {
      const newArr = this.allProducts.filter((item) => item.options.rating === '5');
      return newArr;
    },
  },
  watch: {
    allProducts() {
      this.products = this.allProducts.filter((item, index) => index + 1 >= 1 && index + 1 <= 12);
      this.pagination = {
        total_pages: Math.ceil(this.allProducts.length / 12),
        current_page: 1,
        has_pre: false,
        has_next: true,
      };
    },
  },
  mounted() {
    this.tempCart();
    this.getAllProducts();
    this.pageData();
  },
};
</script>

<style scoped lang="scss">
a:hover {
  color: #b05b0a !important;
}

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
