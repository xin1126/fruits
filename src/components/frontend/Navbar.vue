<template>
  <section
    class="transition position-fixed z-index w-100"
    :class="{ 'bg-navbar': top, shadow: top }"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <router-link
        class="navbar-brand text-primary logo order-2 order-lg-0 mt-lg-0 mt-2"
        to="/"
        ><h1 class="h1 pt-1 transition" :class="[top ? 'h2' : 'h1']">
          Fresh Fruits
        </h1></router-link
      >
      <nav class="navbar-expand-lg navbar-light mt-0 order-1 order-lg-0">
        <button
          class="navbar-toggler border-0 px-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse navbar-content"
          id="navbarNav"
          ref="collapse"
        >
          <a
            href="#"
            class="container mt-3 text-gray d-lg-none fs-3"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <i class="bi bi-x-lg"></i>
          </a>
          <ul class="navbar-nav align-items-center pb-3 pb-lg-0">
            <li class="nav-item pe-lg-4 d-lg-none pb-3 pb-lg-0">
              <router-link
                class="
                  nav-link
                  fw-bold
                  fs-5
                  border-bottom border-lg-0
                  px-3 px-lg-0
                "
                :class="[
                  $route.fullPath === '/' ? 'text-secondary' : 'text-gray',
                ]"
                to="/"
                >首頁</router-link
              >
            </li>
            <li class="nav-item pe-lg-4 pb-3 pb-lg-0">
              <router-link
                class="
                  nav-link
                  fw-bold
                  fs-5
                  border-bottom border-lg-0
                  px-3 px-lg-0
                "
                :class="[
                  $route.fullPath === '/about' ? 'text-secondary' : 'text-gray',
                ]"
                to="/about"
                >關於我們</router-link
              >
            </li>
            <li class="nav-item pe-lg-4 pb-3 pb-lg-0">
              <router-link
                class="
                  nav-link
                  fw-bold
                  fs-5
                  border-bottom border-lg-0
                  px-3 px-lg-0
                "
                :class="[
                  $route.fullPath === '/activity'
                    ? 'text-secondary'
                    : 'text-gray',
                ]"
                to="/activity"
                >優惠活動</router-link
              >
            </li>
            <li class="nav-item pe-lg-4 pb-3 pb-lg-0">
              <router-link
                class="
                  nav-link
                  fw-bold
                  fs-5
                  border-bottom border-lg-0
                  px-3 px-lg-0
                "
                :class="[
                  $route.fullPath === '/products'
                    ? 'text-secondary'
                    : 'text-gray',
                ]"
                to="/products"
                >商品列表</router-link
              >
            </li>
            <li class="nav-item pb-3 pb-lg-0">
              <router-link
                class="
                  nav-link
                  fw-bold
                  fs-5
                  border-bottom border-lg-0
                  px-3 px-lg-0
                "
                :class="[
                  $route.fullPath === '/faq' ? 'text-secondary' : 'text-gray',
                ]"
                to="/faq"
                >常見問題</router-link
              >
            </li>
            <li class="nav-item position-relative d-lg-none pb-3 pb-lg-0">
              <a
                href="#"
                class="
                  nav-link
                  fw-bold
                  fs-5
                  border-bottom border-lg-0
                  px-3 px-lg-0
                "
                :class="[
                  $route.fullPath === '/favorites'
                    ? 'text-secondary'
                    : 'text-gray',
                ]"
                data-bs-toggle="dropdown"
                @click.prevent="
                  $store.getters.collectionData?.length
                    ? $router.push('/favorites')
                    : ''
                "
                ref="favoritesDropdown"
              >
                我的收藏<span v-show="$store.getters.collectionData?.length"
                  >({{ $store.getters.collectionData?.length }})</span
                >
              </a>
              <div
                class="
                  dropdown-menu dropdown-menu-lg-end
                  position-absolute
                  z-index
                "
                v-show="!$store.getters.collectionData?.length"
              >
                <p class="px-2 mb-1 text-gray text-center">目前收藏無商品</p>
                <div class="text-center" v-if="$route.path !== '/products'">
                  <button
                    class="btn btn-primary btn-sm"
                    type="button"
                    @click="$router.push('/products')"
                  >
                    挑選商品收藏
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="d-flex order-3 order-lg-0">
        <div class="position-relative d-none d-lg-block">
          <a
            href="#"
            class="nav-link fw-bold"
            :class="[
              $route.fullPath === '/favorites' ? 'text-secondary' : 'text-dark',
            ]"
            data-bs-toggle="dropdown"
            @click.prevent="
              $store.getters.collectionData?.length
                ? $router.push('/favorites')
                : ''
            "
            ref="favoritesDropdown"
            ><span
              v-show="$store.getters.collectionData?.length"
              class="
                badge
                favorites-badge
                rounded-circle
                bg-secondary
                position-absolute
              "
              >{{ $store.getters.collectionData?.length }}</span
            ><i class="bi bi-bookmark-fill fs-4 me-2 me-lg-0"></i
          ></a>
          <div
            class="dropdown-menu dropdown-menu-lg-end position-absolute z-index"
            v-show="!$store.getters.collectionData?.length"
          >
            <p class="px-2 mb-1 text-gray text-center">目前收藏無商品</p>
            <div class="text-center" v-if="$route.path !== '/products'">
              <button
                class="btn btn-primary btn-sm"
                type="button"
                @click="$router.push('/products')"
              >
                挑選商品收藏
              </button>
            </div>
          </div>
        </div>
        <div>
          <a
            href="#"
            class="nav-link position-relative fw-bold ps-0 pe-2 mt-lg-0 mt-1"
            :class="[
              $route.fullPath === '/carts' ? 'text-secondary' : 'text-dark',
            ]"
            data-bs-toggle="dropdown"
            @click.prevent="
              $store.getters.cart.carts?.length ? $router.push('/carts') : ''
            "
            ref="cartDropdown"
            ><span
              v-show="$store.getters.cart.carts?.length"
              class="
                badge
                card-badge
                rounded-circle
                bg-secondary
                position-absolute
              "
              >{{ $store.getters.cart.carts?.length }}</span
            >
            <i class="bi bi-cart-fill fs-4 fw-lighter"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-lg-end"
            v-show="!$store.getters.cart.carts?.length"
          >
            <p class="px-2 mb-1 text-gray text-center">目前購物車無商品</p>
            <div class="text-center" v-if="$route.path !== '/products'">
              <button
                class="btn btn-primary btn-sm"
                type="button"
                @click="$router.push('/products')"
              >
                購物去
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Dropdown, Collapse } from 'bootstrap';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      cartDropdown: '',
      collapse: '',
      favoritesDropdown: '',
      top: '',
    };
  },
  methods: {
    handleScroll() {
      this.top = document.documentElement.scrollTop > 0;
    },
  },
  computed: {
    ...mapGetters(['cart', 'collectionData']),
  },
  watch: {
    cart() {
      this.cartDropdown.hide();
    },
    collectionData() {
      this.favoritesDropdown.hide();
    },
    $route() {
      if (Object.keys(this.collapse).length === 0) {
        this.collapse = new Collapse(this.$refs.collapse);
      }
      this.collapse.hide();
      if (this.$route.fullPath === '/') {
        this.favoritesDropdown.hide();
        this.cartDropdown.hide();
      }
    },
  },
  mounted() {
    this.cartDropdown = new Dropdown(this.$refs.cartDropdown);
    this.favoritesDropdown = new Dropdown(this.$refs.favoritesDropdown);
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.bg-navbar {
  background-image: url('~@/assets/images/footer.jpg');
  height: 60px;
}

h1 {
  text-shadow: 2px 3px 5px #cccccc;
}

a:hover {
  color: $secondary !important;
}

button:hover {
  background-color: $secondary !important;
  border: $secondary solid 1px !important;
}

.card-badge {
  top: 3%;
  right: 0%;
  padding: 3px 5px !important;
}

.favorites-badge {
  top: 3%;
  right: 12%;
  padding: 3px 5px !important;
}

.transition {
  transition: 0.5s;
}

.navbar-content {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  display: block;
  width: 100%;
  @include media-breakpoint-up(lg) {
    margin: 0;
    background-color: initial;
    position: initial;
    width: auto;
  }
}
</style>
