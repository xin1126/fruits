<template>
  <div class="mb-3" @click="$router.push(`/detailed/${products.id}`)">
    <div
      class="
        img-content
        position-relative
        d-flex-center
        bg-light
        cursor-pointer
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
      <p class="position-absolute text-white fw-bold fs-4">查看更多</p>
      <div class="position-absolute text-warning top-0 mt-1 ms-3 w-100">
        <i
          class="bi"
          :class="[products.options.rating >= num ? 'bi-star-fill' : 'bi-star']"
          v-for="num in 5"
          :key="num"
        ></i>
      </div>
    </div>
  </div>
  <a
    href="#"
    class="position-absolute top-0 end-0 mt-1 me-2"
    @click.prevent="bookmark(products.id)"
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
  <h5 class="card-title text-center fw-bold mb-0 mb-2">
    {{ products.title }}
  </h5>
  <div class="d-flex justify-content-center">
    <small
      class="card-text text-decoration-line-through text-gray mt-1 me-2"
      v-if="products.origin_price !== products.price"
    >
      原價:NT${{ products.origin_price }}
    </small>
    <p
      class="fw-bold"
      :class="[
        products.origin_price !== products.price ? 'text-danger' : 'text-dark',
      ]"
    >
      {{ products.origin_price !== products.price ? '促銷價:NT$' : '售價:NT$'
      }}{{ products.price }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectionData: JSON.parse(localStorage.getItem('listData')) || [],
      products: this.item,
    };
  },
  props: {
    item: {
      typeof: Object,
      require: true,
    },
  },
  emits: {
    'bookmark-data': {
      typeof: Boolean,
      require: true,
    },
  },
  methods: {
    bookmark(id) {
      this.products.bookmark = !this.products.bookmark;
      this.$emit('bookmark-data', this.products.bookmark, id);
      this.$bus.emit('collection');
    },
  },
  created() {
    this.collectionData.forEach((item) => {
      if (this.products.id === item.id) {
        this.products.bookmark = true;
      }
    });
  },
};
</script>

<style scoped lang="scss">
.img-content {
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.4) !important;
    p {
      display: block;
    }
    img {
      transition: 0.5s;
      filter: grayscale(50%);
      transform: scale(1.2, 1.2);
    }
  }
  .img {
    width: 180px;
    height: 140px;
  }
  p {
    display: none;
  }
}
</style>
