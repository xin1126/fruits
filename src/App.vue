<template>
  <Loading :active="isLoading">
    <div class="loadingio-spinner-ellipsis-b21vu21j2qh">
      <div class="ldio-pww1fsb7x">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </Loading>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  watch: {
    $route() {
      const status = this.$route.path.indexOf('backstage') > 0 ? 'add' : 'remove';
      document.body.classList[status]('bg-backstage');
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
body {
  overflow-x: hidden;
}

.bg-backstage {
  margin: 0px;
  padding: 0px;
  background: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%) center center
    fixed no-repeat;
  background-size: cover;
}
</style>
