<template>
  <div class="group d-flex-center mt-1">
    <div class="input-group text-center">
      <button
        type="button"
        class="input-group-text rounded-0 bg-light text-gray fs-8 border-end-0"
        :class="{ 'btn-hover': !products.joined && num !== 1 }"
        :disabled="products.joined || num === 1"
        @click="$store.dispatch('updateProductNum', [products.id, num--])"
      >
        <i class="bi bi-dash-lg"></i>
      </button>
      <p class="form-control m-0">{{ num }}</p>
      <button
        type="button"
        class="input-group-text rounded-0 bg-light text-gray fs-8"
        :class="{ 'btn-hover': !products.joined }"
        :disabled="products.joined"
        @click="$store.dispatch('updateProductNum', [products.id, num++])"
      >
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
    <a
      href="#"
      class="fs-2 ms-4 mb-1"
      :class="[
        !products.joined ? 'text-gray' : ['text-primary', 'cursor-default'],
      ]"
      :disabled="products.joined"
      @click.prevent="addToCart(products.id, products.num)"
    >
      <i
        class="bi me-1"
        :class="[!products.joined ? 'bi-cart-plus-fill' : 'bi-cart-check-fill']"
      ></i>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: this.item,
      num: 1,
    };
  },
  props: {
    item: {
      typeof: Object,
      require: true,
    },
  },
  methods: {
    addToCart(id, qty) {
      if (this.products.joined) return;
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.$store.dispatch('updateLoading', true);
      const cart = {
        product_id: id,
        qty,
      };
      this.axios.post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.num = 1;
            this.$swal({ title: `${res.data.data.product.title}加入購物車`, icon: 'success' });
            this.$store.dispatch('getCart');
            this.$store.dispatch('updateLoading', false);
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$store.dispatch('updateLoading', false);
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
  watch: {
    item() {
      this.products = this.item;
    },
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
</style>
