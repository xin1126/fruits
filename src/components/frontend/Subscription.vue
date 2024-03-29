<template>
  <div class="subscription-img d-flex flex-column justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-md-5 col-sm-8">
          <h2 class="fw-bold">訂閱電子報</h2>
          <h4 class="fw-bold">獲取九折優惠折扣券!</h4>
          <Form v-slot="{ errors }" @submit="subscription">
            <div class="input-group mb-1">
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] && verificationStart }"
                placeholder="請輸入電子信箱"
                rules="email|required"
                v-model="email"
              ></Field>
              <button
                ref="tooltip"
                type="submit"
                class="btn btn-primary btn-hover"
                :class="{
                  'cursor-allowed': Object.values(errors).length || !email,
                }"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                :data-bs-original-title="[
                  !email
                    ? '請輸入電子信箱哦'
                    : Object.values(errors).length
                    ? '信箱格式錯誤哦'
                    : '',
                ]"
              >
                訂閱
              </button>
            </div>
            <Message name="email" class="invalid-feedback"></Message>
            <p class="text-danger" v-if="verification">此信箱已訂閱過了哦</p>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from 'bootstrap/js/dist/tooltip';

export default {
  data() {
    return {
      email: '',
      subscriptionEmail: JSON.parse(localStorage.getItem('subscriptionEmail')) || [],
      verification: false,
      verificationStart: true,
    };
  },
  methods: {
    subscription() {
      this.verification = false;
      if (this.subscriptionEmail.length) {
        this.subscriptionEmail.forEach((item) => {
          if (item === this.email) {
            this.verification = true;
          }
        });
      }
      if (!this.verification) {
        this.updateCoupon(9);
        this.subscriptionEmail.push(this.email);
        localStorage.setItem('subscriptionEmail', JSON.stringify(this.subscriptionEmail));
        this.$swal({ title: '訂閱成功，恭喜獲得9折優惠券', icon: 'success' });
        this.email = '';
        this.verificationStart = false;
      }
    },
    updateCoupon(num) {
      this.$store.dispatch('updateCoupon', num);
    },
  },
  watch: {
    email() {
      if (this.email) {
        this.verificationStart = true;
      }
    },
  },
  mounted() {
    this.tooltip = new Tooltip(this.$refs.tooltip);
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
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url('~@/assets/images/subscription.jpg');
  background-position: cover;
  background-size: cover;
  height: 150px;
  @include media-breakpoint-up(sm) {
    background-image: linear-gradient(
        270deg,
        #00000000 0%,
        rgb(244, 244, 244) 70%
      ),
      url('~@/assets/images/subscription.jpg');
    background-position: bottom 300px right 0;
    height: 200px;
  }
  @include media-breakpoint-up(md) {
    background-position: bottom 500px right 0;
  }
  @include media-breakpoint-up(lg) {
    height: 300px;
  }
  @include media-breakpoint-up(xl) {
    background-position: bottom 730px right 0;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2)
      ),
      url('~@/assets/images/subscription.jpg');
  }
}
</style>
