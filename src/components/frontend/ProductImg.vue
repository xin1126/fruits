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
        py-4
      "
    >
      <img
        :src="products.imgUrl"
        class="img-transparent"
        :alt="products.title"
      />
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
    @click.prevent="products.bookmark = !products.bookmark"
  >
    <i
      class="bi fs-3"
      :class="[
        products.bookmark
          ? ['text-success', 'bi-bookmark-heart-fill']
          : ['text-secondary', 'bi-bookmark-heart'],
      ]"
    ></i>
  </a>
  <h5 class="card-title text-center fw-bold">{{ products.title }}</h5>
  <div class="d-flex justify-content-center">
    <small
      class="card-text text-decoration-line-through text-secondary mt-1 me-2"
    >
      原價:NT${{ products.origin_price }}
    </small>
    <p class="fw-bold">售價:NT${{ products.price }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: this.item,
    };
  },
  props: {
    item: {
      typeof: Object,
      require: true,
    },
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
  img {
    width: 150px;
    height: 150px;
  }
  p {
    display: none;
  }
}
</style>
