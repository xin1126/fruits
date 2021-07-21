<template>
  <div class="group d-flex justify-content-between align-items-center mt-1">
    <div class="input-group input-group-sm text-center py-2">
      <button
        type="button"
        class="input-group-text bg-light text-gray fs-8 border-end-0"
        :class="[tempNum !== 1 ? ['btn-hover'] : 'cursor-allowed']"
        :disabled="tempNum === 1"
        @click="$store.dispatch('updateCart', [products.id, --tempNum])"
      >
        <i class="bi bi-dash-lg"></i>
      </button>
      <p class="form-control text-center">{{ tempNum }}</p>
      <button
        type="button"
        class="input-group-text bg-light btn-hover text-gray fs-8"
        @click="$store.dispatch('updateCart', [products.id, ++tempNum])"
      >
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
    <a
      v-show="!addCart"
      href="#"
      class="fs-3 mb-1"
      :class="[!products.joined ? 'text-gray' : 'text-primary']"
      @click.prevent="addToCart(products.id, tempNum, products.title)"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      :data-bs-original-title="title[products.title]"
      ref="tooltip"
    >
      <i
        class="bi me-1"
        :class="[!products.joined ? 'bi-cart-plus-fill' : 'bi-cart-check-fill']"
      ></i>
    </a>
    <div v-show="addCart" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import Tooltip from 'bootstrap/js/dist/tooltip';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      products: this.item,
      tempNum: 1,
      tooltip: '',
      addCart: false,
    };
  },
  props: {
    item: {
      typeof: Object,
      require: true,
    },
  },
  methods: {
    ...mapActions(['data', 'updateCollectionData']),
    addToCart(id, qty, title) {
      this.tempNum = 1;
      this.addCart = true;
      this.tooltip.hide();
      setTimeout(() => {
        this.addCart = false;
        this.$store.dispatch('updateCart', { id, qty });
        if (!this.repeat) {
          this.$swal({ title: `${title}加入購物車`, icon: 'success' });
        } else {
          this.$swal({ title: `${title}加購成功`, icon: 'success' });
        }
        if (this.$route.path === '/favorites') {
          this.$store.dispatch('updateCollectionData');
        }
        this.$store.dispatch('data');
      }, 1000);
    },
  },
  computed: {
    ...mapGetters(['title', 'repeat']),
  },
  mounted() {
    this.tooltip = new Tooltip(this.$refs.tooltip);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.group {
  width: 190px;
}

.btn-hover {
  &:hover {
    background-color: $primary !important;
    color: white !important;
  }
}

a:hover {
  color: $primary !important;
}

.input-group-sm {
  width: 120px;
}
</style>
