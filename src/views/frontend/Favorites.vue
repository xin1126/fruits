<template>
  <div
    class="content d-flex flex-column justify-content-between position-relative"
  >
    <div>
      <div class="favorites-banner d-flex-center text-white fs-2 mb-md-4 mb-3">
        <p
          class="
            bg-translucent
            fw-bolder
            rounded-3 rounded
            px-lg-5
            py-lg-3
            px-4
            py-2
          "
        >
          商品收藏列表
        </p>
      </div>
      <div class="container mb-4" v-if="collectionData.length && view">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-md-4 mb-3">
            <li class="breadcrumb-item text-gray">首頁</li>
            <li class="breadcrumb-item text-secondary">商品收藏列表</li>
          </ol>
        </nav>
        <ul
          class="
            row row-cols-1 row-cols-lg-4 row-cols-md-2
            justify-content-center
            g-6
            p-0
            mt-0
          "
        >
          <template v-for="item in collectionData" :key="item.id">
            <li
              class="
                col
                animate__animated animate__fadeIn
                d-flex-center
                mt-0
                mb-4
              "
              v-if="id[item.id]"
            >
              <div
                class="
                  card
                  bg-transparent
                  w-100 w-sm-65 w-md-100
                  h-100
                  border-0
                "
              >
                <ProductImg
                  :item="item"
                  @favorites="removeFavorites"
                  ref="productImg"
                />
                <AddToCart class="mx-auto" :item="item" />
              </div>
            </li>
          </template>
        </ul>
      </div>
      <div class="shopping text-center" v-else>
        <h2 class="fw-bold">目前商品收藏列表為空</h2>
        <h3>逛逛新鮮水果</h3>
        <button
          class="btn btn-primary btn-sm btn-hover"
          @click="$router.push('/products')"
        >
          商品列表
        </button>
      </div>
    </div>
    <Subscription />
  </div>
</template>

<script>
import ProductImg from '@/components/frontend/ProductImg.vue';
import AddToCart from '@/components/frontend/AddToCart.vue';
import Subscription from '@/components/frontend/Subscription.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      collectionData: this.$store.getters.collectionData,
      id: {},
      view: true,
    };
  },
  components: {
    ProductImg,
    AddToCart,
    Subscription,
  },
  methods: {
    ...mapActions(['getAllProducts', 'getCart']),
    removeFavorites(id) {
      this.id[id] = false;
      this.view = Object.values(this.id).some((item) => item === true);
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
        } else if (this.collectionData.length) {
          this.$store.dispatch('updateLoading', true);
        }
      },
      deep: true,
    },
    allProducts() {
      this.collectionData.forEach((item) => {
        this.id[item.id] = true;
      });
    },
    cart() {
      this.$store.dispatch('updateCollectionData');
    },
  },
  mounted() {
    if (this.collectionData.length) {
      this.getCart();
      this.getAllProducts();
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.btn-hover:hover {
  background-color: $secondary !important;
  border: $secondary solid 1px !important;
}

.shopping {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  @include media-breakpoint-up(xl) {
    position: static;
    transform: initial;
    padding: 20px;
  }
}
</style>
