<template>
  <footer
    class="
      d-flex
      flex-column flex-sm-row
      justify-content-sm-center
      align-items-center
      text-white
      bg-primary
      py-3
    "
  >
    <p class="mb-1">
      ⓒ 2021 All Right Reserved . <span class="d-none d-sm-inline">｜</span>
    </p>
    <div class="d-flex-center">
      <p class="m-0">僅個人作品練習，無商業用途</p>
      <button
        class="btn btn-outline-light btn-sm ms-3 d-none d-sm-block"
        @click="check"
      >
        <i class="bi bi-person-fill me-1"></i>登入後台
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    check() {
      const url = `${process.env.VUE_APP_APIURL}/api/user/check`;
      this.$store.dispatch('updateLoading', true);
      this.axios.post(url)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/backstage/products');
          } else {
            this.$router.push('/login');
          }
          this.$store.dispatch('updateLoading', false);
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
button:hover {
  border: $secondary 1px solid !important;
  background-color: $primary !important;
  color: $secondary;
}
</style>
