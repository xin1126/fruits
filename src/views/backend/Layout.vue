<template>
  <div>
    <Naner />
    <router-view></router-view>
  </div>
</template>

<script>
import Naner from '@/components/backend/Navbar.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    Naner,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (!token) {
      this.$swal({ title: '尚未登入', icon: 'error' });
      this.$router.push('/login');
    } else {
      this.axios.defaults.headers.common.Authorization = token;
    }
  },
};
</script>
