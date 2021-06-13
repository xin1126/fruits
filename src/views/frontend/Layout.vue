<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <transition>
      <a
        class="top fs-1 text-primary"
        href="javascript:void(0);"
        v-show="top"
        v-scroll-to="{ el: 'body' }"
        ><i class="bi bi-arrow-up-square-fill"></i
      ></a>
    </transition>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';
import 'bootstrap';

export default {
  data() {
    return {
      top: false,
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    handleScroll() {
      this.top = document.documentElement.scrollTop > 200;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
