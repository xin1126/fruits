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
      const status = this.$route.path === '/backstage' ? 'add' : 'remove';
      document.body.classList[status]('bg'); // 防止所有元件吃到body樣式(元件使用scoped，body吃不到樣式)
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
