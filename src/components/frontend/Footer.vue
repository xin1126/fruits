<template>
  <footer
    v-if="footerView"
    class="
      d-flex
      flex-column flex-sm-row
      justify-content-center
      align-items-center
      text-dark
    "
  >
    <p class="mb-1">
      ⓒ 2021 All Right Reserved . <span class="d-none d-sm-inline">｜</span>
    </p>
    <div class="d-flex-center">
      <p>僅個人作品練習，無商業用途</p>
      <button
        type="button"
        class="btn btn-outline-dark btn-sm ms-3 d-none d-sm-block"
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
    return {
      footerView: '',
    };
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
        .catch(() => {
          this.$swal({ title: '發生錯誤，請嘗試重新整理此頁面', icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
  computed: {
    view() {
      return this.$store.getters.view;
    },
  },
  watch: {
    $route() {
      this.footerView = this.$route.path.length !== 1;
    },
    view() {
      this.footerView = this.view;
    },
  },
  mounted() {
    this.footerView = this.$route.path.length !== 1;
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

footer {
  background-image: url('~@/assets/images/footer.jpg');
  height: 80px;
  @include media-breakpoint-up(sm) {
    height: 70px;
  }
}
</style>
