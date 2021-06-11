<template>
  <div class="content mb-5">
    <div class="banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">商品資訊</p>
    </div>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-gray">商品列表</li>
          <li class="breadcrumb-item text-gray">
            {{ singleProduct.category }}
          </li>
          <li class="breadcrumb-item text-secondary" aria-current="page">
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
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="fw-bold mb-0">{{ singleProduct.title }}</h4>
            <a href="#" @click.prevent="cutoverBookmark(singleProduct.id)"
              ><i
                class="icon bi fs-3"
                :class="[
                  singleBookmark
                    ? ['text-primary', 'bi-bookmark-heart-fill']
                    : ['text-gray', 'bi-bookmark-heart'],
                ]"
              ></i>
            </a>
          </div>
          <hr />
          <ul class="p-0 mb-2">
            <li class="mb-1">
              <i class="bi bi-hand-thumbs-up-fill me-1"></i
              >果肉細緻、多汁美味超人氣
            </li>
            <li class="mb-1">
              <i class="bi bi-hand-thumbs-up-fill me-1"></i>濃濃{{
                singleProduct.title
              }}香氣，香氣濃郁、果香清爽、滋味香甜
            </li>
            <li class="mb-1">
              <i class="bi bi-hand-thumbs-up-fill me-1"></i
              >營養元素豐富價值高，老少皆宜，大人小孩全都愛
            </li>
            <li class="mb-1">
              <i class="bi bi-hand-thumbs-up-fill me-1"></i>精心栽培,自然熟成
            </li>
            <li class="mb-1">
              <i class="bi bi-geo-alt-fill me-1"></i>產地：{{
                singleProduct.options?.origin
              }}
            </li>
            <li>
              <i class="bi bi-speedometer2 me-1"></i>重量：{{
                singleProduct.options?.weight
              }}
            </li>
          </ul>
          <p class="mb-2">{{ singleProduct.description }}</p>
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
      <hr class="border border-primary border-3" />
      <h2 class="fw-bold mt-4 text-center text-secondary mb-3">相關商品</h2>
      <Swiper
        :slides-per-view="4"
        :space-between="50"
        :loop="true"
        :loopFillGroupWithBlank="true"
        :autoplay="autoplay"
      >
        <SwiperSlide v-for="item in relatedProducts" :key="item.id">
          <ProductImg :item="item" @bookmark-data="bookmark" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <Loading :active="isLoading">
    <img src="https://i.imgur.com/lTfnxVN.gif" alt="loading" />
  </Loading>
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
      collectionData: JSON.parse(localStorage.getItem('listData')) || [],
      id: '',
      singleBookmark: '',
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
    cutoverBookmark(id) {
      this.singleBookmark = !this.singleBookmark;
      this.singleProduct.bookmark = this.singleBookmark;
      this.bookmark(this.singleBookmark, id);
    },
    bookmark(bool, id) {
      if (this.product.id === id) {
        this.singleBookmark = bool;
      }
      if (bool) {
        const newArr = this.allProducts.filter((item) => item.id === id);
        this.collectionData.push(newArr[0]);
      } else {
        this.collectionData = this.collectionData.filter((item) => item.id !== id);
      }
      localStorage.setItem('listData', JSON.stringify(this.collectionData));
      this.$bus.emit('collection');
    },
    loading(boolean) {
      this.isLoading = boolean;
    },
  },
  computed: {
    relatedProducts() {
      const newArr = this.allProducts.filter((item) => {
        const arr = item.category === this.product.category && item.id !== this.product.id;
        return arr;
      });
      return newArr;
    },
    singleProduct() {
      const newArr = this.allProducts.filter((item) => item.title === this.product.title);
      const data = newArr[0] ?? {};
      return data;
    },
  },
  watch: {
    singleProduct() {
      this.collectionData.forEach((item) => {
        if (this.product.id === item.id) {
          this.singleBookmark = true;
        }
      });
    },
    $route() {
      this.id = this.$route.params.id;
      this.getProduct();
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.tempCart();
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

.icon:hover {
  font-size: 28px !important;
}

.banner {
  background-image: url('~@/assets/images/banner3.jpg');
  background-position: center;
  background-size: cover;
  height: 300px;
}
</style>
