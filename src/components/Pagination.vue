<template>
  <nav
    aria-label="Page navigation example"
    class="d-flex justify-content-center"
    v-if="category === 'total' && pagination.total_pages > 1"
  >
    <ul class="d-flex fs-4 m-0 p-0">
      <li class="">
        <a
          class="pe-1 py-1"
          :class="[
            pagination.current_page !== 1
              ? 'text-white'
              : ['text-secondary', 'pointer-none'],
          ]"
          href="#"
          @click.prevent="paginationNum(pagination.current_page - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        :class="[
          pagination.current_page === item
            ? ['bg-success', 'rounded-circle']
            : '',
        ]"
        v-for="item in pagination.total_pages"
        :key="item"
      >
        <a
          class="text-white px-3 py-1"
          href="#"
          @click.prevent="paginationNum(item)"
          >{{ item }}</a
        >
      </li>
      <li>
        <a
          class="ps-1 py-1"
          :class="[
            pagination.current_page < pagination.total_pages
              ? 'text-white'
              : ['pointer-none', 'text-secondary'],
          ]"
          href="#"
          @click.prevent="paginationNum(pagination.current_page + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
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
};
</script>

<style lang="scss">
.pointer-none {
  pointer-events: none;
}
</style>
