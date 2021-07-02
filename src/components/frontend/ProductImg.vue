<template>
  <div
    class="product-content cursor-pointer"
    @click="$router.push(`/detailed/${products.id}`)"
  >
    <div class="mb-3">
      <div
        class="
          product-img
          position-relative
          d-flex-center
          rounded rounded-3
          bg-light
          w-100
          pt-4
          pb-3
        "
      >
        <div class="img d-flex-center">
          <img
            :src="products.imgUrl"
            class="img-transparent"
            :alt="products.title"
          />
        </div>
        <div class="more position-absolute top-0"></div>
        <p class="more-text position-absolute text-white fw-bold fs-4">
          查看更多
        </p>
        <div class="position-absolute text-warning top-0 pt-1 ms-3 w-100">
          <i
            class="bi"
            :class="[
              products.options.rating >= num ? 'bi-star-fill' : 'bi-star',
            ]"
            v-for="num in 5"
            :key="num"
          ></i>
        </div>
      </div>
    </div>
    <h5 class="card-title text-center fw-bold mb-0 mb-2">
      {{ products.title
      }}{{ products.options.origin !== '台灣' ? '(進口)' : '' }}
    </h5>
    <div class="d-flex justify-content-center">
      <small
        class="card-text text-decoration-line-through text-gray mt-1 me-2"
        v-if="products.origin_price !== products.price"
      >
        原價:NT${{ products.origin_price }}
      </small>
      <p
        class="fw-bold mb-0"
        :class="[
          products.origin_price !== products.price
            ? 'text-danger'
            : 'text-dark',
        ]"
      >
        {{ products.origin_price !== products.price ? '促銷價:NT$' : '售價:NT$'
        }}{{ products.price }}
      </p>
    </div>
  </div>
  <a
    href="#"
    class="position-absolute top-0 end-0 mt-1 me-2"
    @click.prevent="favorites(products.id)"
  >
    <i
      class="bi fs-3"
      :class="[
        products.bookmark
          ? ['text-primary', 'bi-bookmark-heart-fill']
          : ['text-gray', 'bi-bookmark-heart'],
      ]"
    ></i>
  </a>
</template>

<script>
export default {
  data() {
    return {
      products: this.item,
      pageFavorites: false,
    };
  },
  props: {
    item: {
      typeof: Object,
      require: true,
    },
  },
  emits: {
    favorites: (id) => typeof id === 'string',
  },
  methods: {
    favorites(id) {
      if (this.$route.path.indexOf('/favorites') === 0) {
        this.$emit('favorites', id);
        this.pageFavorites = true;
      }
      this.$store.dispatch('updateBookmark', [id, this.pageFavorites]);
    },
  },
  mounted() {
    if (this.$route.path.indexOf('/favorites') < 0) {
      this.$store.dispatch('initBookmark', this.products.id);
    }
  },
};
</script>

<style scoped lang="scss">
.product-content {
  &:hover {
    img {
      transition: 0.5s;
      filter: grayscale(50%);
      transform: scale(1.2, 1.2);
    }
    .product-img {
      background-color: white !important;
    }
    .more {
      background-color: rgba(0, 0, 0, 0.4) !important;
      border-radius: 0.3rem;
      width: 100%;
      height: 100%;
    }
    .more-text {
      display: block;
    }
  }
  .img {
    width: 180px;
    height: 140px;
  }
  .more-text {
    display: none;
  }
}
</style>
