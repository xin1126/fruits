<template>
  <div class="subscription-img d-flex flex-column justify-content-center">
    <div class="ms-sm-8 px-3 px-sm-0">
      <h2 class="fw-bold">訂閱電子報</h2>
      <h4 class="fw-bold">獲取九折優惠折扣券!</h4>
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
            type="button"
            class="btn btn-primary btn-hover"
            @click.prevent="
              subscription(Object.values(errors).length !== 1 && email)
            "
          >
            訂閱
          </button>
        </div>
        <Message name="email" class="invalid-feedback"></Message>
        <p class="text-danger" v-if="verification">此信箱已訂閱過了哦</p>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      couponNum: JSON.parse(localStorage.getItem('couponNum')) || {},
      subscriptionEmail: JSON.parse(localStorage.getItem('subscriptionEmail')) || [],
      verification: false,
    };
  },
  methods: {
    subscription(status) {
      this.verification = false;
      if (this.subscriptionEmail.length) {
        this.subscriptionEmail.forEach((item) => {
          if (item === this.email) {
            this.verification = true;
          }
        });
      }
      if (status && !this.verification) {
        this.couponNum[9] = this.couponNum[9] + 1 || 1;
        this.subscriptionEmail.push(this.email);
        localStorage.setItem('couponNum', JSON.stringify(this.couponNum));
        localStorage.setItem('subscriptionEmail', JSON.stringify(this.subscriptionEmail));
        this.$swal({ title: '訂閱成功，恭喜獲得9折優惠券', icon: 'success' });
      }
    },
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
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
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
