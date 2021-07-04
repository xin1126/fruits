<template>
  <div class="content pb-5">
    <div class="detailed-banner d-flex-center text-white fs-2 mb-md-4 mb-3">
      <p class="bg-translucent fw-bolder rounded-3 rounded px-5 py-3">
        商品介紹
      </p>
    </div>
    <div class="container animate__animated animate__fadeIn" v-if="view">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-md-4 mb-3">
          <li class="breadcrumb-item text-gray">首頁</li>
          <li class="breadcrumb-item text-gray">商品列表</li>
          <li class="breadcrumb-item text-gray">
            {{ product.category }}
          </li>
          <li class="breadcrumb-item text-secondary" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row gx-6 mb-lg-5 mb-4 align-items-center">
        <div class="col-xl-7 col-lg-6 mb-4 mb-lg-0">
          <div class="row g-0 flex-xl-row flex-column-reverse">
            <div
              class="
                images-url
                col-xl-2 col-3
                d-flex
                flex-xl-column
                justify-content-between
              "
            >
              <img
                @click="img = product.imgUrl"
                :src="product.imgUrl"
                :alt="product.title"
                class="img-fluid small-img cursor-pointer border"
              />
              <img
                v-for="item in product.imagesUrl"
                :key="item"
                @click="img = item"
                :alt="item.title"
                :src="item"
                class="img-fluid small-img cursor-pointer border"
              />
            </div>
            <div class="col-xl-10 bg-light d-flex-center">
              <img
                :src="img"
                :alt="product.title"
                class="img-fluid img-transparent w-100 main-img"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-lg-6">
          <div class="bg-light py-3 px-4">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <h4 class="fw-bold mb-0 d-flex-center me-2">
                  {{ product.title }}
                </h4>
                <i
                  class="bi text-warning fs-5"
                  :class="[
                    product.options?.rating >= num ? 'bi-star-fill' : 'bi-star',
                  ]"
                  v-for="num in 5"
                  :key="num"
                ></i>
              </div>
              <a href="#" @click.prevent="updateBookmark"
                ><i
                  class="icon bi fs-3"
                  :class="[
                    bookmark
                      ? ['text-primary', 'bi-bookmark-heart-fill']
                      : ['text-gray', 'bi-bookmark-heart'],
                  ]"
                ></i>
              </a>
            </div>
            <hr />
            <ul class="p-0 mb-2">
              <li class="d-flex mb-1">
                <i class="bi bi-hand-thumbs-up me-1"></i>
                <p>果肉細緻、多汁美味超人氣</p>
              </li>
              <li class="d-flex mb-1">
                <i class="bi bi-hand-thumbs-up me-1"></i>
                <p>濃濃{{ product.title }}香氣，香氣濃郁、果香清爽、滋味香甜</p>
              </li>
              <li class="mb-1 d-xl-flex d-lg-none d-flex">
                <i class="bi bi-hand-thumbs-up me-1"></i>
                <p>營養元素豐富價值高，老少皆宜，大人小孩全都愛</p>
              </li>
              <li class="mb-1">
                <i class="bi bi-hand-thumbs-up me-1"></i>精心栽培，自然熟成
              </li>
              <li class="mb-1">
                <i class="bi bi-geo-alt me-1"></i>產地：{{
                  product.options?.origin
                }}
              </li>
              <li class="d-flex mb-1">
                <i class="bi bi-speedometer2 me-1"></i>重量：{{
                  product.options?.weight
                }}({{ product.unit }})
              </li>
              <li class="d-flex mb-1">
                <i class="bi bi-cash-coin me-1"></i>
                <p>消費滿 NT $2,000，享有免運費優惠</p>
              </li>
              <li class="mb-1">
                <i class="bi bi-truck me-1"></i>宅配-廠商出貨
              </li>
              <li class="d-flex">
                <i class="bi bi-credit-card-2-back me-1"></i>
                <p>信用卡(一次付清)、貨到付款、ATM 轉帳</p>
              </li>
            </ul>
            <div class="d-sm-flex justify-content-between align-items-center">
              <div>
                <p
                  class="fw-bold mb-0 me-2"
                  :class="[
                    product.origin_price !== product.price
                      ? 'text-danger'
                      : 'text-dark',
                  ]"
                >
                  {{
                    product.origin_price !== product.price
                      ? '促銷價:NT$'
                      : '售價:NT$'
                  }}{{ product.price }}
                </p>
                <small
                  class="
                    card-text
                    text-decoration-line-through text-gray
                    mt-1
                    me-2
                  "
                  v-if="product.origin_price !== product.price"
                >
                  原價:NT${{ product.origin_price }}
                </small>
              </div>
              <AddToCart :item="productFilter" ref="product" />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row mb-4">
            <div class="col-sm-3">
              <h5 class="text-primary fw-bold">營養與功效</h5>
            </div>
            <div class="col-sm-9">
              <p class="mb-2">{{ product.description }}</p>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-sm-3">
              <h5 class="text-primary fw-bold">保存方式</h5>
            </div>
            <div class="col-sm-9">
              <p class="mb-2">{{ product.content }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <h5 class="text-primary fw-bold">購物須知</h5>
            </div>
            <ul class="col-sm-9">
              <li class="d-flex mb-1">
                ※
                <p class="ms-1">
                  農產品重量差異，圖片僅供參考，商品依實際供貨為準。
                </p>
              </li>
              <li class="d-flex mb-1">
                ※
                <p class="ms-1">
                  製造日期與有效期限，商品成分與適用注意事項皆標示於包裝或產品中。
                </p>
              </li>
              <li class="d-flex mb-1">
                ※
                <p class="ms-1">
                  本產品網頁因拍攝關係，圖檔略有差異，實際以廠商出貨為主
                </p>
              </li>
              <li class="d-flex">
                ※
                <p class="ms-1">本產品文案若有變動敬請參照實際商品為準。</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="border border-primary border-3" />
      <h2 class="fw-bold mt-4 text-center text-dark pb-3">相關商品</h2>
      <Swiper
        :slides-per-view="offsetWidthData.slidesView"
        :space-between="30"
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
</template>
<script>
import ProductImg from '@/components/frontend/ProductImg.vue';
import AddToCart from '@/components/frontend/AddToCart.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      id: '',
      img: '',
      bookmark: '',
      productFilter: {},
      product: {},
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      view: false,
    };
  },
  components: {
    ProductImg,
    AddToCart,
  },
  methods: {
    ...mapActions(['getAllProducts', 'initOffsetWidth', 'updateOffsetWidth']),
    getProduct() {
      const api = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/product/${this.id}`;
      const arr = this.$store.getters.collectionData.map((item) => item.id);
      this.$store.dispatch('updateLoading', true);
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
            this.bookmark = arr.indexOf(this.product.id) >= 0;
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$swal({ title: '請求API失敗', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
    updateBookmark() {
      this.bookmark = !this.bookmark;
      this.$store.dispatch('updateBookmark', [this.product.id, false]);
    },
    singleProduct() {
      const newArr = this.allProducts.filter((item) => item.title === this.product.title);
      [this.productFilter] = newArr;
    },
  },
  computed: {
    ...mapGetters(['allProducts', 'cart', 'offsetWidth', 'offsetWidthData']),
    relatedProducts() {
      const newArr = this.allProducts.filter((item) => {
        const arr = item.category === this.product.category && item.id !== this.product.id;
        return arr;
      });
      return newArr;
    },
    data() {
      const { allProducts, cart, product } = this;
      return {
        allProducts,
        cart,
        product,
      };
    },
  },
  watch: {
    data: {
      handler(val) {
        const data = val.allProducts.length && Object.values(val.cart).length;
        if (data && Object.values(val.product).length) {
          this.view = true;
          this.$store.dispatch('data');
          this.singleProduct();
          this.$store.dispatch('initBookmark', this.product.id);
        } else {
          this.$store.dispatch('updateLoading', true);
        }
      },
      deep: true,
    },
    product() {
      this.img = this.product.imgUrl;
      if (this.allProducts.length) {
        this.singleProduct();
      }
    },
    $route() {
      this.id = this.$route.params.id;
      this.getProduct();
      this.$watch(() => this.product, () => { this.$refs.product.products = this.productFilter; });
    },
    offsetWidth() {
      this.updateOffsetWidth();
    },
  },
  created() {
    this.initOffsetWidth();
    window.onresize = () => {
      this.updateOffsetWidth();
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getAllProducts();
    this.getProduct();
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.images-url {
  img:last-child {
    display: none;
    @include media-breakpoint-up(xl) {
      display: block;
    }
  }
}
.main-img {
  @include media-breakpoint-up(lg) {
    height: 305px;
  }
  @include media-breakpoint-up(xl) {
    height: 420px;
  }
}

.small-img {
  @include media-breakpoint-up(xl) {
    height: 84px;
  }
}

.icon:hover {
  font-size: 28px !important;
}
</style>
