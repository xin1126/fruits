<template>
  <nav
    aria-label="Page navigation example"
    class="d-flex justify-content-center"
    id="page"
    v-if="category === 'total' && pagination.total_pages > 1"
  >
    <ul class="d-flex fs-4 m-0 p-0">
      <li v-scroll-to="el.left">
        <a
          class="px-2 py-1"
          :class="[
            pagination.current_page !== 1
              ? 'text-dark'
              : ['text-gray', 'pointer-none'],
          ]"
          href="#"
          @click.prevent="paginationNum(pagination.current_page - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true"><i class="bi bi-chevron-left"></i></span>
        </a>
      </li>
      <li
        v-for="item in pagination.total_pages"
        :key="item"
        v-scroll-to="{
          el: '#topProduct',
          offset: -50,
        }"
      >
        <a
          class="text-dark px-3 py-1"
          :class="[
            pagination.current_page === item
              ? ['bg-primary', 'rounded-circle', 'text-white']
              : '',
          ]"
          href="#"
          @click.prevent="paginationNum(item)"
          >{{ item }}</a
        >
      </li>
      <li v-scroll-to="el.right">
        <a
          class="px-2 py-1"
          :class="[
            pagination.current_page < pagination.total_pages
              ? 'text-dark'
              : ['pointer-none', 'text-gray'],
          ]"
          href="#"
          @click.prevent="paginationNum(pagination.current_page + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true"><i class="bi bi-chevron-right"></i></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      el: {
        right: '',
        left: '',
      },
    };
  },
  props: {
    category: {
      typeof: String,
      default: 'total',
    },
    pagination: {
      typeof: Object,
      require: true,
    },
  },
  emits: {
    page: (num) => typeof num === 'number',
  },
  methods: {
    paginationNum(num) {
      this.$emit('page', num);
    },
  },
  watch: {
    pagination() {
      this.el.right = this.pagination.has_next ? { el: '#topProduct', offset: -50 } : '';
      this.el.left = this.pagination.has_pre ? { el: '#topProduct', offset: -50 } : '';
    },
  },
};
</script>

<style scoped lang="scss">
.pointer-none {
  pointer-events: none;
}
a:hover {
  color: white !important;
  background-color: #8dbf41;
  border-radius: 50%;
}
</style>
