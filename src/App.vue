<template>
  <Loading :active="isLoading">
    <img src="https://i.imgur.com/lTfnxVN.gif" alt="loading" />
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
  mounted() {
    this.$store.dispatch('getCart');
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
body {
  overflow-x: hidden;
}
</style>
