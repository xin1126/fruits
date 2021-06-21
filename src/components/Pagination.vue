<template>
  <nav
    aria-label="Page navigation example"
    class="d-flex justify-content-center"
    id="page"
    v-if="category === 'total' && pagination.total_pages > 1"
  >
    <ul class="d-flex fs-5 m-0 p-0">
      <li>
        <a
          v-scroll-to="el.left"
          class="px-1"
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
      <li v-for="item in pagination.total_pages" :key="item" class="px-2">
        <a
          v-scroll-to="{
            el: '#topProduct',
            offset: -40,
          }"
          class="text-dark px-2"
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
      <li>
        <a
          v-scroll-to="el.right"
          class="px-1"
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
      this.el.right = this.pagination.has_next ? { el: '#topProduct', offset: -40 } : '';
      this.el.left = this.pagination.has_pre ? { el: '#topProduct', offset: -40 } : '';
      this.$emit('page', num);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.pointer-none {
  pointer-events: none;
}
a:hover {
  color: white !important;
  background-color: $primary;
  border-radius: 50%;
}
</style>
