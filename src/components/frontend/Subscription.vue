<template>
  <div class="subscription-img d-flex flex-column justify-content-center">
    <div class="ms-sm-8 px-3 px-sm-0">
      <h2 class="fw-bold">訂閱電子報</h2>
      <h4 class="fw-bold">獲取九折優惠折扣代碼!</h4>
      <Form v-slot="{ errors }">
        <div class="input-group w-xl-25 w-lg-30 w-md-50 w-sm-75 w-100">
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入電子信箱"
            rules="email|required"
            v-model="email"
          ></Field>
          <button
            class="btn btn-primary btn-hover"
            @click="code = Object.values(errors).length !== 1 && email"
          >
            訂閱
          </button>
        </div>
        <Message name="email" class="invalid-feedback"></Message>
        <p v-show="code" class="text-danger mt-1 fs-7 mb-0">折扣碼：9999</p>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      code: false,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/all';
.btn-hover:hover {
  background-color: $secondary !important;
  border: $secondary solid 1px !important;
}

.subscription-img {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url('~@/assets/images/subscription.jpg');
  background-position: bottom;
  background-size: cover;
  height: 150px;
  @include media-breakpoint-up(lg) {
    background-position: bottom 595px right 0px;
  }
  @include media-breakpoint-up(xl) {
    height: 300px;
  }
}
</style>
