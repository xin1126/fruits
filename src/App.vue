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
      document.body.classList[status]('bg');
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
body {
  overflow-x: hidden;
}
</style>
