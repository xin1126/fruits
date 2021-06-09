<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <transition>
      <a class="top fs-1 text-secondary" href="#" v-show="top"
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
  },
};
</script>

<style lang="scss">
.top {
  position: fixed;
  bottom: 10%;
  right: 3%;
  z-index: 1;
  &:hover {
    color: #ce6e14e1 !important;
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
