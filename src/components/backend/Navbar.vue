<template>
  <section class="bg-primary">
    <div class="container position-relative">
      <nav class="d-flex-center">
        <ul class="navbar-nav flex-row py-2">
          <li class="nav-item pe-4">
            <router-link
              class="nav-link fw-bold"
              :class="[
                $route.fullPath === '/home' ? 'text-secondary' : 'text-white',
              ]"
              to="/backstage/products"
              >商品列表</router-link
            >
          </li>
          <li class="nav-item pe-4">
            <router-link
              class="nav-link fw-bold"
              :class="[
                $route.fullPath === '/about' ? 'text-secondary' : 'text-white',
              ]"
              to="/backstage/order"
              >訂單列表</router-link
            >
          </li>
          <li class="nav-item pe-4">
            <router-link
              class="nav-link fw-bold"
              :class="[
                $route.fullPath === '/' ? 'text-secondary' : 'text-white',
              ]"
              to="/backstage/coupon"
              >優惠券列表</router-link
            >
          </li>
        </ul>
      </nav>
      <div class="position-absolute top-0 end-0 mt-2">
        <router-link class="signout btn btn-outline-light me-2" to="/">
          回到前台
        </router-link>
        <button class="signout btn btn-outline-light" @click="signout">
          登出
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    signout() {
      const url = `${process.env.VUE_APP_APIURL}/logout`;
      this.$store.dispatch('updateLoading', true);
      this.axios.post(url)
        .then((res) => {
          if (res.data.success) {
            document.cookie = 'hexToken=; expires=; path=/';
            this.$swal({ title: res.data.message, icon: 'success' });
            this.$router.push('/login');
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$swal({ title: '請求API失敗', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
};
</script>
