<template>
  <section class="bg-primary position-fixed z-index w-100">
    <div class="container d-flex justify-content-between align-items-md-center">
      <router-link
        class="navbar-brand text-white logo order-2 order-md-0 mt-md-0 mt-2"
        to="/home"
        ><h1 class="h3">Fresh Fruits</h1></router-link
      >
      <nav
        class="
          navbar navbar-expand-md navbar-light
          order-1 order-md-0
          ms-md-auto
        "
      >
        <div class="container-fluid pe-1">
          <div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav align-items-center">
                <li class="nav-item pe-2">
                  <router-link
                    class="nav-link fw-bold"
                    :class="[
                      $route.fullPath === '/home'
                        ? 'text-secondary'
                        : 'text-white',
                    ]"
                    to="/home"
                    >首頁</router-link
                  >
                </li>
                <li class="nav-item pe-2">
                  <router-link
                    class="nav-link fw-bold"
                    :class="[
                      $route.fullPath === '/about'
                        ? 'text-secondary'
                        : 'text-white',
                    ]"
                    to="/about"
                    >關於我們</router-link
                  >
                </li>
                <li class="nav-item pe-2">
                  <router-link
                    class="nav-link fw-bold"
                    :class="[
                      $route.fullPath === '/' ? 'text-secondary' : 'text-white',
                    ]"
                    to="/"
                    >商品列表</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link fw-bold"
                    :class="[
                      $route.fullPath === '/faq'
                        ? 'text-secondary'
                        : 'text-white',
                    ]"
                    to="/faq"
                    >常見問題</router-link
                  >
                </li>
                <li class="nav-item position-relative">
                  <a
                    href="#"
                    class="nav-link fw-bold"
                    :class="[
                      $route.fullPath === '/favorites'
                        ? 'text-secondary'
                        : 'text-white',
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
                        rounded-circle
                        bg-secondary
                        position-absolute
                      "
                      >{{ $store.getters.collectionData?.length }}</span
                    ><i class="bi bi-bookmark-fill fs-4 me-2 me-md-0"></i
                  ></a>
                  <div
                    class="
                      dropdown-menu dropdown-menu-lg-end
                      position-absolute
                      z-index
                    "
                    v-show="!$store.getters.collectionData?.length"
                  >
                    <p class="px-2 mb-1 text-gray text-center">
                      目前收藏無商品
                    </p>
                    <div class="text-center" v-if="$route.path !== '/'">
                      <button
                        class="btn btn-primary btn-sm"
                        type="button"
                        @click="$router.push('/')"
                      >
                        挑選商品收藏
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <a
        href="#"
        class="
          nav-link
          position-relative
          fw-bold
          order-3 order-md-0
          ps-0
          pe-2
          mt-md-0 mt-1
        "
        :class="[
          $route.fullPath === '/carts' ? 'text-secondary' : 'text-white',
        ]"
        data-bs-toggle="dropdown"
        @click.prevent="
          $store.getters.cart.carts?.length ? $router.push('/carts') : ''
        "
        ref="cartDropdown"
        ><span
          v-show="$store.getters.cart.carts?.length"
          class="badge rounded-circle bg-secondary position-absolute"
          >{{ $store.getters.cart.carts?.length }}</span
        >
        <i class="bi bi-cart-fill fs-4 fw-lighter"></i>
      </a>
      <div
        class="dropdown-menu dropdown-menu-lg-end"
        v-show="!$store.getters.cart.carts?.length"
      >
        <p class="px-2 mb-1 text-gray text-center">目前購物車無商品</p>
        <div class="text-center" v-if="$route.path !== '/'">
          <button
            class="btn btn-primary btn-sm"
            type="button"
            @click="$router.push('/')"
          >
            購物去
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Dropdown } from 'bootstrap';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      cartDropdown: '',
      favoritesDropdown: '',
    };
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
      if (this.$route.fullPath === '/') {
        this.favoritesDropdown.hide();
        this.cartDropdown.hide();
      }
    },
  },
  mounted() {
    this.cartDropdown = new Dropdown(this.$refs.cartDropdown);
    this.favoritesDropdown = new Dropdown(this.$refs.favoritesDropdown);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
a:hover {
  color: $secondary !important;
}

button:hover {
  background-color: $secondary !important;
  border: $secondary solid 1px !important;
}

.logo {
  font-family: 'Sigmar One', cursive;
}

.badge {
  top: 3%;
  right: -6%;
  padding: 3px 5px !important;
}
</style>
