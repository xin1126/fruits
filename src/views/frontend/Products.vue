<template>
  <section class="content">
    <div class="products-banner text-dark fs-2 mb-lg-4 mb-2">
      <div class="bg-linear-right w-100 h-100">
        <p
          class="
            container
            fw-bolder
            d-flex
            flex-column
            justify-content-center
            align-items-end
            rounded-3 rounded
            h-100
          "
        >
          品種多味美<span class="me-5">生活要領鮮</span>
        </p>
      </div>
    </div>
    <div class="container mb-5">
      <nav
        aria-label="breadcrumb"
        id="topProduct"
        class="bg-transparent mb-lg-3"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-gray">商品列表</li>
          <li class="breadcrumb-item text-secondary">全部商品</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-3 position-sticky title-top">
          <ProductList
            :categoryValue="categoryValue"
            @emitData="productsData"
          />
        </div>
        <div class="col-lg-9 mb-4">
          <div class="row justify-content-between">
            <div class="col-lg-4 d-lg-block d-none">
              <select
                class="form-select bg-white"
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
                ></label>
                <div class="position-relative">
                  <input
                    type="email"
                    class="form-control bg-white"
                    :class="{ search: !search }"
                    id="exampleFormControlInput1"
                    placeholder="請輸入產品"
                    v-model="search"
                    @input="productsData(search, 'input')"
                  />
                  <i
                    class="bi bi-search position-absolute"
                    v-show="!search"
                  ></i>
                </div>
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
              <div
                class="
                  card
                  w-100 w-sm-65 w-md-100
                  h-100
                  border-0
                  bg-transparent
                "
              >
                <ProductImg :item="item" />
                <AddToCart class="mx-auto" :item="item" />
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
    </div>
  </section>
</template>

<script>
import ProductImg from '@/components/frontend/ProductImg.vue';
import ProductList from '@/components/frontend/ProductList.vue';
import AddToCart from '@/components/frontend/AddToCart.vue';
import Pagination from '@/components/Pagination.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      optionValue: '',
      search: '',
      categoryValue: 'total',
      productsSort: [],
      productsFilter: [],
      productsSpecialOffer: [],
      pagination: {},
    };
  },
  components: {
    ProductList,
    ProductImg,
    AddToCart,
    Pagination,
  },
  methods: {
    getAllProducts() {
      this.$store.dispatch('getAllProducts');
    },
    pageData(num) {
      const min = (num * 9) - 9 + 1;
      const max = (num * 9);
      this.pagination.has_pre = num !== 1;
      this.pagination.has_next = num !== this.pagination.total_pages;
      this.pagination.current_page = num;
      this.productsPage(min, max);
    },
    productsData(value = 'total', status = 'click') {
      this.pageData(1);
      this.optionValue = '';
      switch (status) {
        case 'input':
          if ((this.allProducts.filter((item) => item.title.match(value))).length > 0 && value) {
            this.categoryValue = '';
            this.productsFilter = this.allProducts.filter((item) => item.title.match(value));
          } else if (!value) {
            this.categoryValue = 'total';
            this.productsPage();
          }
          break;
        case 'select':
          this.search = '';
          this.optionValue = value;
          if (value * 1) {
            this.categoryValue = '';
            this.productsFilter = this.allProducts.filter((item) => item.options.rating === value);
          } else if (value === 'highPrice') {
            this.productsSort = [...this.allProducts].sort((a, b) => b.price - a.price);
          } else {
            this.productsSort = [...this.allProducts].sort((a, b) => a.price - b.price);
          }
          if (!(value * 1)) {
            this.categoryValue = 'total';
            this.productsPage();
          }
          break;
        case 'click':
          this.productsPage();
          this.search = '';
          this.categoryValue = value;
          this.productsFilter = this.categoryValue === 'total' ? this.productsFilter : this.allProducts.filter((item) => item.category === this.categoryValue);
          break;
        default:
          break;
      }
    },
    productsPage(min = 1, max = 9) {
      const arr = this.optionValue && !(this.optionValue * 1) ? 'productsSort' : 'allProducts';
      this.productsFilter = this[arr].filter((i, key) => key + 1 >= min && key + 1 <= max);
    },
    specialOffer() {
      this.productsSpecialOffer = this.allProducts.filter((i) => i.origin_price !== i.price);
    },
  },
  computed: {
    ...mapGetters(['allProducts', 'cart']),
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
          this.$store.dispatch('data');
        } else {
          this.$store.dispatch('updateLoading', true);
        }
      },
      deep: true,
    },
    allProducts() {
      this.productsPage();
      this.pagination = {
        total_pages: Math.ceil(this.allProducts.length / 9),
        current_page: 1,
        has_pre: false,
        has_next: true,
      };
      this.specialOffer();
    },
  },
  mounted() {
    this.getAllProducts();
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

.search {
  text-indent: 20px;
}

.bi-search {
  top: 19%;
  left: 5%;
}
</style>
