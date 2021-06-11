<template>
  <section class="content">
    <div class="banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">商品列表</p>
    </div>
    <div class="container mb-5">
      <nav aria-label="breadcrumb" id="topProduct">
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-gray">商品列表</li>
          <li class="breadcrumb-item text-secondary">全部商品</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-3">
          <ul class="list-group position-sticky fs-5">
            <li
              class="list-group-item d-flex p-0"
              :class="[categoryValue === 'total' ? 'bg-primary' : 'bg-white']"
            >
              <a
                href="#"
                @click.prevent="productsData('total', 'click')"
                class="d-flex w-100 py-2 ps-3"
                :class="[
                  categoryValue === 'total' ? 'text-white' : 'text-gray',
                ]"
                v-scroll-to="{
                  el: '#topProduct',
                  offset: -50,
                }"
                ><img
                  src="@/assets/images/icon/全部商品.png"
                  class="icon"
                  alt="全部商品"
                />全部商品<span
                  :class="[
                    categoryValue === 'total' ? 'text-white' : 'text-gray',
                  ]"
                  >({{ allProducts.length }})</span
                ></a
              >
            </li>
            <li
              class="list-group-item d-flex p-0"
              :class="[categoryValue === item ? 'bg-primary' : 'bg-white']"
              v-for="(index, item) of totalNum"
              :key="item"
              :data-title="item"
            >
              <a
                href="#"
                @click.prevent="productsData(item, 'click')"
                class="d-flex w-100 py-2 ps-3"
                :class="[categoryValue === item ? 'text-white' : 'text-gray']"
                v-scroll-to="{
                  el: '#topProduct',
                  offset: -50,
                }"
                ><img
                  :src="require(`@/assets/images/icon/${item}.png`)"
                  class="icon"
                  :alt="item"
                />{{ item
                }}<span
                  :class="[categoryValue === item ? 'text-white' : 'text-gray']"
                  >({{ index }})</span
                ></a
              >
            </li>
          </ul>
        </div>
        <div class="col-9">
          <div class="d-flex justify-content-between align-items-end mb-3">
            <select
              class="form-select border-primary w-25"
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
            <div class="d-flex justify-content-end align-items-center w-50">
              <label for="exampleFormControlInput1" class="form-label mb-0 me-2"
                ><i class="bi bi-search"></i
              ></label>
              <input
                type="email"
                class="form-control border-primary w-50"
                id="exampleFormControlInput1"
                placeholder="請輸入產品"
                v-model="search"
                @input="productsData(search, 'input')"
              />
            </div>
          </div>
          <ul class="row row-cols-1 row-cols-md-3 g-5 p-0">
            <li
              class="col"
              v-for="item in productsFilter"
              :key="item.id"
              :class="{ animate__animated: animate, animate__fadeIn: animate }"
            >
              <div class="card h-100 border-0">
                <ProductImg :item="item" @bookmark-data="bookmark" />
                <AddToCart
                  :item="item"
                  @get-data="getCart"
                  @is-loading="loading"
                />
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
        :slides-per-view="4"
        :space-between="50"
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
import AddToCart from '@/components/frontend/AddToCart.vue';
import Pagination from '@/components/Pagination.vue';
import { getAllProducts, getCart } from '@/components/frontend/getData';

export default {
  data() {
    return {
      optionValue: '',
      search: '',
      categoryValue: 'total',
      allProducts: [],
      category: [],
      products: [],
      productsFilter: [],
      collectionData: JSON.parse(localStorage.getItem('listData')) || [],
      cart: {},
      pagination: {},
      totalNum: {},
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
    pageData(num) {
      const min = (num * 9) - 9 + 1;
      const max = (num * 9);
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
          this.animate = true;
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
  },
  watch: {
    allProducts() {
      this.allProducts.forEach((item) => {
        this.totalNum[item.category] = (this.totalNum[item.category] || 0) + 1;
      });
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
  },
  mounted() {
    this.tempCart();
    this.getAllProducts();
    this.pageData();
  },
};
</script>

<style scoped lang="scss">
.list-group-item:hover {
  background-color: #8dbf41 !important;
  a {
    color: white !important;
  }
  span {
    color: white !important;
  }
}

.icon {
  margin: 3px 6px 0 0;
  width: 25px;
  height: 25px;
}

.position-sticky {
  top: 10%;
}

.swiper-slide img {
  width: 150px;
  height: 150px;
}

.banner {
  background-image: url('~@/assets/images/banner1.jpg');
  opacity: 0.8;
  background-position: center;
  background-size: cover;
  padding-top: 70px;
  height: 300px;
}
</style>
