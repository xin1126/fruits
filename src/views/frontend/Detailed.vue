<template>
  <div class="content pb-5">
    <div class="detailed-banner d-flex-center text-white fs-2 mb-lg-4 mb-2">
      <p class="bg-translucent fw-bolder px-5 py-3">商品介紹</p>
    </div>
    <div class="container">
      <nav aria-label="breadcrumb mb-3">
        <ol class="breadcrumb">
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
                @click="img = singleProduct.imgUrl"
                :src="singleProduct.imgUrl"
                :alt="singleProduct.title"
                class="img-fluid small-img cursor-pointer border"
              />
              <img
                v-for="item in singleProduct.imagesUrl"
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
                :alt="singleProduct.title"
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
                  {{ singleProduct.title }}
                </h4>
                <i
                  class="bi text-warning fs-5"
                  :class="[
                    singleProduct.options?.rating >= num
                      ? 'bi-star-fill'
                      : 'bi-star',
                  ]"
                  v-for="num in 5"
                  :key="num"
                ></i>
              </div>
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
              <li class="d-flex mb-1">
                <i class="bi bi-hand-thumbs-up me-1"></i>
                <p class="mb-0">果肉細緻、多汁美味超人氣</p>
              </li>
              <li class="d-flex mb-1">
                <i class="bi bi-hand-thumbs-up me-1"></i>
                <p class="mb-0">
                  濃濃{{
                    singleProduct.title
                  }}香氣，香氣濃郁、果香清爽、滋味香甜
                </p>
              </li>
              <li class="mb-1 d-xl-flex d-lg-none d-flex">
                <i class="bi bi-hand-thumbs-up me-1"></i>
                <p class="mb-0">營養元素豐富價值高，老少皆宜，大人小孩全都愛</p>
              </li>
              <li class="mb-1">
                <i class="bi bi-hand-thumbs-up me-1"></i>精心栽培，自然熟成
              </li>
              <li class="mb-1">
                <i class="bi bi-geo-alt me-1"></i>產地：{{
                  singleProduct.options?.origin
                }}
              </li>
              <li class="d-flex mb-1">
                <i class="bi bi-speedometer2 me-1"></i>重量：{{
                  singleProduct.options?.weight
                }}({{ singleProduct.unit }})
              </li>
              <li class="d-flex mb-1">
                <i class="bi bi-cash-coin me-1"></i>
                <p class="mb-0">消費滿 NT $2,000，享有免運費優惠</p>
              </li>
              <li class="mb-1">
                <i class="bi bi-truck me-1"></i>宅配-廠商出貨
              </li>
              <li class="d-flex">
                <i class="bi bi-credit-card-2-back me-1"></i>
                <p class="mb-0">信用卡(一次付清)、貨到付款、ATM 轉帳</p>
              </li>
            </ul>
            <div class="d-sm-flex justify-content-between align-items-center">
              <div>
                <p
                  class="fw-bold mb-0 me-2"
                  :class="[
                    singleProduct.origin_price !== singleProduct.price
                      ? 'text-danger'
                      : 'text-dark',
                  ]"
                >
                  {{
                    singleProduct.origin_price !== singleProduct.price
                      ? '促銷價:NT$'
                      : '售價:NT$'
                  }}{{ singleProduct.price }}
                </p>
                <small
                  class="
                    card-text
                    text-decoration-line-through text-gray
                    mt-1
                    me-2
                  "
                  v-if="singleProduct.origin_price !== singleProduct.price"
                >
                  原價:NT${{ singleProduct.origin_price }}
                </small>
              </div>
              <AddToCart
                :item="singleProduct"
                @get-data="getCart"
                @is-loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row mb-4">
            <div class="col-sm-4">
              <h6 class="text-primary fw-bold">營養與功效</h6>
            </div>
            <div class="col-sm-8">
              <p class="mb-2">{{ singleProduct.description }}</p>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-sm-4">
              <h6 class="text-primary fw-bold">保存方式</h6>
            </div>
            <div class="col-sm-8">
              <p class="mb-2">{{ singleProduct.content }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <h6 class="text-primary fw-bold">購物須知</h6>
            </div>
            <ul class="col-sm-8">
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
              <li class="d-flex mb-1"></li>
              <li class="d-flex">
                ※
                <p class="ms-1">本產品文案若有變動敬請參照實際商品為準。</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="border border-primary border-3" />
      <h2 class="fw-bold mt-4 text-center text-secondary pb-3">相關商品</h2>
      <Swiper
        :slides-per-view="width"
        :space-between="30"
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
      id: '',
      img: '',
      offsetWidth: '',
      singleBookmark: '',
      width: 4,
      product: {},
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      allProducts: [],
      collectionData: JSON.parse(localStorage.getItem('listData')) || [],
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
    showMultiple(num) {
      this.index = num;
      this.visible = true;
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
      this.img = this.singleProduct.imgUrl;
    },
    $route() {
      this.id = this.$route.params.id;
      this.getProduct();
    },
    offsetWidth() {
      if (this.offsetWidth < 992 && this.offsetWidth >= 768) {
        this.width = 2;
      } else if (this.offsetWidth < 768) {
        this.width = 1;
      } else {
        this.width = 4;
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.tempCart();
    this.getAllProducts();
    this.getProduct();
    this.offsetWidth = window.innerWidth;
    window.onresize = () => {
      this.offsetWidth = document.body.offsetWidth;
    };
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

.content-img {
  height: 390px;
}

.icon:hover {
  font-size: 28px !important;
}
</style>
