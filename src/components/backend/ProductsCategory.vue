<template>
  <select
    class="form-select w-25 ms-3 bg-transparent"
    aria-label="Default select example"
    v-model="categoryValue"
    @change="categoryEmit(categoryValue)"
  >
    <option selected disabled value="">搜尋產品類別</option>
    <option value="total">全部商品</option>
    <option v-for="item in category" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      categoryValue: '',
      allProducts: [],
      category: [],
    };
  },
  emits: {
    value: (categoryValue) => typeof categoryValue === 'string',
  },
  methods: {
    categoryEmit(categoryValue) {
      this.$emit('value', categoryValue);
    },
    getAllProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/admin/products/all`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProducts = Object.values(res.data.products);
            this.category = new Set(Object.values(res.data.products).map((item) => item.category));
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.$swal({ title: res.data.message, icon: 'error' });
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.$swal({ title: error.data.message, icon: 'error' });
        });
    },
  },
};
</script>
