<template>
  <section class="content">
    <div class="products-banner d-flex-center text-white fs-2 mb-lg-4 mb-2">
      <p class="bg-translucent fw-bolder px-lg-5 py-lg-3 px-4 py-2 m-0">
        商品列表
      </p>
    </div>
    <div class="container mb-5">
      <nav aria-label="breadcrumb" id="topProduct" class="bg-white mb-lg-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-gray">商品列表</li>
          <li class="breadcrumb-item text-secondary">全部商品</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-3 position-sticky title-top">
          <ProductList
            :widthData="width"
            :allData="allProducts"
            :categoryValue="categoryValue"
            @emitData="productsData"
          />
        </div>
        <div class="col-lg-9 mb-4">
          <div class="row justify-content-between">
            <div class="col-lg-4 d-lg-block d-none">
              <select
                class="form-select rounded-0"
                aria-label="Default select example"
                v-model="optionValue"
                @change="productsData(optionValue, 'select')"
              >
                <option value="" disabled>搜尋產品價格、星級</option>
                <option value="highPrice">商品價格由高到低</option>
                <option value="lowPrice">商品價格由低到高</option>
                <option value="2">二星級商品</option>
                <option value="3">三星級商品</option>
                <option value="4">四星級商品</option>
                <option value="5">五星級商品</option>
              </select>
            </div>
            <div class="col-lg-5 d-lg-block d-none">
              <div class="d-flex justify-content-end align-items-center w-100">
                <label
                  for="exampleFormControlInput1"
                  class="form-label mb-0 me-2"
                  ><i class="bi bi-search"></i
                ></label>
                <input
                  type="email"
                  class="form-control w-50 rounded-0"
                  id="exampleFormControlInput1"
                  placeholder="請輸入產品"
                  v-model="search"
                  @input="productsData(search, 'input')"
                />
              </div>
            </div>
          </div>
          <ul
            class="
              row row-cols-1 row-cols-lg-3 row-cols-md-2
              g-5
              p-0
              mt-5 mt-lg-0
            "
          >
            <li
              class="
                col
                animate__animated animate__fadeIn
                d-flex-center
                mt-lg-4
              "
              v-for="item in productsFilter"
              :key="item.id"
            >
              <div class="card w-100 w-sm-65 w-md-100 h-100 border-0">
                <ProductImg :item="item" @bookmark-data="bookmark" />
                <AddToCart class="mx-auto" :item="item" @get-data="getCart" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Pagination
        :category="categoryValue"
        :pagination="pagination"
        @page="pageData"
      />
      <hr class="border border-primary border-3" />
      <h3 class="text-center text-secondary fw-bold mb-3">促銷商品</h3>
      <Swiper
        :slides-per-view="width.slidesView"
        :space-between="30"
        :loop="true"
        :loopFillGroupWithBlank="true"
        :autoplay="autoplay"
      >
        <SwiperSlide v-for="item in specialOffer" :key="item.id">
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
import ProductList from '@/components/frontend/ProductList.vue';
import AddToCart from '@/components/frontend/AddToCart.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      optionValue: '',
      search: '',
      offsetWidth: '',
      categoryValue: 'total',
      products: [],
      productsFilter: [],
      collectionData: JSON.parse(localStorage.getItem('listData')) || [],
      pagination: {},
      width: {
        slidesView: 4,
        list: '',
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    };
  },
  components: {
    ProductList,
    ProductImg,
    AddToCart,
    Pagination,
  },
  methods: {
    pageData(num) {
      const min = (num * 9) - 9 + 1;
      const max = (num * 9);
      this.pagination.has_pre = num !== 1;
      this.pagination.has_next = num !== this.pagination.total_pages;
      this.pagination.current_page = num;
      this.products = this.allProducts.filter((i, index) => index + 1 >= min && index + 1 <= max);
    },
    getAllProducts() {
      this.$store.dispatch('getAllProducts');
      this.getCart();
    },
    getCart() {
      this.$store.dispatch('getCart');
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
    productsData(value = 'total', status = 'click') {
      switch (status) {
        case 'input':
          if ((this.allProducts.filter((item) => item.title.match(value))).length > 0 && value) {
            this.optionValue = '';
            this.categoryValue = '';
            this.productsFilter = this.allProducts.filter((item) => item.title.match(value));
          } else if (!value) {
            this.optionValue = '';
            this.categoryValue = 'total';
            this.productsFilter = this.products;
          }
          break;
        case 'select':
          this.search = '';
          this.optionValue = value;
          if (value * 1) {
            this.categoryValue = '';
            this.productsFilter = this.allProducts.filter((item) => item.options.rating === value);
          } else if (value === 'highPrice') {
            this.productsFilter = this.allProducts.sort((a, b) => b.price - a.price);
          } else {
            this.productsFilter = this.allProducts.sort((a, b) => a.price - b.price);
          }
          if (!(value * 1)) {
            this.categoryValue = 'total';
            this.productsFilter = this.productsFilter.filter((item, index) => {
              const arr = index + 1 >= 1 && index + 1 <= 9;
              return arr;
            });
          }
          break;
        case 'click':
          this.optionValue = '';
          this.search = '';
          this.categoryValue = value;
          this.productsFilter = this.categoryValue === 'total' ? this.products : this.allProducts.filter((item) => item.category === this.categoryValue);
          break;
        default:
          break;
      }
    },
  },
  computed: {
    specialOffer() {
      const newArr = this.allProducts.filter((item) => item.origin_price !== item.price);
      return newArr;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    allProducts() {
      return this.$store.state.allProducts;
    },
    cart() {
      return this.$store.state.cart;
    },
    data() {
      const { allProducts, cart } = this;
      return {
        allProducts,
        cart,
      };
    },
  },
  watch: {
    data: {
      handler(val) {
        if (val.allProducts.length && Object.values(val.cart).length) {
          this.$store.dispatch('updateLoading', false);
          this.$store.dispatch('data');
        }
      },
      deep: true,
    },
    allProducts() {
      this.products = this.allProducts.filter((item, index) => index + 1 >= 1 && index + 1 <= 9);
      this.pagination = {
        total_pages: Math.ceil(this.allProducts.length / 9),
        current_page: 1,
        has_pre: false,
        has_next: true,
      };
    },
    products() {
      this.productsData();
    },
    offsetWidth() {
      this.width.list = this.offsetWidth < 992;
      this.width.offset = -45;
      if (this.offsetWidth < 992 && this.offsetWidth >= 768) {
        this.width.slidesView = 2;
      } else if (this.offsetWidth < 768) {
        this.width.slidesView = 1;
        this.width.offset = -30;
      } else {
        this.width.slidesView = 4;
      }
    },
  },
  mounted() {
    this.getAllProducts();
    this.offsetWidth = window.innerWidth;
    this.width.list = this.offsetWidth < 992;
    window.onresize = () => {
      this.offsetWidth = document.body.offsetWidth;
    };
  },
};
</script>

<style scoped  lang="scss">
.title-top {
  top: 56px;
}

.position-sticky {
  z-index: 10;
}

.swiper-slide img {
  width: 150px;
  height: 150px;
}
</style>
