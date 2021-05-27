<template>
  <nav
    aria-label="Page navigation example"
    class="d-flex justify-content-center"
    v-if="category === 'total' && pagination.total_pages > 1"
  >
    <ul class="d-flex fs-4">
      <li class="">
        <a
          class="pe-1 py-1"
          :class="{
            'pointer-none': pagination.current_page === 1,
            'text-secondary': pagination.current_page === 1,
            'text-white': pagination.current_page > 1,
          }"
          href="#"
          @click.prevent="paginationNum(pagination.current_page - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        :class="{
          'bg-info': pagination.current_page === item,
          'rounded-circle': pagination.current_page === item,
        }"
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
          :class="{
            'pointer-none': pagination.current_page === pagination.total_pages,
            'text-secondary':
              pagination.current_page === pagination.total_pages,
            'text-white': pagination.current_page < pagination.total_pages,
          }"
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
  props: ['category', 'pagination'],
  emits: ['page'],
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
