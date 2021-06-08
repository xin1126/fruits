<template>
  <div
    class="input-group mx-auto text-center"
    :class="[path ? 'w-50' : ['w-75', 'mb-3']]"
  >
    <button
      type="button"
      class="input-group-text"
      :disabled="products.joined || products.num === 1"
      @click="products.num--"
    >
      <i class="bi bi-dash-lg"></i>
    </button>
    <p class="form-control m-0">{{ products.num }}</p>
    <button
      type="button"
      class="input-group-text"
      :disabled="products.joined"
      @click="products.num++"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
  </div>
  <button
    type="button"
    class="btn rounded-0 d-block mx-auto fw-bold"
    :class="[!products.joined ? 'btn-outline-primary' : ['btn-outline-gray']]"
    :disabled="products.joined"
    @click="addToCart(products.id, products.num)"
  >
    <i class="bi bi-cart-plus-fill me-1" v-show="!products.joined"></i
    >{{ !item.joined ? '加入購物車' : '已加入購物車' }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      products: this.item,
      path: false,
    };
  },
  props: {
    item: {
      typeof: Object,
      require: true,
    },
  },
  emits: {
    'get-data': () => true,
    'is-loading': (bool) => typeof bool === 'boolean',
  },
  methods: {
    addToCart(id, qty) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.$emit('is-loading', true);
      const cart = {
        product_id: id,
        qty,
      };
      this.axios.post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.$swal({ title: `${res.data.data.product.title}加入購物車`, icon: 'success' });
            this.$emit('is-loading', false);
            this.$emit('get-data');
          } else {
            this.$swal({ title: res.data.message, icon: 'error' });
            this.$emit('is-loading', false);
          }
        })
        .catch((error) => {
          this.$swal({ title: error.data.message, icon: 'error' });
          this.$emit('is-loading', false);
        });
    },
  },
  watch: {
    item() {
      this.products = this.item;
    },
  },
  created() {
    this.path = this.$route.path.length > 20;
  },
};
</script>

<style scoped lang="scss">
.btn-outline-primary:hover {
  color: white !important;
}
</style>
