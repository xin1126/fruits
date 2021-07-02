<template>
  <h3 class="text-center text-secondary fw-bold mb-3">促銷商品</h3>
  <Swiper
    :slides-per-view="offsetWidthData.slidesView"
    :space-between="30"
    :loop="true"
    :loopFillGroupWithBlank="true"
    :autoplay="autoplay"
  >
    <SwiperSlide v-for="item in productsSpecialOffer" :key="item.id">
      <ProductImg :item="item" />
    </SwiperSlide>
  </Swiper>
</template>

<script>
import ProductImg from '@/components/frontend/ProductImg.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      productsSpecialOffer: [],
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    };
  },
  components: {
    ProductImg,
  },
  methods: {
    ...mapActions(['initOffsetWidth', 'updateOffsetWidth']),
    getAllProducts() {
      this.$store.dispatch('getAllProducts', this.$route.path.length !== 1);
    },
    specialOffer() {
      this.productsSpecialOffer = this.allProducts.filter((i) => i.origin_price !== i.price);
    },
  },
  computed: {
    ...mapGetters(['allProducts', 'offsetWidth', 'offsetWidthData']),
  },
  watch: {
    allProducts() {
      this.specialOffer();
    },
    offsetWidth() {
      this.updateOffsetWidth();
    },
  },
  created() {
    this.getAllProducts();
    this.initOffsetWidth();
    window.onresize = () => {
      this.updateOffsetWidth();
    };
  },
};
</script>
