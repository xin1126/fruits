<template>
  <div class="content">
    <div class="banner d-flex-center text-white fs-2 mb-4">
      <p class="bg-translucent fw-bolder px-5 py-3">商品資訊</p>
    </div>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item text-secondary">首頁</li>
          <li class="breadcrumb-item text-secondary">商品列表</li>
          <li class="breadcrumb-item text-secondary">{{ product.category }}</li>
          <li class="breadcrumb-item text-success" aria-current="page">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row justify-content-between mb-5">
        <div class="col-6 bg-light d-flex-center">
          <img
            :src="product.imgUrl"
            alt=""
            class="img-fluid img-transparent mb-3"
          />
        </div>
        <div class="col-5">
          <div class="d-flex justify-content-between">
            <h4 class="fw-bold">{{ product.title }}</h4>
            <i class="bi bi-bookmark-heart fs-4"></i>
          </div>
          <hr />
          <p>{{ product.description }}</p>
          <h6>保存方式：</h6>
          <p>{{ product.content }}</p>
          <p></p>
          <button type="button" class="btn btn-outline-success">
            加到購物車
          </button>
        </div>
      </div>
      <hr />
      <h2 class="fw-bold mt-4">相關商品</h2>
    </div>
  </div>
  <loading v-model:active="isLoading">
    <div class="loadingio-spinner-spin-3mx4cy187my">
      <div class="ldio-vvip0fav2if">
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
        <div><div></div></div>
      </div>
    </div>
  </loading>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.product = res.data.product;
        }
      });
    },
    // addToCart(id, qty = 1) {
    //   const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
    //   const cart = {
    //     product_id: id,
    //     qty,
    //   };
    //   this.isLoading = true;
    //   this.$http.post(url, { data: cart }).then((res) => {
    //     this.isLoading = false;
    //     this.$httpMessageState(res, '加入購物車');
    //     this.$router.push('/user/cart');
    //   });
    // },
  },
  created() {
    this.id = this.$route.params.id;
    this.getProduct();
  },
};
</script>

<style scoped lang="scss">
.banner {
  background-image: url('~@/assets/images/banner3.jpg');
  background-position: center;
  background-size: cover;
  height: 300px;
}
</style>
