<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <transition>
      <a
        class="top fs-2"
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
    this.$store.dispatch('getCart', this.$route.path.length !== 1);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.top {
  position: fixed;
  bottom: 5px;
  right: 3%;
  z-index: 1;
  &:hover {
    color: $secondary !important;
  }
}

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
