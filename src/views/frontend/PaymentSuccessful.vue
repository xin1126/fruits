<template>
  <div class="container">
    <div class="row g-0">
      <div class="col-lg-6 position-relative vh-100 text">
        <router-link
          class="text-primary logo order-2 order-lg-0 mt-lg-0 mt-2 me-0"
          to="/"
          ><h1 class="h1 pt-2 transition">Fresh Fruits</h1></router-link
        >
        <div class="position-absolute top-50 start-0 translate-middle-y">
          <h2 class="fw-bold text-success mb-4">
            <i class="bi bi-check-circle-fill me-1"></i>付款成功
          </h2>
          <p class="mb-4">
            感謝您的訂購，您將會在短期之內收到一封電子郵箱確認信，內含您的購買明細。若您對此次交易有任何問題，請隨時寫信給我們。
          </p>
          <button class="btn btn-primary" @click="$router.push('/products')">
            繼續購物
          </button>
        </div>
      </div>
      <img
        src="@/assets/images/paymentSuccessful.jpg"
        class="col-lg-6 vh-100"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/all';

.text {
  text-align: center;
  @include media-breakpoint-up(lg) {
    text-align: start;
  }
  p {
    color: black;
    width: 100%;
    margin: 0 auto;
    @include media-breakpoint-up(md) {
      width: 75%;
    }
    @include media-breakpoint-up(lg) {
      color: gray;
      margin: initial;
    }
  }
}

img {
  position: absolute;
  right: 0;
  z-index: -1;
  opacity: 0.2;
  @include media-breakpoint-up(lg) {
    opacity: 1;
  }
}
</style>
