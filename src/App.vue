<template>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
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
