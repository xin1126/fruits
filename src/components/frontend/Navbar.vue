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
                  <router-link
                    class="nav-link fw-bold"
                    :class="[
                      $route.fullPath === '/favorites'
                        ? 'text-secondary'
                        : 'text-white',
                    ]"
                    to="/favorites"
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
                  ></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <router-link
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
        to="/carts"
        ><span
          v-show="$store.getters.cart.carts?.length"
          class="badge rounded-circle bg-secondary position-absolute"
          >{{ $store.getters.cart.carts?.length }}</span
        >
        <i class="bi bi-cart-fill fs-4 fw-lighter"></i>
      </router-link>
    </div>
  </section>
</template>

<script>
// import { Popover } from 'bootstrap';

export default {
  data() {
    return {
      popover: '',
    };
  },
  mounted() {
    // this.popover = new Popover(this.$refs.popover);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
a:hover {
  color: $secondary !important;
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
